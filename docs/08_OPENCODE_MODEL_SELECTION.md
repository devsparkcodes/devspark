# OpenCode Model Selection (research snapshot: 9 October 2026)

Model catalogues, names, availability and pricing change. Confirm exact model IDs in OpenCode using `/models` after connecting a provider. Do not hard-code an unverified model ID in the project.

## Task recommendations
| Task | Recommendation |
|---|---|
| Requirements/architecture | Strongest available reasoning + coding model; prioritize instruction following and long-context consistency. |
| UI/UX direction/homepage | High-capability coding model; iterate using actual screenshots rather than relying on one prompt. |
| Routine components | Reliable mid/high-tier coding model for focused changes. |
| Complex animation/responsive bugs | Strongest available coding/reasoning model. |
| Test/accessibility/code review | A separate review pass when possible; request findings first, not an automatic broad rewrite. |

## How to select
1. Run `/connect` to configure a provider you can access.
2. Run `/models` and inspect models available in this project.
3. Select a current coding model shown in the picker; do not guess IDs.
4. For a one-off CLI run, use documented `opencode run --model provider/model-id ...` syntax.
5. Record the exact provider/model ID, date and any usage/cost limits before a long session.

## Starting approach
If OpenCode Zen is available, inspect its current curated models and test a strong coding/reasoning option. Otherwise use a suitable current model from a provider already connected. Do not assume the user has a paid subscription or API credits. A model is not permanently assigned to each task; switch based on quality, availability and cost.

## Usage discipline
Give each model a small task, relevant docs and acceptance criteria. Ask it to inspect files before editing, run checks and report exact results. Use a separate review pass for important work.

## Official references
- Models: https://dev.opencode.ai/docs/models/
- Providers: https://dev.opencode.ai/docs/providers/
- OpenCode Zen: https://docs.opencode.ai/docs/zen/
