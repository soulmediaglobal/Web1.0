# AI Development Metrics

## Purpose

This directory provides lightweight, prospective telemetry for meaningful completed GitHub Issues. Metrics support aggregate workflow audits without requiring access to full Development AI conversation history. They are observations, not audit conclusions or performance targets.

## Canonical Storage

Each completed meaningful Issue appends exactly one JSON object as one line to `task-metrics.jsonl`.

The file is append-only. Do not backfill historical Issues, rewrite existing records, or emit records for fake telemetry-only features.

## Schema Version 1

| Field | Type | Definition |
| --- | --- | --- |
| `schema_version` | integer | Schema version. Must be `1`. |
| `issue` | integer | GitHub Issue number for the completed task. |
| `pr` | integer | Pull Request number for the completed task. |
| `governance_version` | string | Canonical Development-Rules version used for execution. |
| `task_type` | enum | Task classification from the fixed `task_type` enum. |
| `risk` | enum | Technical-impact risk classification from the fixed `risk` enum. |
| `turns` | integer | Count of qualifying Ray messages during the execution window. |
| `rework_events` | integer | Count of material implementation rework events. |
| `ci_first_pass` | boolean | Whether the first implementation-related quality-gate CI run passed. |
| `pushes_until_ci_pass` | integer | Implementation-related pushes required through the first successful quality-gate CI run. |
| `post_merge_defect` | boolean or null | Related post-merge defect status; use `null` at task closure because it is not yet determined. |
| `previous_chat_needed` | boolean or null | Previous-chat dependency; use `null` at task closure for later Argus assessment. |
| `checkpoint_lines` | integer | Physical line count of the compact task checkpoint. |
| `external_blocker` | boolean | Whether an external access, ownership, approval, credential, session, or infrastructure blocker materially blocked execution. |

All fields are required. Do not add fields without evidence from multiple completed-task audits.

## Fixed Enums

`task_type`:

- `feature`
- `bugfix`
- `security`
- `infrastructure`
- `refactor`
- `documentation`

`risk`:

- `low`
- `medium`
- `high`

Risk represents technical impact and affected surface area, not perceived difficulty.

## Metric Definitions

### Execution window and turns

The execution window starts after scope or PRD approval when implementation execution begins. It ends when Development AI declares the task Merge Ready.

`turns` counts Ray user messages within that window that require a Development AI response, decision, command, verification, or action.

Do not count AI messages, progress updates, internal reasoning, tool calls, unrelated discussion, pre-scope exploration, or PRD drafting before execution approval.

### Rework events

Count one `rework_events` event when already-implemented behavior must be materially changed because of misunderstanding, incorrect implementation, failed acceptance, regression, or implementation defect.

Do not count changed requirements, intentional scope revisions, new requirements, later aesthetic preferences, or unrelated production/configuration issues.

### CI metrics

`ci_first_pass` covers the first implementation-related quality-gate CI run.

`pushes_until_ci_pass` counts implementation-related pushes required through the first successful quality-gate CI run. Exclude telemetry-only or documentation-only final synchronization.

### Deferred observations

At task closure:

- `post_merge_defect` must be `null`.
- `previous_chat_needed` must be `null`.

Argus may establish these outcomes later from sufficient evidence. Phase 1 does not introduce a correction or event-sourcing system, and previously emitted JSONL records remain unchanged.

## Valid JSONL Example

```json
{"schema_version":1,"issue":16,"pr":21,"governance_version":"v1.1.10","task_type":"feature","risk":"medium","turns":18,"rework_events":1,"ci_first_pass":true,"pushes_until_ci_pass":1,"post_merge_defect":null,"previous_chat_needed":null,"checkpoint_lines":16,"external_blocker":false}
```

The example documents the format only. It is not an initial telemetry record and must not be copied into `task-metrics.jsonl`.

## Audit Cadence and Guardrails

Argus reviews aggregate metrics after every 5 completed meaningful Issues, validates 1–2 source samples, investigates anomalies and high-risk failures, and compares trends by risk level.

Metrics must not create per-task Argus approval or separate metrics approval, commit, Pull Request, or verification ceremonies. Quality and security always outrank metric optimization. Lower turn, rework, or push counts are not successes when achieved by skipping necessary scope, testing, review, or security work.
