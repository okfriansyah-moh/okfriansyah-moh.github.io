---
title: "Selamat Datang di Hub Pengetahuan Rekayasa Sistem AI"
description: "Pengenalan basis pengetahuan engineering ini — cakupan dan artikel yang sudah diterbitkan."
authors: [okfriansyah]
tags:
  - announcement
---

Ini adalah Hub Pengetahuan Rekayasa Sistem AI — basis pengetahuan teknis terstruktur yang mendokumentasikan arsitektur, pola, dan trade-off di balik sistem AI otonom yang dibangun untuk produksi.

<!-- truncate -->

## Yang Sudah Diterbitkan

Basis pengetahuan ini kini mencakup **12 artikel engineering** di sistem, konsep, dan proyek — masing-masing tersedia dalam Bahasa Inggris dan Bahasa Indonesia.

### Sistem

- [Membangun Pipeline Pemrosesan Video Panjang yang Dapat Dilanjutkan](/docs/systems/shorts-generator-pipeline) — pipeline deterministik 16 tahap dengan checkpointing SQLite
- [MD-AME: Autonomous Media Engine](/docs/systems/md-ame-autonomous-media-engine) — produksi media berparameter dimensi dengan state machine PostgreSQL
- [Polymarket Trading Agent](/docs/systems/polymarket-trading-agent) — sistem trading berbasis event bus Postgres dengan hard gate probabilitas

### Konsep

- [Deterministic AI Pipelines](/docs/concepts/deterministic-ai-pipelines) — worker idempoten dan tahap yang dikontrol orchestrator
- [Database-Backed State Machines](/docs/concepts/database-state-machines) — transisi atomik dan pemulihan crash
- [AI Orchestration Patterns](/docs/concepts/ai-orchestration-patterns) — agen berurutan berperan tetap dengan canonical state
- [LLM Guardrails](/docs/concepts/llm-guardrails) — sanitasi input, validasi output, dan isolasi advisory
- [Cara Mencegah Kontradiksi dalam Dokumen Hasil AI](/docs/concepts/ai-document-coherence) — generasi per-bagian dengan audit koherensi
- [Merancang Orchestrator Coding Agentik Deterministik](/docs/concepts/deterministic-agentic-orchestrator) — loop agen berbasis tugas dengan rollback checkpoint

### Proyek

- [MD-AME](/docs/projects/md-ame) — mesin produksi YouTube otonom
- [Polymarket Agent](/docs/projects/polymarket-agent) — sistem trading prediction market
- [Pengetahuan AI Coding Portabel dengan ARES](/docs/projects/ares) — standar `.ai/` netral provider

Jelajahi katalog lengkap di halaman [Artikel](/articles).
