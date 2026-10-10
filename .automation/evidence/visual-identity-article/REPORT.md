# Visual identity article: acceptance evidence

Status: implementation and local verification complete; publication awaits normal PR review and merge.

## Authorization and baseline

The owner approved a bilingual Concepts article about establishing a game's visual identity before main development, using five existing Padu images, semantic color swatches, a workflow diagram, two clearly labelled teaching comparisons, new reusable prompts, contact links, and one PR on `codex/padu-visual-identity-article`.

This is a manually requested article using owner-approved material from private Padu, not a scheduled public-activity scan. The approved scope permits these selected images and explained excerpts. Original image-generation prompts, chronology, or transcripts are not invented. No full private implementation or catalog is published.

Target baseline: `okfriansyah-moh/okfriansyah-moh.github.io` at `24f757d503625b5abe11dbd442696f6220a17e6a`, clean `main`. Work uses an isolated clone; the existing local site checkout remains unchanged.

Source baseline: Padu at `6e1d0e836c2741f64bd47b35aef1d44d8919a1e0`, clean working tree. Preservation inventory covers 39 files: the complete `docs/brand/padu` tree plus the seven source references used for this article. All inventoried hashes and the source working tree remain unchanged, with no brand-tree additions or deletions. The full inventory remains local to avoid publishing unrelated private filenames.

## Acceptance matrix

| Criterion | Evidence | Result |
| --- | --- | --- |
| English and Indonesian articles in the shared Concepts layout | Both `visual-identity-before-development.mdx` files follow the article template and contain approximately 2,500 words including teaching prompts and references | PASS |
| Specific Padu identity and practical next-game method | Source review covers enamel/ceramic direction, 6-and-7 identity, asset roles, colors, typography, controls, responsive components, motion and concise copy | PASS |
| Distinguish wordmark, mark, mascot, app icon, and interface icons | Asset gallery, role table, small-size comparison, and historical Home caption in both languages | PASS |
| Five unchanged source images | `image-checks.json`: exact hashes, dimensions and file sizes; browser verifies served bytes against all five originals in both locales | PASS |
| Historical screenshot is dated accurately | Home caption specifies September 17, 2026, 390 × 844 logical viewport, Flutter visual-test origin, and limits; checked against accompanying source README | PASS |
| Production colors and explained implementation excerpt | Seven labelled name/hex/role swatches; Dart excerpt matches actual `AppTheme` constants; older written ivory mismatch is disclosed | PASS |
| Educational comparisons preserve identity authority | Static coherent/disconnected styling and full/compact artwork at 96/48/24 CSS pixels; explicitly teaching aids, not historical versions, redesign proposals, or certified launcher results | PASS |
| Accurate Codex capabilities and new prompts | Official Codex reference; raster-tool dependency explained; one master task and three shorter briefs explicitly labelled new teaching prompts | PASS |
| Workflow diagram, readable prompts and images | Mermaid accessible title/description and SVG text labels; wrapped code blocks; responsive figures inspected in screenshots | PASS |
| Phone, tablet and desktop layout with enlarged text | `browser-checks.json`: both locales at 320/390/900/1440px, 16px and 20px root text; no document overflow, all 11 figure images in bounds, wrapped prompts; additional 32px diagnostics recorded separately below | PASS at 100% and 125%; see 200% limit |
| Keyboard copying and links | Enter on the master prompt's localized copy button copies the full task; contact links match existing site data; related audio link stays in the correct locale; internal article links resolve | PASS |
| Bilingual sidebar, topic and feeds | Single shared sidebar registration; topic maps both files; both homepages and article listings expose the article; generator updates both locale feeds and legacy English mirror | PASS |
| Locked installation and compilation | `npm ci`, `npm run typecheck`, and `npm run build`; final English and Indonesian output in attached build log | PASS |
| Preserve unrelated behavior and source | `preservation.json`: original checkout and source unchanged; existing topic/feed entries identical; no dependency, global theme, homepage, navigation or workflow modifications | PASS |
| Final prose, source, diff and evidence review | Supported statements checked against source; all evidence inspected against real outputs; visual findings corrected and affected checks repeated | PASS |

## Verification commands and environment

- `npm ci --cache /private/tmp/padu-identity-npm-cache --no-audit --no-fund`: completed; 1,463 locked packages installed. Package and lockfile are unchanged.
- `npm run typecheck`: PASS, final output in `typecheck.log`.
- `npm run build`: PASS for English and Indonesian, final output in `build.log`. This command runs the existing feed generator.
- Browser checks against `npm run serve -- --host 127.0.0.1 --port 8792 --no-open`: 40 checks plus four shared-header baseline measurements in `browser-checks.json`; zero page errors. Used bundled Playwright and isolated headless Chrome, without adding a repository dependency.
- SHA-256 preservation, PNG-header inspection, served-image hashing, source-excerpt comparison, topic/feed comparison, and `git diff --check`: PASS.

Local shell: Node v24.7.0 and npm 11.5.1. Browser: Chrome 154.0.8037.98. The repository's CI uses Node 20; a separate Node 20 run was not performed. The local runtime satisfies the existing `>=20` engine requirement.

## Visual review and corrections

Review found missing TypeScript declarations for PNG imports. An article-local declaration file now types the existing media-loader imports; no build configuration changed.

Phone screenshots exposed long prompts requiring horizontal scrolling and clipped Mermaid HTML labels. Article-scoped CSS now wraps code, and the diagram uses a single-column flow with SVG text labels and accessible title/description. The installed Mermaid configuration specifies root-level `htmlLabels`; the deprecated flowchart-specific setting was corrected during the same refinement. Both locales were rebuilt, and browser checks and screenshots were repeated on the final output.

The initial keyboard check used an English accessible label in Indonesian. Inspection confirmed the existing localized control is `Salin kode ke papan klip`; the test now recognizes both languages and exercises the control through keyboard focus and Enter. This changed the temporary verification script, not site controls.

Screenshots include normal viewport captures and isolated figure/diagram/prompt captures. In isolated captures, the fixed navbar and back-to-top overlay are temporarily hidden only by the screenshot API to avoid obscuring tall content. No application CSS or verification layout measurements are altered by that capture styling.

## Known limits

Additional 200% root-text diagnostics (32px) expose the shared article header's intrinsic-width overflow on narrow screens. New article scroll widths are 443/445px (English at 320/390px) and 506/508px (Indonesian). The existing audio article also overflows at 320px in both locales and at 390px in Indonesian; the exact width varies with title and tags. New article figures and wrapped code still remain in bounds. This shared-header limitation is recorded, not presented as a passing 200% reflow check. The approved work preserves the shared shell; no global header or style changes were made.

The existing article header displays a fallback five-minute reading estimate, while generated feeds calculate ten minutes. That pre-existing shell behavior is preserved.

Build output contains existing Browserslist age and update-config-store advisory messages; compilation succeeds. No dependency upgrade, configuration ownership change, or warning suppression is performed.

These checks verify the article, its media and browser behavior. They do not certify physical-device launcher masks, Padu gameplay, typography at every native size, a full accessibility audit, or the historical screenshot as current production UI. The article labels those boundaries.

## Skill and gate coverage

Read target `AGENTS.md`, automation instructions, content policy, article template, topic index, feed generator, shared article shell, package scripts and deployment workflow. No target skill index, task routing or gate registry exists. Its bilingual content, feed generation, locked installation, typecheck, full build and PR-only delivery rules apply.

Used Task Observer's lightweight discovery without staging an unrelated observation; Brand for asset-role and identity consistency; Humanizer for the author's voice; OpenAI Docs for the cited Codex capability boundary; Running Prompt and Code Quality/Coding Standards for execution and review; PR for the final pull-request structure. No subagents were used.

Inspected Padu's `.ai/skill-index.yaml`, task routing and gate registry, plus relevant game-design and repository-context source instructions. Padu is strictly a read-only reference. No game feature, product amendment, harness, Spec Kit task or asset regeneration is implemented, so Padu fast-path, complete-task and changed-path gates are not invoked or claimed. This article does not close a Padu implementation task.

Uniqueness decision: CREATE. The previous Padu concept covers procedural audio generation, auditioning and provenance. This article covers early visual identity, artwork-role separation and translating approved visual rules into reusable implementation. It links the audio article without retelling its technical workflow. No public-activity discovery or ignored activity batch was part of this manual request.

## Final review and delivery

Source claims, translations, selected images, new teaching prompts, captions, diagram and contacts were reviewed against their authorities. The final diff preserves existing topic/feed entries and limits changes to the two articles, article-local assets/styles/component/types, registration, generated feed mirrors and this acceptance evidence.

Evidence was compared with command logs, browser state, hashes and inspected screenshots. This is self-review, not an independent reviewer or full native-device audit.

Delivery is one PR from `codex/padu-visual-identity-article`. No direct push to `main`, merge or deployment is performed. The existing main-branch GitHub Pages workflow publishes after normal review and merge.
