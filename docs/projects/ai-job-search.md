---
title: "AI Job Search — Telegram Notification Fork"
description: "A fork of MadsLorentzen/ai-job-search that adds an automated Telegram digest bot — scraping job portals daily, ranking matches, and pushing rich job cards directly to your phone."
sidebar_position: 7
tags:
  - project
  - automation
  - telegram
  - ai systems
keywords:
  - ai job search automation
  - telegram job notifications
  - job scraper bot
  - automated job digest
  - python telegram bot
  - daily job alerts
---

# AI Job Search — Telegram Notification Fork

This project is a personal fork of [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search), an open-source AI-assisted job search toolkit. The upstream repo is a well-crafted system for CV management, salary lookup, cover letter generation, and portal scraping. All credit for the core framework goes to [Mads Lorentzen](https://github.com/MadsLorentzen) and contributors.

The fork at [okfriansyah-moh/ai-job-search](https://github.com/okfriansyah-moh/ai-job-search) adds one focused capability on top: **an automated daily Telegram notification pipeline** that pushes ranked job matches directly to your phone without requiring you to open any dashboard or run any command manually.

---

## What the Fork Adds

The upstream project already scrapes job portals and ranks results. The missing piece was *delivery* — you still had to check the output manually. This fork closes that loop by introducing:

1. A Telegram bot client built on the standard library (no third-party SDK)
2. A ranked job digest formatted as HTML cards
3. Deduplication to avoid re-notifying about jobs you've already seen
4. Retry-safe outbox with failure classification
5. Scheduler support for cron, launchd, GitHub Actions, and AI coding agents

---

## Architecture

```
Portal Scrapers → merge_jobs() → rank_job() → send_digest() → Telegram Bot API
                                                     ↓
                                            NotificationDeduper
                                            (SQLite-backed fingerprints)
```

The pipeline runs as a single daily invocation of `automation/run_daily.py`. Each stage is idempotent — re-running on the same date is a no-op unless `--force` is passed.

---

## Telegram Delivery (`automation/telegram.py`)

The Telegram module is self-contained with zero external dependencies beyond Python's standard library. It communicates with the [Telegram Bot API](https://core.telegram.org/bots/api) directly via `urllib.request`.

### Job Cards

Each new job match is rendered as a structured HTML message:

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

Cards include match score, rank verdict, location, work mode (Remote / Hybrid / On-site), seniority, salary, posting date, deadline, and a direct application link — everything you need to triage a job without opening a browser.

### Message Batching

The Telegram API has a 4096-character message limit. The module splits card lists into batches capped at `CARD_BUDGET = 3500` characters to leave room for the digest header and footer:

```python
MAX_MESSAGE = 4096
CARD_BUDGET = 3500
```

### Deduplication

A `NotificationDeduper` tracks SHA-256 fingerprints of every sent notification. Before each send, the digest checks which jobs have already been delivered and skips them — so running the pipeline twice in a day won't flood the chat.

### Retry Safety

Delivery errors are classified as retryable or non-retryable:

```python
class TelegramDeliveryError(RuntimeError):
    def __init__(self, message: str, *, retryable: bool):
        super().__init__(message)
        self.retryable = retryable
```

Failed batches are held in an outbox and retried on the next run, rather than silently dropped.

---

## Daily Runner (`automation/run_daily.py`)

The `run_daily.py` script ties all stages together and is the single entrypoint for every scheduler:

```python
# Runs with any of these schedulers:
--scheduler codex | cursor | claude | copilot | cron | launchd | manual
```

The run sequence:
1. Acquire a file lock to prevent concurrent runs
2. Check if today's run already succeeded (idempotency gate)
3. Scrape enabled portals for jobs posted in the last 14 days
4. Merge with the existing `seen_jobs.json` state, skipping duplicates
5. Rank each new job against your profile
6. Call `send_digest()` to push Telegram cards
7. Write success state with a full summary JSON

```python
summary = {
    "fetched": len(fetched),
    "new": len(new_jobs),
    "ranked": len(ranked),
    "portals": { ... },
    "telegram": telegram,
}
```

The `--dry-run` flag previews the full pipeline without writing state or sending any messages — useful for testing portal configuration.

---

## Scheduler Support

The `automation/schedulers/` directory includes ready-made scheduler configs:

| File | Purpose |
|---|---|
| `github-actions.yml.example` | Run daily at 08:00 via GitHub Actions |
| `com.ai-job-search.daily.plist.example` | macOS launchd daily job |
| `com.ai-job-search.telegram.plist.example` | macOS launchd for Telegram listener |

The GitHub Actions scheduler is the most portable option — it requires no local machine and runs for free on public repositories.

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

Create a Telegram bot via [@BotFather](https://t.me/BotFather), send `/start` to your new bot, and retrieve your `chat_id` using `automation/telegram_setup.py`.

---

## What the Upstream Repo Provides

Everything not described above comes from the excellent upstream project by Mads Lorentzen:

- **Portal scrapers** — LinkedIn, Jobindex, and community-contributed portals
- **AI ranking** — LLM-powered job-fit scoring against your CV
- **Salary lookup** — Converts salary data across regions and currencies
- **CV pipeline** — LaTeX CV with moderncv, cover letter generation
- **Tracker** — CSV-based application status tracker with deadline tracking
- **HTML report** — Local report rendering from tracker data

If you're building a job search workflow from scratch, start with the [upstream repository](https://github.com/MadsLorentzen/ai-job-search). This fork is only interesting if you specifically want the Telegram push layer on top.

---

## Related

- [Automation patterns used in this project](/docs/concepts/deterministic-ai-pipelines) — idempotent daily runners and state machines
- [MD-AME](/docs/projects/md-ame) — another autonomous pipeline with scheduled execution
- [Delivery Foundry](/docs/projects/delivery-foundry) — pipeline orchestration patterns
