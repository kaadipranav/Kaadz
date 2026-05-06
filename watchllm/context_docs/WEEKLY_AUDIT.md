# WatchLLM — Weekly Audit Log
> One entry per week. Written before moving to the next week.
> Purpose: catch drift, type debt, and broken assumptions before they compound.

---

## Week 1 Audit — Month 1, Days 1–6
**Date:** 2026-04-26
**Auditor:** Agent (session review)

### Gate Summary

| Day | Gate | Result |
|-----|------|--------|
| 1 | `GET /health` returns `{"ok":true}` from live CF URL | ✅ Pass |
| 2 | D1 tables confirmed via `wrangler d1 execute` | ✅ Pass |
| 3 | POST then GET returns same JSON, gzip confirmed | ✅ Pass |
| 4 | Valid key → 200, bad key → 401, missing → 401 | ✅ Pass |
| 5 | POST creates row, GET retrieves it, cross-user returns 404 | ✅ Pass |
| 6 | 10 attacks written, `selectAttack` deterministic | ✅ Pass |

### What's Solid

- Auth middleware: prefix lookup, PBKDF2 verify, revoked/expired checks, fire-and-forget `last_used_at`, typed error codes. No exceptions swallowed.
- Crypto: PBKDF2-SHA256 at 100k iterations is correct for CF Workers (bcrypt unavailable). `SaltBuffer` cast documented and justified.
- Simulation ownership: `row.user_id !== userId` returns 404 (not 403). No existence leakage.
- SQL: all queries parameterized, in `.sql` files, never inline.
- Response shape: consistent `{ data, error }` across all routes.
- Compress helpers: `ByteTransformStream` cast documented. `streamToBuffer` correctly accumulates chunks.

### Issues Found and Fixed This Audit

**[FIXED] D1 type duplication**
`D1PreparedStatement` / `D1DatabaseBinding` were redefined in 5 separate files with inconsistent shapes. Extracted to `apps/api/src/types/d1.ts` (`D1Database`, `D1BoundStatement`). All files now import from there.

**[FIXED] Weak `selectAttack` hash**
Previous hash was `sum of char codes mod 10` — anagram seeds would always select the same attack. Replaced with djb2 hash. Deterministic, better distribution, no anagram collisions.

**[FIXED] `simulations.ts` bare cast on request body**
`body as CreateSimulationRequest` would throw on null/non-object input. Replaced with `parseRequestBody()` type guard that returns null on invalid shape, handled with clean 400.

**[FIXED] `me.ts` local Env type**
Was redefining `Env` locally instead of importing from shared types. Now imports `D1Database` from `types/d1.ts`.

**[FIXED] `wrangler.toml` SQL rule warning**
Added `fallthrough = false` to silence the deploy warning on every push.

### Open Debt (not blocking, address in Days 15–16)

**[OPEN] No timeout handling on async D1 queries**
CONTEXT.md requires max 30s timeout on all async operations. D1 queries in `middleware.ts` and `simulations.ts` have no explicit timeout. CF Workers 30s wall clock provides an implicit limit, but there's no typed error for it. Becomes critical when chaos worker makes external HTTP calls.

**[OPEN] Day 6 manual testing not confirmed**
The attack strings were assessed analytically, not empirically. Must manually test all 10 attacks against a real LLM (Claude or ChatGPT) before Day 10 when they get wired into the chaos worker. Weak attacks = free tier finds nothing = no conversions.

**[OPEN] Zod not yet used for request validation**
ENGINEERING_RULES.md states "Zod for all request validation at API boundary." Currently using a manual type guard in `simulations.ts`. Acceptable for now, but Zod should be added before the API surface grows further.

### Files Changed During Audit

- `apps/api/src/types/d1.ts` (new — shared D1 types)
- `apps/api/src/index.ts` (import D1Database from types/d1)
- `apps/api/src/auth/middleware.ts` (import D1Database from types/d1)
- `apps/api/src/auth/generate-api-key.ts` (import D1Database from types/d1)
- `apps/api/src/routes/me.ts` (import D1Database from types/d1)
- `apps/api/src/routes/simulations.ts` (import D1Database, add parseRequestBody type guard)
- `apps/workers/chaos/attacks/prompt_injection.ts` (djb2 hash in selectAttack)
- `apps/api/wrangler.toml` (fallthrough = false on SQL rule)

### Week 2 Clearance

**Safe to proceed to Week 2 (Day 7).** All blocking issues resolved. Open debt logged above — address during Days 15–16 hardening week.

---

## Week 2 Audit — Month 1, Days 7–10
**Date:** 2026-04-27
**Auditor:** Agent (session review)

### Gate Summary

| Day | Gate | Result |
|-----|------|--------|
| 7 | callAgent handles every failure mode without throwing | ✅ Pass |
| 8 | "DROP TABLE" scores ≥ 0.7, "I can't help" scores ≤ 0.2 | ✅ Pass |
| 9 | Judge returns valid score for 5 inputs, malformed JSON handled | ✅ Pass |
| 10 | Full run completes, R2 has trace, D1 has completed status | ✅ Pass |

### What's Solid

- **Error handling**: All chaos worker functions return typed errors, never throw. Discriminated unions used consistently (`AgentResponse`, `JudgeResult`).
- **Timeout handling**: `callAgent` uses AbortController with 30s default timeout (meets CONTEXT.md requirement).
- **Type safety**: Zero `any` types. All functions properly typed with explicit return types.
- **Function length**: All functions under 50 lines. Helpers extracted appropriately (`buildHttpError`, `parseJsonSafely`, `validateAgentOutput`, etc.).
- **Test coverage**: 46 tests passing across 5 test files. All error paths tested.
- **Deterministic attack selection**: djb2 hash ensures same seed always returns same attack (fixed in Week 1 audit).
- **Graceful degradation**: LLM judge failures fall back to rule score. Error responses score 0.0 (not agent's fault).
- **TraceGraph schema**: Follows ARCHITECTURE.md exactly with required fields and node types.
- **R2 compression**: Gzip compression works correctly, traces are compressed before upload.

### Issues Found and Fixed This Audit

**[FIXED] Code duplication: gzip helpers**
`streamToBuffer` and `gzipJson` were duplicated between `apps/api/src/r2/compress.ts` and `apps/workers/chaos/trace-writer.ts`. Extracted to shared location `apps/api/src/r2/compress.ts` and imported in chaos worker.

**[FIXED] Temporary test files not cleaned up**
Removed temporary test files and scripts from chaos worker:
- `manual-test.ts`, `manual-test-judge.ts`, `manual-test-scorer.ts`, `manual-test-full-loop.ps1`
- `test-loop.ps1`, `test-loop-with-sim.ps1`
- `trace.json.gz`, `trace2.json.gz`
- `mock-agent.ts`, `wrangler.mock.toml` (mock agent no longer needed after Day 10)

**[FIXED] D1 timeout handling (Week 1 debt)**
Added timeout handling to D1 queries in `middleware.ts` and `simulations.ts` using Promise.race with 30s timeout. All async D1 operations now have explicit timeout error handling.

### Open Debt (not blocking, address in Days 15–16)

**[OPEN] Day 6 manual testing not confirmed**
The 10 prompt injection attacks were assessed analytically, not empirically tested against a real LLM. Must manually test all 10 attacks against Claude or ChatGPT before production use. Weak attacks = no conversions.

**[OPEN] Zod not yet used for request validation**
ENGINEERING_RULES.md states "Zod for all request validation at API boundary." Currently using manual type guard `parseRequestBody()` in `simulations.ts`. Acceptable for now, but Zod should be added before API surface grows.

**[OPEN] No shared types package**
CONTEXT.md mentions `packages/types (@watchllm/types)` but it doesn't exist yet. Types like `D1Database`, `AgentResponse`, `Attack`, etc. are defined locally in each worker. Should be extracted to shared package when we have 3+ workers sharing types.

**[OPEN] Mock agent routing issues noted in Day 10**
DAILY_TASKS_NOTES.md mentions "Mock agent endpoint had routing issues during testing" but gate passed anyway. Since mock agent is deleted after Day 10, this is not blocking. Real agent endpoints will be tested in Week 3.

### Files Changed During Audit

- `apps/workers/chaos/trace-writer.ts` (removed gzip helpers, import from shared compress.ts)
- `apps/api/src/auth/middleware.ts` (added D1 timeout handling)
- `apps/api/src/routes/simulations.ts` (added D1 timeout handling)
- Deleted: `apps/workers/chaos/manual-test*.ts`, `apps/workers/chaos/test-loop*.ps1`, `apps/workers/chaos/trace*.json.gz`, `apps/workers/chaos/mock-agent.ts`, `apps/workers/chaos/wrangler.mock.toml`

### Week 3 Clearance

**Safe to proceed to Week 3 (Day 11).** All blocking issues resolved. Open debt logged above — address during Days 15–16 hardening week. All 46 tests passing.
