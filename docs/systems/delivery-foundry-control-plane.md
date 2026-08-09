---
title: "Delivery Foundry: Governed Control Plane for AI Software Delivery"
description: "Architecture of a durable, resumable, evidence-verified control plane where a kernel owns state and side effects while a Plan Execution Coordinator proposes work under explicit policy envelopes."
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

# Delivery Foundry: Governed Control Plane for AI Software Delivery

## What Was Built

[Delivery Foundry](https://github.com/okfriansyah-moh/the-foundry) is a **governed
control plane** for loop-engineered software delivery. The V12 architecture defines a
durable, resumable, evidence-verified execution model for AI agents operating under
explicit policy envelopes rather than implicit trust.

The repository shipped **Task 1** on 2026-07-20 (Docker-wrapped Makefile, CI, Go
scaffolds). [Pull request #1](https://github.com/okfriansyah-moh/the-foundry/pull/1)
(merged 2026-07-25) completes **Tasks 2–22** through milestone M0 (Shared Kernel Proof)
and the start of M1 (Foundation):

- **Agent harness (Task 2)** — ARES-canonical [`.ai/`](https://github.com/okfriansyah-moh/the-foundry/tree/main/.ai) with six role agents, eleven skills, and multi-provider composition into `AGENTS.md` / `CLAUDE.md` / `.codex/` (Claude + Codex providers in `.ai/manifest.yaml`)
- **Autonomous plan runner (Task 3)** — `tools/planrunner` with risk-tiered AUTO vs GATED paths and Telegram approval gates
- **Runtime stack (Tasks 4–5)** — `postgres` + `temporal` in compose; canonical six-status state package (`internal/state`)
- **Admission and provenance (Tasks 6–8)** — PLAN schema/parser, deterministic `AdmissionClassifier` v0, signed `ApprovedPlan` chain
- **Execution substrate (Tasks 9–11)** — worktree manager, executor contract + fake executor, evidence bundle store
- **Kernel workflow (Tasks 12–16)** — `foundryd` Temporal worker hosting `DeliverPlan`; checkpoint + forced-restart resume proof
- **Operator surface (Tasks 13–15, 18–19)** — validation runner, PostgreSQL status projection, `foundry` CLI (`status`, `plan submit|approve|verify`, `projection rebuild`, `doctor`, `policy`, `evidence`, `principal`), and `fitlint` constitution checks
- **Foundation layer (Tasks 20–22)** — migrations framework, profiles/principals/organizations, policy compiler v1
- **Operator config SoT (Tasks 156–161, [PR #14](https://github.com/okfriansyah-moh/the-foundry/pull/14))** — `internal/operatorcfg.Store` reads policy layers, quotas, model rates, opportunity thresholds, mission-decide policies, tunable values, and packaging catalogs from **PostgreSQL** as the source of truth; daemon startup seeds from disk when keys are empty; CLI catalog commands accept `-pg-dsn` for DB-backed catalogs and rollback

Normative contracts remain in `docs/foundry/delivery_foundry.md` and the modular
`docs/foundry/docs/` tree; the live implementation roadmap is `docs/PLAN.md`
(Tasks 23–155 and 162–83 still open beyond the CFG/CAP milestone).

## The Problem

Most AI coding workflows treat agents as trusted executors: they read a plan, mutate
repositories, and self-report completion. That model breaks under retries (duplicate
side effects), crashes (lost progress), policy drift (agents expanding their own
permissions), and ambiguous terminal states (was the work actually verified?).

A production-grade delivery loop needs a **control plane** that owns authoritative state,
sequences side effects, enforces budgets and approvals, and accepts completion only when
backed by typed evidence — while still letting an agent coordinator propose the next
wave of work.

## Why This Problem Is Difficult

1. **Split authority** — An agent must interpret plans and recommend dispatch, but must
   never become a second workflow engine or mutate authoritative state directly.
2. **Six statuses, infinite nuance** — Workflow meaning must live in registry-controlled
   typed fields (`phase`, `reason`, `result_code`), not in ad hoc status enums.
3. **Dual product tracks** — Personal venture autonomy and organization 10x engineering
   share one kernel but require different governance profiles and terminal semantics.
4. **Honest completion** — Terminal outcomes like `PROVEN_BLOCKED` or
   `TEN_X_BRANCH_HANDOFF_READY` must encode real evidence, not agent optimism.
5. **Recovery without invention** — Self-healing must climb a bounded ladder (retry →
   sandbox recreate → rollback → human escalation) without suppressing security alerts.

## Beginner Mental Model

Picture a factory control room (the **kernel**) and a floor supervisor (the **Plan
Execution Coordinator**, or PEC). The supervisor reads the production plan, proposes
which station should run next, and reports progress — but only the control room may
flip switches, write to the ledger, push to Git, or declare the batch finished. Every
state change requires a stamped evidence bundle. If power fails, the control room
replays from the last checkpoint; the supervisor does not restart the factory from
memory.

## Requirements and Constraints

| Requirement | Architectural contract |
|-------------|------------------------|
| Exactly six workflow statuses | `PENDING`, `RUNNING`, `WAITING`, `SUCCEEDED`, `FAILED`, `CANCELLED` |
| Richer meaning in typed fields | Registry-controlled `phase`, `reason`, `result_code` |
| Kernel owns side effects | SCM writes, budgets, leases, checkpoints, completion |
| PEC proposes only | Waves, dispatch, remediation — prohibition-tested in CI |
| Evidence-based completion | No self-reported "done" without verification bundle |
| Deterministic admission | Versioned classifier; plans cannot authorize themselves |
| Isolated workspaces | Agents operate in worktrees, never canonical clones |
| Idempotent external ops | Operation ledger with idempotency keys for every side effect |
| Dual-track parallelism | Venture and 10x tracks share kernel, independent acceptance gates |

These constraints are enumerated as constitution articles C1–C22 in `PLAN_7.md`.

## Architecture Overview

Delivery Foundry is a **control plane**, not a universal agent framework or a shell-script
collection. Clients (CLI, Web UI, Telegram, CI webhooks) call into the control plane;
the runner plane executes bounded work in isolated sandboxes and returns typed evidence.

```mermaid
flowchart TB
  subgraph Clients
    CLI[foundry CLI]
    WEB[Web UI]
    CHAT[Telegram / Slack]
    CI[CI webhooks]
  end

  subgraph ControlPlane["Foundry Control Plane (kernel authority)"]
    API[API and identity]
    CFG[(Operator config store<br/>Postgres SoT)]
    POLICY[Policy decision point]
    WF[Durable workflow backend]
    LEDGER[Audit and event ledger]
    RECON[Operation reconciler]
  end

  subgraph RunnerPlane["Runner plane"]
    PEC[Plan Execution Coordinator]
    RUNNER[Isolated task runner]
    WORKTREE[Worktree manager]
    VERIFY[Verification tools]
  end

  subgraph External["External systems"]
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
  PEC -->|proposes waves| WF
  WF --> RUNNER
  RUNNER --> WORKTREE
  RUNNER --> VERIFY
  RUNNER -->|evidence| LEDGER
  WF --> SCM
  WF --> DEPLOY
  RUNNER --> MODEL
```

## Execution Flow

1. **Entry** — A mission, mockup, requirement, specification, or approved `PLAN.md`
   arrives at the control plane API.
2. **Operator config readiness** — On `foundryd` startup, `operatorcfg.Store.EnsureSeeded`
   loads disk YAML into Postgres when a config key has no active version; all subsequent
   policy compilation, quota enforcement, model rates, opportunity gates, and packaging
   catalog reads come from the database (versioned payloads + apply audit).
3. **Intake and admission** — The deterministic admission classifier assigns tier
   (A0/A1/A2/H) and verifies provenance for approved plans.
4. **Workflow creation** — Kernel creates a workflow in `PENDING`, transitions to
   `RUNNING` with phase `intake`, and assigns a checkpoint.
5. **PEC interpretation** — PEC reads the admitted plan, proposes dependency-aware
   waves and bounded task dispatch within the kernel-granted envelope.
6. **Isolated execution** — Runner spawns an ephemeral sandbox worktree; agents execute
   tasks and return summaries to PEC (not directly to kernel state).
7. **Verification** — Deterministic checks produce an evidence bundle; kernel advances
   phase (e.g., `implementation` → `verifying` → `integrating`).
8. **Side effects** — Kernel-owned Branch Integrator performs SCM writes; external
   operations record idempotency keys in the ledger.
9. **Terminal decision** — Kernel sets `SUCCEEDED` or `FAILED` with a registry-controlled
   `result_code` (e.g., `MISSION_TARGET_REACHED`, `TEN_X_BRANCH_HANDOFF_READY`,
   `PROVEN_BLOCKED`).
10. **Recovery on failure** — Recovery Manager reads failure classification and climbs
   the L0–L7 ladder; human gates pause at configured boundaries.

## Important Components

| Component | Responsibility |
| --------- | -------------- |
| **Kernel** | Authoritative workflow state, sequencing, leases, checkpoints, policy, budgets, all side effects |
| **Plan Execution Coordinator (PEC)** | Interprets admitted plans; proposes waves, dispatch, remediation, progress |
| **Admission classifier** | Deterministic tier assignment; prevents self-authorizing plans |
| **State projection (PostgreSQL)** | Rebuildable read model — not execution authority |
| **Temporal backend (`foundryd`)** | Durable execution history, timers, sequencing — Task 12 worker on queue `foundry-core` |
| **`foundry` CLI** | Operator commands: status (consistency levels), plan submit/approve/verify, projection rebuild, doctor, policy, evidence |
| **`fitlint` + `make fitness`** | Constitution enforcement: enum lint (C1), superseded-term lint, import boundaries, doc-link resolver |
| **`.ai/` agent harness** | Six executor roles, eleven skills, authority-boundary instructions; composed to provider-specific agent files |
| **Plan runner (`tools/planrunner`)** | Bootstrap orchestrator for Tasks 4–22; retires once kernel admits its own backlog (Task 3 exit condition) |
| **Evidence pipeline** | Typed verification bundles required for phase advancement |
| **Operation ledger** | Idempotency keys and reconciliation for external side effects |
| **Recovery Manager** | Bounded self-healing ladder with explicit prohibitions |
| **Branch Integrator** | Kernel-owned SCM writes to isolated worktrees and 10x branches |
| **`operatorcfg.Store` (Tasks 156–161)** | Postgres-backed operator-hot config SoT: versioned policy layers, quotas, model policy/rates, opportunity thresholds, mission-decide policy, tunable values, packaging catalogs/enablement; seeds from disk on first run |
| **Packaging catalog loader** | File-backed fallback for local dev; `-pg-dsn` on `foundry catalog` subcommands loads catalogs and enablement from the config store |

Go packages now carry real implementations through Task 22 and the CFG/CAP milestone
(Tasks 156–161) — each with a `doc.go`
stating authority limits: `internal/kernel` (Temporal workflow), `internal/state`
(six-status model), `internal/admission`, `internal/provenance`, `internal/evidence`,
`internal/worktree`, `internal/executor/*`, `internal/projection`, `internal/policy`,
`internal/profile`, `internal/operatorcfg`, and others. PEC packages remain proposal-only per C5; side-effect
authority stays in kernel code paths exercised by `foundryd`.

## Simplified Implementation Examples

Canonical state representation (from `docs/architecture/state-model.md`):

```yaml
status: RUNNING          # one of six canonical statuses
phase: implementation    # registry-controlled
reason: null             # set when WAITING or FAILED
result_code: null        # set only at terminal transition
wake_at: null
next_action: verify
checkpoint_id: checkpoint-789
```

PEC authority boundary (simplified from `docs/architecture/authority-model.md`):

```text
PEC MAY:  propose waves, recommend dispatch, evaluate summaries, propose remediation
PEC MUST NOT: mutate workflow state, perform SCM writes, grant permissions,
              increase budgets, declare terminal completion, override policy
```

Recovery ladder entry (from `docs/workflows/recovery.md`):

```text
L0 — retry idempotent operation with backoff
L1 — recreate clean sandbox and repeat
L2 — focused debugging agent
...
L7 — pause and escalate to human
```

Operator config versioning (simplified from `internal/operatorcfg/store.go` and migration `00044_operator_config_sot.sql`):

```sql
-- Each config_key tracks an active_version pointer
-- operator_config_versions stores immutable payload + SHA256 + apply metadata
-- operator_config_apply_audit records who approved each promotion
SELECT config_key, active_version FROM operator_config_entries;
-- Keys include policy.layer.*, quotas, executor.models, packaging.catalog.*
```

Startup seed path (simplified from `cmd/foundryd/main.go`):

```go
cfgStore := operatorcfg.NewStore(db)
cfgStore.EnsureSeeded(ctx, operatorcfg.SeedPaths{
    PolicyOrganizationPath: "config/profiles/organization-10x.yaml",
    PolicyPersonalPath:     "config/profiles/personal-autonomous-venture.yaml",
    // ... quotas, model rates, catalogs, enablement ...
})
modelPolicy, err := cfgStore.LoadModelPolicy(ctx) // all runtime reads are DB-backed
```

## Reliability and Idempotency

- **Checkpoints** — Kernel records `checkpoint_id` on every meaningful transition;
  process restart replays from Temporal history and PostgreSQL projection.
- **External-operation ledger** — Every SCM push, deployment, or billing call carries an
  idempotency key; reconciler detects duplicate or orphaned operations.
- **Six-status invariant** — CI fitness rules reject a second status enum; historical V11
  labels map to canonical `(status, phase, reason, result_code)` tuples only.
- **Liveness supervision** — `ORPHANED` is a supervisor condition, not a workflow status;
  disaster-recovery docs define checkpoint/restart semantics.
- **Honest blocking** — `PROVEN_BLOCKED` on `FAILED` means verified evidence that work is
  unsatisfiable as scoped — not a generic error code.
- **Versioned operator config** — Policy overlays, quotas, and packaging catalogs promote
  through immutable version rows; `active_version` on `operator_config_entries` is the only
  mutable pointer; apply audit enforces reviewer ≠ implementer on promotions.
- **Seed-then-serve** — First `foundryd` boot copies disk YAML into Postgres when a key has
  no versions; later changes must go through the config store apply path, not silent file edits.

## Failure Modes

| Failure | Detection | Recovery |
| ------- | --------- | -------- |
| Transient provider outage | `WAITING`, reason `provider-outage` | L0 backoff; wake timer |
| Deterministic code failure | classification `deterministic-failure` | L2 debug agent; max 1 same-agent retry |
| Policy violation | `FAILED`, result `ADMISSION_REJECTED` | No auto-retry; human review |
| Budget exhaustion | `WAITING`, reason `budget` | Pause until budget reset or human override |
| PEC overreach | CI prohibition tests | Build fails before merge |
| Stale file-based config | Daemon reads DB; missing key fails startup with named error | Re-seed or apply new version via operatorcfg |
| Process crash mid-phase | Liveness supervisor | Replay from checkpoint; resume at last committed phase |
| Security hold | `WAITING`, reason `security-hold` | Recovery Manager cannot suppress alerts |

## Trade-offs and Rejected Alternatives

| Decision | Rationale |
| -------- | --------- |
| Kernel vs PEC split | Prevents agent frameworks from becoming shadow workflow engines |
| Six statuses + typed fields | Extensible phases without enum explosion; CI-enforceable |
| Temporal + PostgreSQL projection | Durable history separate from rebuildable read model (C2/C3) |
| Build control plane (ADR-000) | Differentiating sequencing/policy logic vs buying generic orchestration |
| V12 doc modularization | Preserves V11 content while adding normative contracts; size growth accepted |
| Docker-only dev toolchain | Host needs only Docker + make; dev/CI parity from Task 1 |
| 10x handoff without PR | `TEN_X_BRANCH_HANDOFF_READY` is success, not failure — org workflow stop boundary |
| Postgres SoT for operator-hot config (Tasks 156–161) | Centralizes policy/quotas/catalogs with version history and audit; file paths become seed inputs only, reducing drift between CLI, daemon, and API |

## Testing

Current validation (Tasks 1–22 and CFG/CAP Tasks 156–161, implemented):

- `make bootstrap test lint fitness` inside the `dev` Docker image
- `internal/operatorcfg/store_pg_test.go` — Postgres store seed, load, and version apply paths
- `make up` + `make doctor` — verifies Docker/Compose, PostgreSQL `SELECT 1`, Temporal `GetSystemInfo`
- `scripts/fitness.sh` (Task 18): `go vet`, `doc.go` presence, plus `cmd/fitlint` checks for
  enum lint (C1), superseded-term lint, SCM import boundaries, and doc-link resolution
- `make skp-e2e` (Task 19) — Shared Kernel Proof end-to-end: admit plan → worktree → verify →
  evidence bundle → **forced restart → resume from checkpoint**
- `cmd/foundry/status_test.go` — CLI status output with consistency levels
- GitHub Actions CI on push (`.github/workflows/ci.yaml`)

Planned validation (remaining milestones):

- PEC prohibition conformance tests (Task 56)
- Fault-injection and security evaluations per V12 specification
- Full OPA PDP integration and external-operation ledger (Tasks 23–26)

## Operations and Observability

- **CLI entry** — `foundry` subcommands: `doctor`, `status`, `plan submit|approve|verify`,
  `projection rebuild`, `principal create`, `keygen`, `policy`, `evidence`, `migrate`,
  `catalog list|validate|install|doctor` (optional `-pg-dsn` for DB-backed packaging config)
- **Daemon** — `foundryd` seeds `operatorcfg.Store` on startup, then loads all policy,
  quota, model, opportunity, and catalog config from Postgres before serving API/worker;
  polls Temporal queue `foundry-core` as the only process performing kernel side effects (C4)
- **Make targets** — `bootstrap`, `up`, `down`, `doctor`, `test`, `lint`, `fitness`, `skp-e2e`,
  `plan-run`, `evidence-verify`, `projection-rebuild` (all Docker-wrapped)
- **Bootstrap notifications** — Plan runner (Task 3) uses a disposable Telegram bot for AUTO-path
  digests and GATED-path `/approve` / `/reject` gates; production Telegram engine is Task 30
- **Cost accounting** — Reserve → incur → reconcile pattern documented; enforcement lands in Tasks 29/69
- **Observability** — SLOs, alerts, and payload limits defined in `docs/foundry/docs/operations/observability-and-alerts.md`

## Lessons Learned

1. **Separate "who decides" from "who executes"** — PEC is powerful at plan interpretation
   but must remain proposal-only; kernel retention of side effects is non-negotiable.
2. **Terminal semantics are product features** — `TEN_X_BRANCH_HANDOFF_READY` encodes an
   intentional stop boundary for organization workflows, not a failure to merge.
3. **Registries beat enums** — Phase, wait-reason, and result-code registries let the system
   evolve without breaking the six-status invariant.
4. **Evidence before completion** — Self-reported agent summaries are inputs to PEC, not
   completion proofs; verification bundles gate phase advancement.
5. **Architecture-first bootstrap** — Task 1 scaffolds authority boundaries in `doc.go`
   before implementation code, so CI can enforce package roles early.
6. **Provider-neutral agent harness** — Task 2 keeps `.ai/` as the single canonical source;
   `ars compose` projects skills and boundaries into Claude/Codex formats without duplicating policy.
7. **Fitness earns the constitution** — Task 18's `fitlint` turns C1 articles into CI failures,
   not documentation-only guidance.
8. **Operator-hot config belongs in the database** — Tasks 156–161 move policy layers, quotas,
   model tables, and packaging catalogs to Postgres with versioned apply metadata so CLI,
   daemon, and API share one auditable source — disk files seed once, then promotions are explicit.

## Related

- [Designing a Deterministic Agentic Coding Orchestrator](/docs/concepts/deterministic-agentic-orchestrator)
- [Canonical State in Multi-Agent Design Pipelines](/docs/concepts/ai-orchestration-patterns)
- [Delivery Foundry Project Overview](/docs/projects/delivery-foundry)

## Sources

- Repository: [okfriansyah-moh/the-foundry](https://github.com/okfriansyah-moh/the-foundry)
- Pull request: [#1 — Tasks 3–22](https://github.com/okfriansyah-moh/the-foundry/pull/1) (merge commit [`6efd492`](https://github.com/okfriansyah-moh/the-foundry/commit/6efd492d48d99672afea27da565699e8e8a3983d))
- Pull request: [#14 — Tasks 156–161 operator config Postgres SoT](https://github.com/okfriansyah-moh/the-foundry/pull/14) (merge commit [`5b01562`](https://github.com/okfriansyah-moh/the-foundry/commit/5b015620a5a676c47dfe806486e82137b7801834))
- Earlier commits: [`58632a0`](https://github.com/okfriansyah-moh/the-foundry/commit/58632a0) (first commit), [`9409080`](https://github.com/okfriansyah-moh/the-foundry/commit/9409080) (Task 1 scaffold)
- Architecture: `docs/foundry/delivery_foundry.md`, `docs/architecture.md`, `docs/foundry/docs/architecture/state-model.md`
- Agent harness: `.ai/manifest.yaml`, `.ai/instructions/authority-boundaries.md`
- Implementation plan: `docs/PLAN.md` (Tasks 1–22 ✅, Tasks 156–161 ✅, remaining tasks pending)
