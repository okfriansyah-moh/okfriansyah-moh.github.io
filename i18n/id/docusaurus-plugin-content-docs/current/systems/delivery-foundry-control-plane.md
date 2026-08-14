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
awal M1 (Foundation). [Pull request #2](https://github.com/okfriansyah-moh/the-foundry/pull/2)
(digabung 2026-07-27) menyelesaikan **Task 23–40** dan keluar dari **M1 — Production Foundation**:

- **Agent harness (Task 2)** — [`.ai/`](https://github.com/okfriansyah-moh/the-foundry/tree/main/.ai) canonical ARES dengan enam agen peran, sebelas skill, dan komposisi multi-provider ke `AGENTS.md` / `CLAUDE.md` / `.codex/` (provider Claude + Codex di `.ai/manifest.yaml`)
- **Plan runner otonom (Task 3)** — `tools/planrunner` dengan jalur AUTO vs GATED berbasis risiko dan gate persetujuan Telegram
- **Stack runtime (Task 4–5)** — `postgres` + `temporal` di compose; paket state enam-status canonical (`internal/state`)
- **Admission dan provenance (Task 6–8, 24)** — schema/parser PLAN, `AdmissionClassifier` deterministik v0, rantai `ApprovedPlan` bertanda tangan dengan audit log berantai hash
- **Substrat eksekusi (Task 9–11, 34)** — worktree manager, kontrak executor, penyimpanan evidence bundle, dan **sandbox executor OCI rootless** (jail filesystem, jaringan default-deny dengan egress gate, cap cgroup)
- **Workflow kernel (Task 12–16, 32)** — worker Temporal `foundryd` menghosting `DeliverPlan`; bukti resume checkpoint + forced-restart; supervisor liveness dan semantik terminal `PROVEN_BLOCKED` yang jujur
- **Permukaan operator (Task 13–15, 18–19, 36)** — validation runner, proyeksi status PostgreSQL, CLI `foundry`, **HTTP API `/v1`** dengan paritas CLI, dan pemeriksaan konstitusi `fitlint`
- **Lapisan foundation (Task 20–22, 23–29, 35–39)** — migrasi, profiles/principals/organizations, **PDP berbasis OPA**, ledger operasi eksternal, SCM GitHub write, cost accounting/anggaran, backend secrets file, **drill backup/restore**, projector v2 dengan alert lag
- **Integrasi produksi (Task 30–33, 38)** — engine notifikasi Telegram dengan flood control, baseline observabilitas Prometheus/Grafana, backpressure/brownout control-plane, lint dokumentasi (`make doclint`) di CI
- **Entry venture (Task 40)** — engine `MissionContract` dan schema misi untuk misi otonom Track A

Kontrak normatif tetap di `docs/foundry/delivery_foundry.md` dan pohon modular
`docs/foundry/docs/`; roadmap implementasi aktif ada di `docs/PLAN.md`
(Task 41–93 masih terbuka — venture MLS, track 10x, dan hardening M2).

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

  API --> POLICY
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
2. **Intake dan admission** — Classifier admission deterministik menetapkan tier
   (A0/A1/A2/H) dan memverifikasi provenance untuk rencana disetujui.
3. **Pembuatan workflow** — Kernel membuat workflow di `PENDING`, transisi ke
   `RUNNING` dengan phase `intake`, dan menetapkan checkpoint.
4. **Interpretasi PEC** — PEC membaca rencana yang diadmit, mengusulkan gelombang
   aware dependensi dan dispatch task terbatas dalam envelope yang diberikan kernel.
5. **Eksekusi terisolasi** — Runner membuat sandbox worktree ephemeral; agen
   mengeksekusi task dan mengembalikan ringkasan ke PEC (bukan langsung ke state kernel).
6. **Verifikasi** — Pemeriksaan deterministik menghasilkan bundel bukti; kernel
   maju phase (mis. `implementation` → `verifying` → `integrating`).
7. **Side effect** — Branch Integrator milik kernel melakukan SCM writes; operasi
   eksternal mencatat kunci idempotency di ledger.
8. **Keputusan terminal** — Kernel menetapkan `SUCCEEDED` atau `FAILED` dengan
   `result_code` terkontrol registry (mis. `MISSION_TARGET_REACHED`,
   `TEN_X_BRANCH_HANDOFF_READY`, `PROVEN_BLOCKED`).
9. **Recovery saat gagal** — Recovery Manager membaca klasifikasi kegagalan dan
   menaiki tangga L0–L7; gate manusia pause di batas yang dikonfigurasi.

## Komponen Penting

| Komponen | Tanggung jawab |
| -------- | --------------- |
| **Kernel** | State workflow otoritatif, sequencing, lease, checkpoint, kebijakan, anggaran, semua side effect |
| **Plan Execution Coordinator (PEC)** | Menginterpretasi rencana diadmit; mengusulkan gelombang, dispatch, remediasi, progress |
| **Admission classifier** | Penetapan tier deterministik; mencegah rencana mengotorisasi diri sendiri |
| **State projection (PostgreSQL)** | Model baca dapat dibangun ulang dengan rebuild/lag alert v2 — bukan otoritas eksekusi |
| **Backend Temporal (`foundryd`)** | Riwayat eksekusi tahan lama, timer, routing task-queue per-lane — worker pada queue `foundry-core` |
| **CLI `foundry` + API `/v1`** | Perintah operator dan paritas HTTP: status, plan submit/approve/verify, projection rebuild, doctor, policy, evidence, mission, budget, audit verify |
| **OPA PDP (`internal/policy/pdp`)** | Keputusan otorisasi berbasis Rego; route API memerlukan session JWT + PDP Allow sebelum handler berjalan |
| **Strong auth (`internal/authn`)** | Session OIDC, WebAuthn step-up untuk approval tier H, binding identitas Telegram |
| **Executor sandbox (`internal/executor/sandbox`)** | Container OCI rootless dengan topologi egress gate; CI memverifikasi lane Docker dan rootless Podman |
| **`fitlint` + `make fitness`** | Penegakan konstitusi: enum lint (C1), superseded-term lint, batas import, resolver doc-link |
| **Agent harness `.ai/`** | Enam peran executor, sebelas skill, instruksi batas otoritas; dikomposisi ke file agen per provider |
| **Plan runner (`tools/planrunner`)** | Orkestrator bootstrap untuk Task 4–22; pensiun setelah kernel mengadmit backlog sendiri (exit condition Task 3) |
| **Pipeline bukti** | Bundel verifikasi bertipe wajib untuk kemajuan phase |
| **Operation ledger (`internal/ledger/extops`)** | Kunci idempotency dan rekonsiliasi untuk side effect eksternal termasuk push SCM |
| **Cost ledger (`internal/ledger/cost`)** | Akuntansi reserve → incur → reconcile dengan enforcement anggaran |
| **Recovery Manager** | Tangga self-healing terbatas dengan larangan eksplisit dan supervisi liveness |
| **Branch Integrator / SCM write** | Push GitHub milik kernel dengan verifikasi CAS dan token source berbasis secrets |
| **Engine Telegram (`internal/notify`)** | Notifikasi ber-tier prioritas, batching, flood control, dead-letter queue |
| **Engine mission (`internal/mission`)** | Schema MissionContract dan store untuk entry venture Track A |

Paket Go kini membawa implementasi nyata hingga Task 40 — masing-masing dengan `doc.go`
batas otoritas: `internal/kernel`, `internal/state`, `internal/admission`,
`internal/provenance`, `internal/evidence`, `internal/worktree`, `internal/executor/*`
(termasuk `sandbox/`), `internal/projection`, `internal/policy/pdp`, `internal/api`,
`internal/authn`, `internal/ledger/*`, `internal/scm/write`, `internal/notify`,
`internal/mission`, `internal/profile`, dan lainnya. Paket PEC tetap proposal-only
per C5; otoritas side effect ada di jalur kode kernel yang dijalankan `foundryd`.

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

## Mode Kegagalan

| Kegagalan | Deteksi | Recovery |
| --------- | ------- | -------- |
| Outage provider transient | `WAITING`, reason `provider-outage` | Backoff L0; timer wake |
| Kegagalan kode deterministik | klasifikasi `deterministic-failure` | Agen debug L2; max 1 retry agen sama |
| Pelanggaran kebijakan | `FAILED`, result `ADMISSION_REJECTED` | Tidak auto-retry; review manusia |
| Anggaran habis | `WAITING`, reason `budget` | Pause sampai reset anggaran atau override manusia |
| PEC overreach | Tes larangan CI | Build gagal sebelum merge |
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

## Pengujian

Validasi saat ini (Task 1–40, exit M1, diimplementasi):

- `make bootstrap test lint fitness doclint` di dalam image Docker `dev`
- `make up` + `make doctor` — verifikasi Docker/Compose, PostgreSQL `SELECT 1`, Temporal `GetSystemInfo`
- `scripts/fitness.sh` (Task 18): `go vet`, kehadiran `doc.go`, plus pemeriksaan `cmd/fitlint` untuk
  enum lint (C1), superseded-term lint, batas import SCM, dan resolusi doc-link
- `make skp-e2e` (Task 19) — Shared Kernel Proof end-to-end: admit plan → worktree → verify →
  evidence bundle → **forced restart → resume dari checkpoint**
- `make m1-exit` (Task 39) — suite acceptance M1: GitHub SCM e2e, approval step-up WebAuthn,
  soak notifikasi Telegram, rebuild proyeksi, verifikasi hash-chain audit, drill brownout, backup/restore
- `make drill-backup-restore` — backup mid-flight saat workflow berjalan, destroy database, restore, lanjut
- Lane sandbox CI — tes isolasi executor Docker dan verifikasi rootless Podman (Task 34, 97)
- `internal/api/*_test.go`, `internal/authn/*_test.go`, `internal/executor/sandbox/*_test.go` — cakupan API, auth, sandbox
- GitHub Actions CI saat push (`.github/workflows/ci.yaml`) termasuk `doclint`, `sandbox-tests`, `sandbox-tests-rootless`

Keterbatasan diketahui (terdokumentasi di laporan exit M1): guard upsert proyeksi hanya
membandingkan nomor sequence; konten stale pada sequence lebih tinggi dapat regresi phase
terproyeksi — ditandai untuk follow-up, tidak disembunyikan.

Validasi direncanakan (milestone tersisa):

- Tes conformance larangan PEC (Task 56)
- Evaluasi fault-injection dan keamanan per spesifikasi V12 (Task 64, 70)

## Operasi dan Observabilitas

- **Entry CLI** — subperintah `foundry`: `doctor`, `status`, `plan submit|approve|verify|revoke`,
  `projection rebuild`, `principal create`, `keygen`, `policy`, `evidence`, `migrate`, `login`,
  `mission`, `budget`, `cost`, `audit verify`, plus paritas HTTP `/v1` via `foundryd`
- **Daemon** — `foundryd` menghosting worker Temporal dan HTTP API; satu-satunya proses yang melakukan side effect kernel (C4)
- **Target Make** — `bootstrap`, `up`, `down`, `doctor`, `test`, `lint`, `fitness`, `doclint`,
  `skp-e2e`, `m1-exit`, `plan-run`, `evidence-verify`, `projection-rebuild`, `backup`, `restore`,
  `drill-backup-restore`, `drill-brownout` (semua dibungkus Docker; profil `up obs` menambah Prometheus/Grafana)
- **Engine Telegram** — Notifikasi ber-tier prioritas (P0–P3), batching, flood control, dead-letter
  store; approval tier H memerlukan step-up WebAuthn, bukan Telegram saja (C11/C12)
- **Cost accounting** — Reserve → incur → reconcile dengan tabel anggaran (`00009_budgets.sql`) dan CLI `budget`/`cost`
- **Observabilitas** — Metrik Prometheus, dashboard Grafana (`deploy/dashboards/foundry-overview.json`),
  runbook projection-lag; katalog SLO penuh tetap di `docs/foundry/docs/operations/observability-and-alerts.md`
- **Backup/restore** — `scripts/backup.sh` / `scripts/restore.sh` dengan verifikasi manifest sha256 dan
  re-verify audit-chain setelah restore; drill mid-flight membuktikan kontinuitas workflow setelah destroy/recover

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

## Terkait

- [Merancang Deterministic Agentic Coding Orchestrator](/id/docs/concepts/deterministic-agentic-orchestrator)
- [State Kanonik dalam Pipeline Desain Multi-Agen](/id/docs/concepts/ai-orchestration-patterns)
- [Ringkasan Proyek Delivery Foundry](/id/docs/projects/delivery-foundry)

## Sumber

- Repository: [okfriansyah-moh/the-foundry](https://github.com/okfriansyah-moh/the-foundry)
- Pull request: [#2 — Task 22–40 (exit M1)](https://github.com/okfriansyah-moh/the-foundry/pull/2) (merge commit [`4b5f3c7`](https://github.com/okfriansyah-moh/the-foundry/commit/4b5f3c70a3b3befaf7942c80eb0c83a619b464ca))
- Pull request: [#1 — Task 3–22](https://github.com/okfriansyah-moh/the-foundry/pull/1) (merge commit [`6efd492`](https://github.com/okfriansyah-moh/the-foundry/commit/6efd492d48d99672afea27da565699e8e8a3983d))
- Commit sebelumnya: [`58632a0`](https://github.com/okfriansyah-moh/the-foundry/commit/58632a0), [`9409080`](https://github.com/okfriansyah-moh/the-foundry/commit/9409080)
- Laporan exit M1: `docs/notes/m1-exit-report.md` di repo sumber
- Arsitektur: `docs/foundry/delivery_foundry.md`, `docs/architecture.md`, `docs/foundry/docs/architecture/state-model.md`
- Agent harness: `.ai/manifest.yaml`, `.ai/instructions/authority-boundaries.md`
- Rencana implementasi: `docs/PLAN.md` (Task 1–40 ✅, exit M1; Task 41–93 pending)
