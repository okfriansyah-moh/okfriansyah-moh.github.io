---
title: "AI Job Search — Fork Notifikasi Telegram"
description: "Fork dari MadsLorentzen/ai-job-search yang menambahkan bot digest Telegram otomatis — scraping portal kerja harian, memberi ranking kecocokan, lalu mengirim kartu lowongan langsung ke ponsel."
sidebar_position: 7
tags:
  - project
  - automation
  - telegram
  - ai systems
keywords:
  - otomasi pencarian kerja ai
  - notifikasi lowongan telegram
  - bot scraper lowongan
  - digest lowongan otomatis
  - python telegram bot
  - alert lowongan harian
---

# AI Job Search — Fork Notifikasi Telegram

Proyek ini adalah fork pribadi dari [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search), toolkit pencarian kerja berbantuan AI berbasis open source. Repositori upstream sudah kuat untuk manajemen CV, lookup gaji, generasi cover letter, dan scraping portal kerja. Seluruh kredit untuk framework inti tetap milik [Mads Lorentzen](https://github.com/MadsLorentzen) dan para kontributor.

Fork di [okfriansyah-moh/ai-job-search](https://github.com/okfriansyah-moh/ai-job-search) menambahkan satu kapabilitas fokus di atas upstream: **pipeline notifikasi Telegram otomatis harian** yang mendorong hasil ranking lowongan langsung ke ponsel tanpa perlu membuka dashboard atau menjalankan perintah manual.

---

## Apa yang Ditambahkan Fork Ini

Upstream sudah bisa scrape portal dan memberi ranking hasil. Bagian yang belum ada adalah *delivery* — hasil masih harus dicek manual. Fork ini menutup loop tersebut dengan:

1. Klien bot Telegram berbasis standard library (tanpa SDK pihak ketiga)
2. Digest lowongan ter-ranking dalam format kartu HTML
3. Deduplikasi agar lowongan yang sama tidak terkirim berulang
4. Outbox retry-safe dengan klasifikasi kegagalan
5. Dukungan scheduler untuk cron, launchd, GitHub Actions, dan AI coding agents

---

## Arsitektur

```
Portal Scrapers → merge_jobs() → rank_job() → send_digest() → Telegram Bot API
                                                     ↓
                                            NotificationDeduper
                                            (SQLite-backed fingerprints)
```

Pipeline berjalan sebagai satu invocation harian melalui `automation/run_daily.py`. Setiap tahap bersifat idempoten — menjalankan ulang di tanggal yang sama akan no-op kecuali `--force` digunakan.

---

## Delivery Telegram (`automation/telegram.py`)

Modul Telegram berdiri sendiri tanpa dependency eksternal selain Python standard library. Komunikasi ke [Telegram Bot API](https://core.telegram.org/bots/api) dilakukan langsung via `urllib.request`.

### Kartu Lowongan

Setiap match lowongan baru dirender sebagai pesan HTML terstruktur:

```python
lines = [
    f"<b>{title}</b> · {company_line}",
    f"<b>Fit:</b> {score} · {verdict}",
    f"<b>Job location:</b> {job_location}",
    f"<b>Work category:</b> {work_mode}",
    f"<b>Level:</b> {seniority} · <b>Employment:</b> {employment_type}",
    f"<b>Compensation:</b> {salary}",
    f"<b>Posted:</b> {posted_date} · <b>Deadline:</b> {deadline}",
    f"<b>Source:</b> {portal}",
]
```

Kartu berisi skor kecocokan, verdict ranking, lokasi, mode kerja (Remote / Hybrid / On-site), level senioritas, rentang gaji, tanggal posting, deadline, dan link apply langsung.

### Batching Pesan

Telegram API membatasi pesan maksimal 4096 karakter. Modul membagi daftar kartu ke beberapa batch dengan batas `CARD_BUDGET = 3500` untuk menyisakan ruang bagi header dan footer digest:

```python
MAX_MESSAGE = 4096
CARD_BUDGET = 3500
```

### Deduplication

`NotificationDeduper` melacak fingerprint SHA-256 dari setiap notifikasi yang terkirim. Sebelum kirim, digest mengecek lowongan yang sudah pernah dikirim dan melewatinya — sehingga run ulang pada hari yang sama tidak membanjiri chat.

### Retry Safety

Error delivery diklasifikasikan sebagai retryable atau non-retryable:

```python
class TelegramDeliveryError(RuntimeError):
    def __init__(self, message: str, *, retryable: bool):
        super().__init__(message)
        self.retryable = retryable
```

Batch yang gagal ditahan di outbox dan dicoba ulang pada run berikutnya, bukan dibuang diam-diam.

---

## Daily Runner (`automation/run_daily.py`)

Script `run_daily.py` mengikat seluruh tahap dan menjadi single entrypoint untuk semua scheduler:

```python
# Runs with any of these schedulers:
--scheduler codex | cursor | claude | copilot | cron | launchd | manual
```

Urutan run:
1. Mengambil file lock untuk mencegah run paralel
2. Memeriksa apakah run hari ini sudah sukses (idempotency gate)
3. Scrape portal yang aktif untuk lowongan 14 hari terakhir
4. Merge dengan state `seen_jobs.json`, sambil melewati duplikasi
5. Ranking setiap lowongan baru terhadap profil pengguna
6. Memanggil `send_digest()` untuk kirim kartu Telegram
7. Menulis status sukses dengan ringkasan JSON lengkap

```python
summary = {
    "fetched": len(fetched),
    "new": len(new_jobs),
    "ranked": len(ranked),
    "portals": { ... },
    "telegram": telegram,
}
```

Flag `--dry-run` mem-preview keseluruhan pipeline tanpa menulis state atau mengirim pesan.

---

## Dukungan Scheduler

Direktori `automation/schedulers/` menyediakan konfigurasi scheduler siap pakai:

| File | Tujuan |
|---|---|
| `github-actions.yml.example` | Menjalankan job harian pukul 08:00 via GitHub Actions |
| `com.ai-job-search.daily.plist.example` | Job harian macOS launchd |
| `com.ai-job-search.telegram.plist.example` | Listener Telegram berbasis macOS launchd |

Scheduler GitHub Actions adalah opsi paling portabel — tidak membutuhkan mesin lokal dan bisa berjalan gratis untuk repository publik.

---

## Setup

```bash
git clone https://github.com/okfriansyah-moh/ai-job-search
cd ai-job-search

# Set required environment variables
export TELEGRAM_BOT_TOKEN="your-bot-token"
export TELEGRAM_CHAT_ID="your-chat-id"

# Test the pipeline without sending
python -m automation.run_daily --dry-run

# Run for real
python -m automation.run_daily
```

Buat bot Telegram via [@BotFather](https://t.me/BotFather), kirim `/start` ke bot baru, lalu ambil `chat_id` menggunakan `automation/telegram_setup.py`.

---

## Apa Saja yang Disediakan Repositori Upstream

Seluruh fitur yang tidak dibahas di atas berasal dari proyek upstream Mads Lorentzen:

- **Portal scrapers** — LinkedIn, Jobindex, dan portal kontribusi komunitas
- **AI ranking** — Scoring kecocokan lowongan berbasis LLM terhadap CV
- **Salary lookup** — Konversi data gaji lintas region dan mata uang
- **CV pipeline** — CV LaTeX moderncv dan generasi cover letter
- **Tracker** — Pelacakan status lamaran berbasis CSV dengan deadline
- **HTML report** — Render laporan lokal dari data tracker

Jika ingin membangun workflow pencarian kerja dari nol, mulai dari [repositori upstream](https://github.com/MadsLorentzen/ai-job-search). Fork ini relevan bila Anda spesifik membutuhkan layer push Telegram di atasnya.

---

## Terkait

- [Pola otomasi yang dipakai proyek ini](/docs/concepts/deterministic-ai-pipelines) — daily runner idempoten dan state machine
- [MD-AME](/docs/projects/md-ame) — pipeline otonom lain dengan eksekusi terjadwal
- [Delivery Foundry](/docs/projects/delivery-foundry) — pola orkestrasi pipeline
