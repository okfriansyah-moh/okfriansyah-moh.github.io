---
title: "SpoolIn"
description: "Katalog film dan TV lokal dengan alat maintainer, riwayat audit, dan pembuatan film exact-content berbantuan MCP — dimulai dengan fondasi multi-layanan yang dapat direproduksi."
sidebar_position: 9
tags:
  - proyek
  - katalog
  - mcp
keywords:
  - proyek spoolin
  - katalog film
  - deployment lokal
difficulty: Intermediate
---

# SpoolIn

## Apa yang Dibangun

[SpoolIn](https://github.com/okfriansyah-moh/spoolIn) adalah proyek rekayasa publik untuk
**katalog film dan televisi lokal**. Pengunjung menelusuri judul aktif; viewer terdaftar mengelola
sesi sendiri; maintainer mengurus film, orang, kredit, artwork, dan riwayat audit. Arah produk
menambahkan **pembuatan film MCP exact-content** — klien chat AI mengusulkan catatan terstruktur,
tetapi maintainer menyetujui sebelum publikasi.

Repositori dibuka pada **2026-10-15** dengan persyaratan produk (`docs/02-PRD.md`), desain teknis
(`docs/04-spoolin-techdoc.md`), rencana berbasis ATDD (`docs/05-atdd.md`, `docs/06-PLAN.md`), dan
bundel alur agen di `.ai/`. Irisan implementasi pertama — build yang dapat direproduksi, kontrak
yang dihasilkan, dan fondasi Core/Catalog/Media privat — digabung dalam
[PR #1](https://github.com/okfriansyah-moh/spoolIn/pull/1).

## Masalah

Perpustakaan media pribadi yang tersebar di spreadsheet dan catatan tidak memberi maintainer:

- **Siklus hidup archive-first** tunggal (arsip, pulihkan, hapus dengan tinjauan konsekuensi).
- **Akses terpisah per peran** (pengunjung vs viewer vs maintainer vs operator lokal).
- **Audit katalog yang dapat dilacak** saat metadata atau artwork berubah.
- Jalur aman untuk **perluasan katalog berbantuan AI** tanpa model yang mempublikasikan judul diam-diam.

SpoolIn menarget instalasi self-hosted yang operator solo jalankan di loopback dengan container,
bukan SaaS multi-tenant.

## Mengapa Masalah Ini Sulit

1. **Domain kaya** — film, TV (seed read-only), orang, kredit, genre, peran, dan artwork dengan aturan visibilitas berbeda.
2. **Klien multi-permukaan** — UI browser, MCP lewat jembatan stdio Claude Desktop, dan tunnel ChatGPT butuh kredensial berbeda namun berbagi gateway Core.
3. **Pengiriman berbasis bukti** — rencana melacak ratusan kasus penerimaan; tugas fondasi memerlukan build yang dapat direproduksi dan tes batas sebelum gelombang fitur.
4. **Postur keamanan** — mTLS antar layanan, CSRF untuk GraphQL (direncanakan), dan assertion aktor terbatas untuk penulisan katalog terlindungi.

## Model Mental untuk Pemula

SpoolIn adalah **buku besar home theater yang dikurasi**:

- **Buku besar** (Catalog) mencatat apa yang ada dan siapa bermain di dalamnya.
- **Lobi** (Core) memeriksa identitas dan mengarahkan tamu ke ruang yang tepat.
- **Dinding poster** (Media) menyimpan artwork dan mengingat bingkai mana milik judul mana.
- **MCP** adalah slot surat untuk proposal film terstruktur — staf tetap menandatangani sebelum dipajang.

## Persyaratan dan Kendala

| Persyaratan | Lokasi |
| ----------- | ------ |
| Snapshot awal 100 film / 100 TV | Techdoc §1 — data seed beku |
| Metadata TV read-only | Techdoc §1 |
| Mutasi hanya maintainer | Tabel aktor techdoc §1.1 |
| Tanggung jawab operator lokal | Terpisah dari peran browser Maintainer |
| Alur agen portabel | `.ai/bundles/` — 1.1.1 (PR #2), 1.2.0 (PR #5), 1.2.1 (PR #7), **1.3.0** (PR #15) dengan admission perangkat eksekusi bersama |
| Presentasi publik mandiri | Pembersihan dokumentasi PR #3 |
| Shell aplikasi + akun | [PR #4](https://github.com/okfriansyah-moh/spoolIn/pull/4) (shell) dan [PR #6](https://github.com/okfriansyah-moh/spoolIn/pull/6) (sesi, kebijakan, tanda terima, admission) digabung |

## Ringkasan Arsitektur

```mermaid
flowchart LR
  PLAN[PRD + techdoc + rencana ATDD] --> REPO[repositori spoolIn]
  REPO --> FOUND[PR #1 fondasi]
  FOUND --> CORE[Core]
  FOUND --> CAT[Catalog]
  FOUND --> MED[Media]
  REPO --> NEXT[Tugas fitur: shell UI runtime MCP]
  CORE --> CAT
  CORE --> MED
```

Kedalaman teknis: [Arsitektur sistem SpoolIn](/id/docs/systems/spoolin-catalog-platform).

## Evolusi dan Tonggak

| Tanggal | Tonggak |
| ------- | ------- |
| 2026-10-15 | Repositori dibuat; dokumen produk dan teknis masuk |
| 2026-10-15 | [PR #1](https://github.com/okfriansyah-moh/spoolIn/pull/1) digabung — fondasi T001–T003 |
| 2026-10-15 | [PR #2](https://github.com/okfriansyah-moh/spoolIn/pull/2) digabung — alur agen portabel 1.1.1 |
| 2026-10-15 | [PR #3](https://github.com/okfriansyah-moh/spoolIn/pull/3) digabung — presentasi proyek publik mandiri (dokumen) |
| 2026-10-16 | [PR #4](https://github.com/okfriansyah-moh/spoolIn/pull/4) digabung — shell aksesibel T004 + penyimpanan akun T005 |
| 2026-10-16 | [PR #5](https://github.com/okfriansyah-moh/spoolIn/pull/5) digabung — alur agen portabel **1.2.0** |
| 2026-10-16 | [PR #6](https://github.com/okfriansyah-moh/spoolIn/pull/6) digabung — gelombang akses akun T006–T010 |
| 2026-10-16 | [PR #7](https://github.com/okfriansyah-moh/spoolIn/pull/7) digabung — penomoran ulang 26 tahap rencana (workflow **1.2.1**) |
| 2026-10-17 | [PR #8](https://github.com/okfriansyah-moh/spoolIn/pull/8) digabung — G04–G16 jelajah katalog, draft, tulisan maintainer, artwork, UI arsip (T006–T026; penerimaan G26 tertunda) |
| 2026-10-18 | [PR #9](https://github.com/okfriansyah-moh/spoolIn/pull/9) digabung — G17–G26 pemulihan draft, proposal MCP + UI tinjauan, alat seed/ops, matriks serah terima (penerimaan runtime masih terbuka) |
| 2026-10-18 | [PR #10](https://github.com/okfriansyah-moh/spoolIn/pull/10) digabung — README instalasi pemula, alur Docker `local-*`, penyegaran presentasi, perbaikan UUID History, jalur penerimaan remote parsial (bukan penerimaan G26 penuh) |
| 2026-10-18 | [PR #11](https://github.com/okfriansyah-moh/spoolIn/pull/11) digabung — UX katalog/manajemen maintainer (filter, pencarian, navigasi kredit, persiapan artwork, alur simpan, `local-repair-accounts`) |
| 2026-10-18 | [PR #12](https://github.com/okfriansyah-moh/spoolIn/pull/12) digabung — walkthrough Maintainer README + tangkapan layar selaras UI saat ini (hanya dokumen) |
| 2026-10-19 | [PR #13](https://github.com/okfriansyah-moh/spoolIn/pull/13) digabung — kontroler reaktif `*.svelte.ts` Svelte 5 untuk alur sesi/katalog/maintainer (UI tidak berubah; cakupan unit/DOM lebih luas) |
| 2026-10-21 | [PR #14](https://github.com/okfriansyah-moh/spoolIn/pull/14) digabung — **poster yang disiapkan** dan **kredit proposal** MCP, **`movie_review_queue`** gabungan untuk tinjauan dalam chat, halaman proposal Maintainer browser dengan CSRF, migrasi Catalog V023–V025, dan kedaluwarsa proposal 24 jam (cakupan tes otomatis tidak dijalankan menurut bukti PR) |
| 2026-10-21 | [PR #15](https://github.com/okfriansyah-moh/spoolIn/pull/15) digabung — bundle **agent-workflow 1.3.0**: satu prosedur delivery untuk Codex/Cursor/Claude/Copilot, **admission sumber daya perangkat eksekusi** bersama di runner gerbang, 74 skill selaras, ambang kualitas dipertahankan |
| 2026-10-23 | [PR #16](https://github.com/okfriansyah-moh/spoolIn/pull/16) digabung — `docs/prompts/` terpadu, modul `list-return` bersama, helper MCP/Catalog tidak terpakai dihapus, cek **repository-hygiene**, refresh bundle untuk [kebijakan reuse berbasis implementasi](https://github.com/okfriansyah-moh/agentic-workflow/pull/1) (suite static frontend penuh tertunda menurut bukti tekanan memori PR) |
| 2026-10-27 | [PR #17](https://github.com/okfriansyah-moh/spoolIn/pull/17) digabung — adopsi **agent-workflow 1.4.0**, gate kualitas **80% / Sonar tepat nol** enam komponen, modul transport/receipt/SQL bersama, preservasi identitas SHA-256; **4.328** tes unit dikutip pada revisi `1d3f0bd` (snapshot Sonar 2026-10-26) |
| 2026-10-27 | [PR #18](https://github.com/okfriansyah-moh/spoolIn/pull/18) digabung — stack **`make observability`** opsional (Prometheus, Grafana, Loki, cAdvisor, exporter) dengan dashboard loopback dan riwayat yang dipertahankan; penerimaan delivery penuh untuk monitoring masih tertunda menurut bukti PR |
| Berikutnya | Tutup gerbang runtime G26 dan bukti **delivery penuh** yang tersisa (admission resource, pemetaan stack) sambil menjaga monitoring opsional terpisah dari restart aplikasi |

## Keputusan Kunci

| Keputusan | Alasan |
| --------- | ------ |
| Layanan Kotlin/Spring Boot | Stack enterprise bertipe dengan Flyway, gRPC, dan GraphQL mendatang |
| Frontend SvelteKit | Shell dan rute manage digabung (PR #4, #8); build statis disajikan Core |
| Gateway MCP di Core | Penegakan persetujuan dan kebijakan terpusat untuk klien chat |
| Rencana tugas berbasis bukti | ATDD + gerbang harness sebelum klaim fitur lengkap |
| Deployment Compose lokal | Lingkup instalasi pribadi; tanpa cloud terkelola di desain v1 |

## Hubungan dengan Proyek Lain

SpoolIn berbagi **disiplin pengiriman** dengan
[Delivery Foundry](/id/docs/projects/delivery-foundry). Generasi kontrak dan build yang dapat
direproduksi menggemakan pola di
[pipeline AI deterministik](/id/docs/concepts/deterministic-ai-pipelines), tetapi SpoolIn adalah
basis kode independen.

## Pelajaran yang Dipetik

1. **Kirim fondasi sebelum poles UI** — kontrak dan kepemilikan basis data mengurangi risiko tugas katalog dan MCP berikutnya.
2. **Dokumentasikan tipe aktor sejak awal** — memisahkan Maintainer dari operator lokal mencegah jalan pintas izin.
3. **Selaraskan narasi publik dengan bukti** — PR #3 membingkai ulang dokumen tanpa mengubah runtime.
4. **Pantau PR koherensi terbuka di tempat lain** — saat [a2a-brainstormer#12](https://github.com/okfriansyah-moh/a2a-brainstormer/pull/12) digabung, tautkan pola persetujuan MCP ke [koherensi dokumen AI](/id/docs/concepts/ai-document-coherence).

## Terkait

- [Arsitektur sistem SpoolIn](/id/docs/systems/spoolin-catalog-platform)
- [Guardrail LLM](/id/docs/concepts/llm-guardrails)
- [Reuse berbasis implementasi dan pembersihan berbasis bukti](/id/docs/concepts/implementation-first-reuse-and-cleanup)

## Sumber

- Repositori: [okfriansyah-moh/spoolIn](https://github.com/okfriansyah-moh/spoolIn)
- Pull request: [#1](https://github.com/okfriansyah-moh/spoolIn/pull/1)–[#18](https://github.com/okfriansyah-moh/spoolIn/pull/18)
- Desain teknis: `docs/04-spoolin-techdoc.md`
