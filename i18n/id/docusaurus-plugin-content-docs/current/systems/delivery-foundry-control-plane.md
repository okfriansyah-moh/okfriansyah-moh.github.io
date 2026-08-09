---
title: "Delivery Foundry: Control Plane Terkelola untuk Pengiriman Perangkat Lunak AI"
description: "Arsitektur control plane yang tahan lama, dapat dilanjutkan, dan terverifikasi bukti — kernel memiliki state dan side effect sementara Plan Execution Coordinator mengusulkan pekerjaan di bawah envelope kebijakan eksplisit."
sidebar_position: 4
tags:
  - ai systems
  - control plane
  - deterministic pipelines
keywords:
  - delivery foundry
  - ai agent orchestration
  - evidence verified delivery
---

# Delivery Foundry: Control Plane Terkelola untuk Pengiriman Perangkat Lunak AI

## Apa yang Dibangun

[Delivery Foundry](https://github.com/okfriansyah-moh/the-foundry) adalah **control plane
terkelola** untuk pengiriman perangkat lunak berbasis loop. Arsitektur V12 mendefinisikan
model eksekusi yang tahan lama, dapat dilanjutkan, dan terverifikasi bukti untuk agen AI
yang beroperasi di bawah envelope kebijakan eksplisit, bukan kepercayaan implisit.

Repositori mengirim **Task 1** pada 2026-07-20 (Makefile berbasis Docker, CI, scaffold Go).
[Pull request #1](https://github.com/okfriansyah-moh/the-foundry/pull/1) (digabung
2026-07-25) menyelesaikan **Task 2–22** hingga milestone M0 (Shared Kernel Proof) dan
awal M1 (Foundation):

- **Agent harness (Task 2)** — [`.ai/`](https://github.com/okfriansyah-moh/the-foundry/tree/main/.ai) canonical ARES dengan enam agen peran, sebelas skill, dan komposisi multi-provider ke `AGENTS.md` / `CLAUDE.md` / `.codex/` (provider Claude + Codex di `.ai/manifest.yaml`)
- **Plan runner otonom (Task 3)** — `tools/planrunner` dengan jalur AUTO vs GATED berbasis risiko dan gate persetujuan Telegram
- **Stack runtime (Task 4–5)** — `postgres` + `temporal` di compose; paket state enam-status canonical (`internal/state`)
- **Admission dan provenance (Task 6–8)** — schema/parser PLAN, `AdmissionClassifier` deterministik v0, rantai `ApprovedPlan` bertanda tangan
- **Substrat eksekusi (Task 9–11)** — worktree manager, kontrak executor + fake executor, penyimpanan evidence bundle
- **Workflow kernel (Task 12–16)** — worker Temporal `foundryd` menghosting `DeliverPlan`; bukti resume checkpoint + forced-restart
- **Permukaan operator (Task 13–15, 18–19)** — validation runner, proyeksi status PostgreSQL, CLI `foundry` (`status`, `plan submit|approve|verify`, `projection rebuild`, `doctor`, `policy`, `evidence`, `principal`), dan pemeriksaan konstitusi `fitlint`
- **Lapisan foundation (Task 20–22)** — framework migrasi, profiles/principals/organizations, policy compiler v1
- **Operator config SoT (Task 156–161, [PR #14](https://github.com/okfriansyah-moh/the-foundry/pull/14))** — `internal/operatorcfg.Store` membaca policy layer, kuota, tarif model, threshold opportunity, kebijakan mission-decide, nilai tunable, dan katalog packaging dari **PostgreSQL** sebagai source of truth; startup daemon men-seed dari disk saat key kosong; perintah catalog CLI menerima `-pg-dsn` untuk katalog dan rollback berbasis DB

Kontrak normatif tetap di `docs/foundry/delivery_foundry.md` dan pohon modular
`docs/foundry/docs/`; roadmap implementasi aktif ada di `docs/PLAN.md`
(Task 23–155 dan 162–83 masih terbuka setelah milestone CFG/CAP).

## Masalah

Kebanyakan workflow AI coding memperlakukan agen sebagai executor tepercaya: membaca
rencana, memutasi repositori, dan melaporkan selesai sendiri. Model itu gagal saat retry
(duplikasi side effect), crash (progress hilang), drift kebijakan (agen memperluas izin
sendiri), dan state terminal ambigu (apakah pekerjaan benar-benar terverifikasi?).

Loop delivery tingkat produksi membutuhkan **control plane** yang memiliki state
otoritatif, mengurutkan side effect, menegakkan anggaran dan persetujuan, serta menerima
penyelesaian hanya jika didukung bukti bertipe — sambil tetap membiarkan koordinator
agen mengusulkan gelombang pekerjaan berikutnya.

## Mengapa Masalah Ini Sulit

1. **Pemisahan otoritas** — Agen harus menginterpretasi rencana dan merekomendasikan
   dispatch, tetapi tidak boleh menjadi mesin workflow kedua atau memutasi state
   otoritatif secara langsung.
2. **Enam status, nuansa tak terbatas** — Makna workflow harus hidup di field bertipe
   terkontrol registry (`phase`, `reason`, `result_code`), bukan enum status ad hoc.
3. **Dua track produk** — Otonomi venture personal dan engineering 10x organisasi
   berbagi satu kernel tetapi membutuhkan profil tata kelola dan semantik terminal berbeda.
4. **Penyelesaian jujur** — Outcome terminal seperti `PROVEN_BLOCKED` atau
   `TEN_X_BRANCH_HANDOFF_READY` harus mengenkode bukti nyata, bukan optimisme agen.
5. **Recovery tanpa improvisasi** — Self-healing harus menaiki tangga terbatas (retry →
   buat ulang sandbox → rollback → eskalasi manusia) tanpa menekan peringatan keamanan.

## Model Mental Pemula

Bayangkan ruang kontrol pabrik (**kernel**) dan supervisor lantai (**Plan Execution
Coordinator**, atau PEC). Supervisor membaca rencana produksi, mengusulkan stasiun
berikutnya, dan melaporkan progress — tetapi hanya ruang kontrol yang boleh
membalik saklar, menulis ke ledger, push ke Git, atau menyatakan batch selesai. Setiap
perubahan state membutuhkan bundel bukti distempel. Jika listrik padam, ruang kontrol
memutar ulang dari checkpoint terakhir; supervisor tidak merestart pabrik dari ingatan.

## Persyaratan dan Batasan

| Persyaratan | Kontrak arsitektural |
|-------------|---------------------|
| Tepat enam status workflow | `PENDING`, `RUNNING`, `WAITING`, `SUCCEEDED`, `FAILED`, `CANCELLED` |
| Makna lebih kaya di field bertipe | `phase`, `reason`, `result_code` terkontrol registry |
| Kernel memiliki side effect | SCM writes, anggaran, lease, checkpoint, penyelesaian |
| PEC hanya mengusulkan | Gelombang, dispatch, remediasi — diuji larangan di CI |
| Penyelesaian berbasis bukti | Tidak ada "selesai" laporan mandiri tanpa bundel verifikasi |
| Admission deterministik | Classifier versi; rencana tidak bisa mengotorisasi diri sendiri |
| Workspace terisolasi | Agen beroperasi di worktree, bukan clone kanonik |
| Operasi eksternal idempoten | Ledger operasi dengan kunci idempotency untuk setiap side effect |
| Paralelisme dual-track | Track venture dan 10x berbagi kernel, gate penerimaan independen |

Batasan ini dicantumkan sebagai artikel konstitusi C1–C22 di `PLAN_7.md`.

## Ringkasan Arsitektur

Delivery Foundry adalah **control plane**, bukan framework agen universal atau kumpulan
skrip shell. Klien (CLI, Web UI, Telegram, webhook CI) memanggil control plane; runner
plane mengeksekusi pekerjaan terbatas di sandbox terisolasi dan mengembalikan bukti
bertipe.

```mermaid
flowchart TB
  subgraph Clients
    CLI[foundry CLI]
    WEB[Web UI]
    CHAT[Telegram / Slack]
    CI[CI webhooks]
  end

  subgraph ControlPlane["Foundry Control Plane (otoritas kernel)"]
    API[API dan identitas]
    CFG[(Operator config store<br/>Postgres SoT)]
    POLICY[Policy decision point]
    WF[Durable workflow backend]
    LEDGER[Audit dan event ledger]
    RECON[Operation reconciler]
  end

  subgraph RunnerPlane["Runner plane"]
    PEC[Plan Execution Coordinator]
    RUNNER[Isolated task runner]
    WORKTREE[Worktree manager]
    VERIFY[Verification tools]
  end

  subgraph External["Sistem eksternal"]
    SCM[SCM]
    MODEL[Model providers]
    DEPLOY[Deployment targets]
  end

  CLI --> API
  WEB --> API
  CHAT --> API
  CI --> API

  API --> CFG
  CFG --> POLICY
  POLICY --> WF
  WF --> PEC
  PEC -->|mengusulkan gelombang| WF
  WF --> RUNNER
  RUNNER --> WORKTREE
  RUNNER --> VERIFY
  RUNNER -->|bukti| LEDGER
  WF --> SCM
  WF --> DEPLOY
  RUNNER --> MODEL
```

## Alur Eksekusi

1. **Entry** — Misi, mockup, requirement, spesifikasi, atau `PLAN.md` yang disetujui
   tiba di API control plane.
2. **Kesiapan operator config** — Saat startup `foundryd`, `operatorcfg.Store.EnsureSeeded`
   memuat YAML disk ke Postgres saat key config belum punya versi aktif; semua pembacaan
   policy compilation, quota enforcement, tarif model, gate opportunity, dan katalog
   packaging berikutnya dari database (payload versi + audit apply).
3. **Intake dan admission** — Classifier admission deterministik menetapkan tier
   (A0/A1/A2/H) dan memverifikasi provenance untuk rencana disetujui.
4. **Pembuatan workflow** — Kernel membuat workflow di `PENDING`, transisi ke
   `RUNNING` dengan phase `intake`, dan menetapkan checkpoint.
5. **Interpretasi PEC** — PEC membaca rencana yang diadmit, mengusulkan gelombang
   aware dependensi dan dispatch task terbatas dalam envelope yang diberikan kernel.
6. **Eksekusi terisolasi** — Runner membuat sandbox worktree ephemeral; agen
   mengeksekusi task dan mengembalikan ringkasan ke PEC (bukan langsung ke state kernel).
7. **Verifikasi** — Pemeriksaan deterministik menghasilkan bundel bukti; kernel
   maju phase (mis. `implementation` → `verifying` → `integrating`).
8. **Side effect** — Branch Integrator milik kernel melakukan SCM writes; operasi
   eksternal mencatat kunci idempotency di ledger.
9. **Keputusan terminal** — Kernel menetapkan `SUCCEEDED` atau `FAILED` dengan
   `result_code` terkontrol registry (mis. `MISSION_TARGET_REACHED`,
   `TEN_X_BRANCH_HANDOFF_READY`, `PROVEN_BLOCKED`).
10. **Recovery saat gagal** — Recovery Manager membaca klasifikasi kegagalan dan
   menaiki tangga L0–L7; gate manusia pause di batas yang dikonfigurasi.

## Komponen Penting

| Komponen | Tanggung jawab |
| -------- | --------------- |
| **Kernel** | State workflow otoritatif, sequencing, lease, checkpoint, kebijakan, anggaran, semua side effect |
| **Plan Execution Coordinator (PEC)** | Menginterpretasi rencana diadmit; mengusulkan gelombang, dispatch, remediasi, progress |
| **Admission classifier** | Penetapan tier deterministik; mencegah rencana mengotorisasi diri sendiri |
| **State projection (PostgreSQL)** | Model baca dapat dibangun ulang — bukan otoritas eksekusi |
| **Backend Temporal (`foundryd`)** | Riwayat eksekusi tahan lama, timer, sequencing — worker Task 12 pada queue `foundry-core` |
| **CLI `foundry`** | Perintah operator: status (tingkat konsistensi), plan submit/approve/verify, projection rebuild, doctor, policy, evidence |
| **`fitlint` + `make fitness`** | Penegakan konstitusi: enum lint (C1), superseded-term lint, batas import, resolver doc-link |
| **Agent harness `.ai/`** | Enam peran executor, sebelas skill, instruksi batas otoritas; dikomposisi ke file agen per provider |
| **Plan runner (`tools/planrunner`)** | Orkestrator bootstrap untuk Task 4–22; pensiun setelah kernel mengadmit backlog sendiri (exit condition Task 3) |
| **Pipeline bukti** | Bundel verifikasi bertipe wajib untuk kemajuan phase |
| **Operation ledger** | Kunci idempotency dan rekonsiliasi untuk side effect eksternal |
| **Recovery Manager** | Tangga self-healing terbatas dengan larangan eksplisit |
| **Branch Integrator** | SCM writes milik kernel ke worktree terisolasi dan branch 10x |
| **`operatorcfg.Store` (Task 156–161)** | SoT config operator-hot berbasis Postgres: policy layer versi, kuota, policy/tarif model, threshold opportunity, kebijakan mission-decide, nilai tunable, katalog/enablement packaging; seed dari disk pada run pertama |
| **Loader katalog packaging** | Fallback berbasis file untuk dev lokal; `-pg-dsn` pada subcommand `foundry catalog` memuat katalog dan enablement dari config store |

Paket Go kini membawa implementasi nyata hingga Task 22 dan milestone CFG/CAP
(Task 156–161) — masing-masing dengan `doc.go`
batas otoritas: `internal/kernel` (workflow Temporal), `internal/state` (model enam status),
`internal/admission`, `internal/provenance`, `internal/evidence`, `internal/worktree`,
`internal/executor/*`, `internal/projection`, `internal/policy`, `internal/profile`,
`internal/operatorcfg`, dan lainnya. Paket PEC tetap proposal-only per C5; otoritas side effect ada di jalur kode
kernel yang dijalankan `foundryd`.

## Contoh Implementasi Disederhanakan

Representasi state kanonik (dari `docs/architecture/state-model.md`):

```yaml
status: RUNNING          # salah satu dari enam status kanonik
phase: implementation    # terkontrol registry
reason: null             # diisi saat WAITING atau FAILED
result_code: null        # hanya di transisi terminal
wake_at: null
next_action: verify
checkpoint_id: checkpoint-789
```

Batas otoritas PEC (disederhanakan dari `docs/architecture/authority-model.md`):

```text
PEC BOLEH:  mengusulkan gelombang, merekomendasikan dispatch, mengevaluasi ringkasan, mengusulkan remediasi
PEC TIDAK BOLEH: memutasi state workflow, melakukan SCM writes, memberi izin,
                  menaikkan anggaran, menyatakan penyelesaian terminal, override kebijakan
```

Entri tangga recovery (dari `docs/workflows/recovery.md`):

```text
L0 — retry operasi idempoten dengan backoff
L1 — buat ulang sandbox bersih dan ulangi
L2 — agen debugging fokus
...
L7 — pause dan eskalasi ke manusia
```

Versi operator config (disederhanakan dari `internal/operatorcfg/store.go` dan migrasi `00044_operator_config_sot.sql`):

```sql
-- Setiap config_key melacak pointer active_version
-- operator_config_versions menyimpan payload immutable + SHA256 + metadata apply
-- operator_config_apply_audit mencatat siapa yang menyetujui setiap promosi
SELECT config_key, active_version FROM operator_config_entries;
-- Key mencakup policy.layer.*, quotas, executor.models, packaging.catalog.*
```

Jalur seed startup (disederhanakan dari `cmd/foundryd/main.go`):

```go
cfgStore := operatorcfg.NewStore(db)
cfgStore.EnsureSeeded(ctx, operatorcfg.SeedPaths{
    PolicyOrganizationPath: "config/profiles/organization-10x.yaml",
    PolicyPersonalPath:     "config/profiles/personal-autonomous-venture.yaml",
    // ... kuota, tarif model, katalog, enablement ...
})
modelPolicy, err := cfgStore.LoadModelPolicy(ctx) // semua pembacaan runtime berbasis DB
```

## Reliabilitas dan Idempotency

- **Checkpoint** — Kernel mencatat `checkpoint_id` pada setiap transisi bermakna;
  restart proses memutar ulang dari riwayat Temporal dan proyeksi PostgreSQL.
- **Ledger operasi eksternal** — Setiap push SCM, deployment, atau panggilan billing
  membawa kunci idempotency; reconciler mendeteksi operasi duplikat atau yatim.
- **Invariant enam status** — Aturan fitness CI menolak enum status kedua; label V11
  historis hanya dipetakan ke tuple kanonik `(status, phase, reason, result_code)`.
- **Supervisi liveness** — `ORPHANED` adalah kondisi supervisor, bukan status workflow;
  dokumen disaster-recovery mendefinisikan semantik checkpoint/restart.
- **Blocking jujur** — `PROVEN_BLOCKED` pada `FAILED` berarti bukti terverifikasi bahwa
  pekerjaan tidak dapat dipenuhi sesuai scope — bukan kode error generik.
- **Operator config versi** — Policy overlay, kuota, dan katalog packaging dipromosikan
  melalui baris versi immutable; `active_version` pada `operator_config_entries` adalah
  satu-satunya pointer mutable; audit apply menegakkan reviewer ≠ implementer pada promosi.
- **Seed-then-serve** — Boot `foundryd` pertama menyalin YAML disk ke Postgres saat key belum
  punya versi; perubahan berikutnya harus melalui jalur apply config store, bukan edit file diam-diam.

## Mode Kegagalan

| Kegagalan | Deteksi | Recovery |
| --------- | ------- | -------- |
| Outage provider transient | `WAITING`, reason `provider-outage` | Backoff L0; timer wake |
| Kegagalan kode deterministik | klasifikasi `deterministic-failure` | Agen debug L2; max 1 retry agen sama |
| Pelanggaran kebijakan | `FAILED`, result `ADMISSION_REJECTED` | Tidak auto-retry; review manusia |
| Anggaran habis | `WAITING`, reason `budget` | Pause sampai reset anggaran atau override manusia |
| PEC overreach | Tes larangan CI | Build gagal sebelum merge |
| Config berbasis file usang | Daemon membaca DB; key hilang gagal startup dengan error bernama | Re-seed atau apply versi baru via operatorcfg |
| Crash proses mid-phase | Supervisor liveness | Replay dari checkpoint; lanjut di phase ter-commit terakhir |
| Security hold | `WAITING`, reason `security-hold` | Recovery Manager tidak boleh menekan alert |

## Trade-off dan Alternatif yang Ditolak

| Keputusan | Alasan |
| --------- | ------ |
| Pemisahan kernel vs PEC | Mencegah framework agen menjadi mesin workflow bayangan |
| Enam status + field bertipe | Phase extensible tanpa ledakan enum; dapat ditegakkan CI |
| Temporal + proyeksi PostgreSQL | Riwayat tahan lama terpisah dari model baca dapat dibangun ulang (C2/C3) |
| Bangun control plane (ADR-000) | Logika sequencing/kebijakan diferensiasi vs membeli orchestration generik |
| Modularisasi dok V12 | Mempertahankan konten V11 sambil menambah kontrak normatif |
| Toolchain dev hanya Docker | Host hanya butuh Docker + make; paritas dev/CI dari Task 1 |
| Handoff 10x tanpa PR | `TEN_X_BRANCH_HANDOFF_READY` adalah sukses — batas stop workflow org |
| Postgres SoT untuk config operator-hot (Task 156–161) | Memusatkan policy/kuota/katalog dengan riwayat versi dan audit; path file menjadi input seed saja, mengurangi drift antara CLI, daemon, dan API |

## Pengujian

Validasi saat ini (Task 1–22 dan CFG/CAP Task 156–161, diimplementasi):

- `make bootstrap test lint fitness` di dalam image Docker `dev`
- `internal/operatorcfg/store_pg_test.go` — jalur seed, load, dan apply versi store Postgres
- `make up` + `make doctor` — verifikasi Docker/Compose, PostgreSQL `SELECT 1`, Temporal `GetSystemInfo`
- `scripts/fitness.sh` (Task 18): `go vet`, kehadiran `doc.go`, plus pemeriksaan `cmd/fitlint` untuk
  enum lint (C1), superseded-term lint, batas import SCM, dan resolusi doc-link
- `make skp-e2e` (Task 19) — Shared Kernel Proof end-to-end: admit plan → worktree → verify →
  evidence bundle → **forced restart → resume dari checkpoint**
- `cmd/foundry/status_test.go` — output CLI status dengan tingkat konsistensi
- GitHub Actions CI saat push (`.github/workflows/ci.yaml`)

Validasi direncanakan (milestone tersisa):

- Tes conformance larangan PEC (Task 56)
- Evaluasi fault-injection dan keamanan per spesifikasi V12
- Integrasi OPA PDP penuh dan external-operation ledger (Task 23–26)

## Operasi dan Observabilitas

- **Entry CLI** — subperintah `foundry`: `doctor`, `status`, `plan submit|approve|verify`,
  `projection rebuild`, `principal create`, `keygen`, `policy`, `evidence`, `migrate`,
  `catalog list|validate|install|doctor` (opsional `-pg-dsn` untuk config packaging berbasis DB)
- **Daemon** — `foundryd` men-seed `operatorcfg.Store` saat startup, lalu memuat semua policy,
  kuota, model, opportunity, dan config katalog dari Postgres sebelum melayani API/worker;
  polling queue Temporal `foundry-core` sebagai satu-satunya proses side effect kernel (C4)
- **Target Make** — `bootstrap`, `up`, `down`, `doctor`, `test`, `lint`, `fitness`, `skp-e2e`,
  `plan-run`, `evidence-verify`, `projection-rebuild` (semua dibungkus Docker)
- **Notifikasi bootstrap** — Plan runner (Task 3) memakai bot Telegram disposable untuk digest jalur AUTO
  dan gate `/approve` / `/reject` jalur GATED; engine Telegram produksi adalah Task 30
- **Cost accounting** — Pola reserve → incur → reconcile terdokumentasi; enforcement ada di Task 29/69
- **Observabilitas** — SLO, alert, dan batas payload didefinisikan di `docs/foundry/docs/operations/observability-and-alerts.md`

## Pelajaran

1. **Pisahkan "siapa memutuskan" dari "siapa mengeksekusi"** — PEC kuat dalam interpretasi
   rencana tetapi harus tetap proposal-only; retensi side effect kernel tidak bisa ditawar.
2. **Semantik terminal adalah fitur produk** — `TEN_X_BRANCH_HANDOFF_READY` mengenkode
   batas stop intentional untuk workflow organisasi, bukan kegagalan merge.
3. **Registry mengalahkan enum** — Registry phase, wait-reason, dan result-code memungkinkan
   evolusi tanpa melanggar invariant enam status.
4. **Bukti sebelum penyelesaian** — Ringkasan agen laporan mandiri adalah input PEC, bukan
   bukti penyelesaian; bundel verifikasi menggate kemajuan phase.
5. **Bootstrap arsitektur dulu** — Task 1 discaffold batas otoritas di `doc.go`
   sebelum kode implementasi, sehingga CI dapat menegakkan peran paket lebih awal.
6. **Agent harness provider-neutral** — Task 2 menjaga `.ai/` sebagai sumber canonical tunggal;
   `ars compose` memproyeksikan skill dan batas ke format Claude/Codex tanpa menduplikasi kebijakan.
7. **Fitness mewujudkan konstitusi** — `fitlint` Task 18 mengubah artikel C1 menjadi kegagalan CI,
   bukan panduan dokumentasi saja.
8. **Config operator-hot milik database** — Task 156–161 memindahkan policy layer, kuota,
   tabel model, dan katalog packaging ke Postgres dengan metadata apply versi sehingga CLI,
   daemon, dan API berbagi satu sumber auditable — file disk seed sekali, lalu promosi eksplisit.

## Terkait

- [Merancang Deterministic Agentic Coding Orchestrator](/id/docs/concepts/deterministic-agentic-orchestrator)
- [State Kanonik dalam Pipeline Desain Multi-Agen](/id/docs/concepts/ai-orchestration-patterns)
- [Ringkasan Proyek Delivery Foundry](/id/docs/projects/delivery-foundry)

## Sumber

- Repository: [okfriansyah-moh/the-foundry](https://github.com/okfriansyah-moh/the-foundry)
- Pull request: [#1 — Task 3–22](https://github.com/okfriansyah-moh/the-foundry/pull/1) (merge commit [`6efd492`](https://github.com/okfriansyah-moh/the-foundry/commit/6efd492d48d99672afea27da565699e8e8a3983d))
- Pull request: [#14 — Task 156–161 operator config Postgres SoT](https://github.com/okfriansyah-moh/the-foundry/pull/14) (merge commit [`5b01562`](https://github.com/okfriansyah-moh/the-foundry/commit/5b015620a5a676c47dfe806486e82137b7801834))
- Commit sebelumnya: [`58632a0`](https://github.com/okfriansyah-moh/the-foundry/commit/58632a0), [`9409080`](https://github.com/okfriansyah-moh/the-foundry/commit/9409080)
- Arsitektur: `docs/foundry/delivery_foundry.md`, `docs/architecture.md`, `docs/foundry/docs/architecture/state-model.md`
- Agent harness: `.ai/manifest.yaml`, `.ai/instructions/authority-boundaries.md`
- Rencana implementasi: `docs/PLAN.md` (Task 1–22 ✅, Task 156–161 ✅, task tersisa pending)
