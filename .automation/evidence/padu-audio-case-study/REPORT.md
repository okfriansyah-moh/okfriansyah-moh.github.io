# Padu audio case study — acceptance evidence

Status: implementation and local verification complete; publication awaits PR review and merge.

## Authorization and baseline

The author explicitly requested and approved this bilingual article, five original WAV examples, explained source excerpts, real production briefs, contact links, verification, and one PR on `codex/padu-audio-case-study`. The full source package and listening catalog remain private. This is a manually requested case study, not a scheduled public-activity automation run; the author's approved source is the private Padu audio bundle.

Target baseline: `okfriansyah-moh/okfriansyah-moh.github.io` at `33cf6778673b5738d30deb855f3f07044ee1a29e`, clean `main`. Implementation uses an isolated clone. The existing local site checkout remains unchanged.

Source baseline: Padu at `5746ab7c04828d6b382de8a132a2332a18480ee9`, clean working tree. SHA-256 baselines cover all 469 files under the candidate bundle. Final comparison found no modifications, missing files, or additions. The private baseline inventory is retained locally rather than publishing unrelated filenames or source material.

## Acceptance matrix

| Criterion | Evidence | Result |
| --- | --- | --- |
| Practical case study in English and Indonesian | Both `codex-game-audio-synthesis.mdx` articles follow the repository's article template, use the shared article layout, explain Codex/local DSP roles, and include a rendered Mermaid pipeline | PASS |
| Actual Padu workflow and historical results | Claims inspected against renderer, specification, production notes, provenance, September 28 verification JSON, reproducibility record, final report, and saved choices | PASS |
| Five exact masters | `media-checks.json`: original hashes, WAV headers, durations, sample rate, depth, channels, and selection status; browser also hashes served bytes for every sound in both languages | PASS |
| Complete authentic production briefs | Each of the five prompt strings was compared verbatim against source metadata in both article files; Indonesian prose identifies the retained English originals | PASS |
| Clear accessible audio controls | `browser-checks.json`: five distinct descriptive accessible names per locale, native controls, `preload=none`, no autoplay, and zero WAV requests before playback | PASS |
| Working audio and keyboard control | Space started all five sounds in each locale; effects completed, music advanced and paused; decoded durations match; no media errors | PASS |
| Responsive article and readable prompts | 320/390/900px checks with root text enlarged from 16px to 20px; no document overflow, all audio controls inside viewport; title/audio screenshots reviewed | PASS |
| Reusable next-game prompt and lessons | New task prompt is explicitly distinguished from original production briefs/transcripts; covers event inventory, alternatives, editable sources, auditioning, checks, and delivery | PASS |
| Public excerpt boundary and contact invitation | Only five sound files, brief excerpts, and explanatory code are published; no renderer/specification/score package or full catalog; verified existing email and LinkedIn links | PASS |
| Bilingual feed and sidebar integration | Browser found article entries on both locale homepages and article listings; sidebar registered; generated locale feeds and legacy English mirror retained existing entries unchanged | PASS |
| Dependency and compilation checks | Locked `npm ci` completed (1463 packages); `npm run typecheck` passed; final `npm run build` generated English and Indonesian output; attached logs | PASS |
| Preserve source and unrelated site behavior | `preservation.json`; original source hashes and original site checkout unchanged; existing feed entries identical; final diff limited to content, media, indexing, generated feed mirrors, and this evidence | PASS |

## Verification commands and environment

- `npm ci --cache /private/tmp/padu-article-npm-cache --no-audit --no-fund` — PASS, locked dependencies only; no package/lockfile changes.
- `npm run typecheck` — PASS; output in `typecheck.log`.
- `npm run build` — PASS for en and id after prompt readability refinement; output in `build.log`.
- Temporary browser QA script against `npm run serve -- --host 127.0.0.1 --port 8791 --no-open` — PASS, 26 checks in `browser-checks.json`. Used bundled Playwright with an isolated headless Chrome session; no new repository dependency.
- SHA-256, Python `wave` header inspection, saved-prompt comparison, full source preservation audit, existing-feed baseline comparison, and `git diff --check` — PASS.

Build/typecheck shell: Node v20.19.6, npm 10.8.2. Browser checks establish decoder and playback state, not a human listening judgment. No physical-device or production gameplay verification is claimed.

## Instruction, skill, and gate coverage

Read the target repository's `AGENTS.md`, content policy, article template, topic index, feed generator, sidebar and deployment workflow. No target `SKILL.md` or task/gate registry exists. The existing article template, bilingual content workflow, locked installation, typecheck, full build, and PR-only delivery rules apply.

Used the OpenAI Docs skill and fetched official Codex documentation to support the description of code inspection, editing, and local tool execution. Reviewed Padu's skill index, routing and gate registry during source discovery. Padu is a read-only knowledge source here; no Spec Kit slice, Padu implementation, harness edits, or source regeneration is performed, so its fast-path, complete-task, and changed-path implementation gates are not invoked or claimed. This article does not close a Padu game task.

Uniqueness decision: CREATE. Existing articles discuss broader deterministic AI pipelines and media systems, but do not cover procedural game-audio composition, sound-event production briefs, A/B/C auditioning, or audio-master provenance. No unrelated article was rewritten.

## Review and corrections

Self-review compared technical claims with actual source records and all five published assets. Historical measurements are labelled September 28 evidence; two-sample byte-identical regeneration is described only for those two historical cases. Original prompts are briefs interpreted into structured code, not an invented text-to-audio endpoint or fabricated session transcript.

Visual review found long one-line saved prompts difficult to read on phones. They were changed to wrapped quotations without changing their text; both locales were rebuilt and all browser checks repeated. Screenshots here show the final result.

The initial preservation assertion allowed only locale feeds. Inspection showed the existing feed script also writes its legacy English mirror; the assertion was corrected to include that generated mirror and verify that it exactly equals the English feed. No unrelated file was restored or changed to conceal the generator's behavior.

Final diff review found no changes to homepage components, theme, CSS, navigation chrome, workflows, dependencies, or Padu assets. Evidence was reviewed against real command output and browser state. This is self-review, not independent review.

## Limits and publication

The historical bundle's technical checks do not certify acoustic realism, listener preference, copyright exclusivity, or device/gameplay behavior. No new full 126-asset render or historical gate run was performed for this article.

The full gameplay WAV is about 29.5 MB and intentionally remains lossless; it loads only on user request. Each browser serves its own native controls, so details such as subsecond time display can differ.

The existing article shell defaults its header to a five-minute reading estimate when Docusaurus docs metadata lacks reading time; the feed generator computes its own estimate. That existing behavior was preserved, and no theme change was introduced.

The build emits existing Browserslist age and Docusaurus update-store warnings; compilation succeeds in both locales. No dependency update or permission change was made for these advisory messages.

No direct push to main, merge, or live deployment is performed. The existing main-branch GitHub Pages workflow publishes after normal PR review and merge.
