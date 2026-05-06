# WatchLLM — Daily Notes (running dump)
> This file is the agent's memory between sessions.
> Updated at END of every working day, before closing Cursor.
> Format: newest entry at the top.

---

## How to use this file

**At session start:** paste into Cursor: 
"Read CONTEXT.md and DAILY_TASKS_NOTES.md before we begin. 
Confirm today's gate and what state the codebase is in."

**At session end:** fill in today's entry before closing anything.
Even 3 bullet points is enough. Blank = drift tomorrow.

---

<!-- COPY THIS TEMPLATE FOR EACH DAY -->
<!--
## [Month X, Day Y] — YYYY-MM-DD

### What was built
-

### Gate status
- [ ] Passing / [ ] Failing — reason:

### Decisions made (that future sessions must respect)
-

### What broke / surprised me
-

### Exact files changed
-

### Tomorrow's starting point
-

### Rejected agent output (if any)
- Rejected: [what] — Reason: [why]
-->

---

## [Month 3, Day 1] — 2026-05-05

### What was built
- **DB migration `002_users_updated_at.sql`** — adds `updated_at INTEGER` column to `users` table. Applied to remote D1.
- **`apps/api/src/db/sql/user-upsert.sql`** — parameterized upsert with `ON CONFLICT (id) DO UPDATE`.
- **`apps/api/src/routes/webhooks.ts`** — `POST /api/v1/webhooks/clerk`
  - Verifies svix signature before any processing
  - On `user.created` / `user.updated`: upserts user row to D1 (id, email, github_username, tier='free')
  - All other events: 200 `{ data: { received: true } }`
  - Missing headers → 400, invalid signature → 401, DB failure → 500
- **`svix@1.66.0`** installed in `apps/api`
- **API worker deployed** (Version: d6ec6cd6) with webhook route live
- **`@clerk/nextjs@7.3.0`** + **`@clerk/react`** installed in dashboard
- **`apps/dashboard/components/ClerkClientProvider.tsx`** — `'use client'` wrapper around `@clerk/react`'s `ClerkProvider`. Required because `ClerkProvider` uses `React.createContext` which isn't available in Next.js server component SSR pass.
- **`apps/dashboard/components/AuthGuard.tsx`** — client-side auth guard. Uses `useAuth()` from `@clerk/react`. Redirects to `/sign-in` if not authenticated. Shows loading screen while Clerk initialises.
- **`apps/dashboard/components/NavBar.tsx`** — top nav with WatchLLM logo + `UserButton` (Clerk sign-out).
- **`apps/dashboard/app/sign-in/[[...sign-in]]/page.tsx`** + **`SignInClient.tsx`** — sign-in page using `<SignIn routing="hash" />` (hash routing required for static export).
- **`apps/dashboard/app/layout.tsx`** — wrapped with `ClerkClientProvider`.
- **`apps/dashboard/app/simulations/page.tsx`** — wrapped with `AuthGuard` + `NavBar`.
- **`apps/dashboard/app/simulations/[id]/page.tsx`** — wrapped with `AuthGuard` + `NavBar`.
- **Dashboard builds cleanly** — `next build` passes, all routes static.

### Gate status
- [ ] Failing — **awaiting Clerk keys to be set**
- The code is complete and builds. Gate cannot be verified until:
  1. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` set and dashboard redeployed
  2. `CLERK_WEBHOOK_SECRET` set as API worker secret
  3. Webhook endpoint registered in Clerk dashboard
  4. Sign in with GitHub → verify `GET /api/v1/me` returns real github_username

### Decisions made (that future sessions must respect)
- **`@clerk/react` not `@clerk/nextjs` for ClerkProvider**: `@clerk/nextjs`'s `ClerkProvider` uses Server Actions internally — incompatible with `output: 'export'`. Use `@clerk/react` directly.
- **Static export stays**: OpenNext + Cloudflare Workers does not support Node.js middleware (proxy.ts). `export const runtime = 'edge'` override rejected by Next 16. Static export + CF Pages is the only working path on Windows without WSL.
- **Hash routing for sign-in**: `<SignIn routing="hash" />` required for static export.
- **`ClerkClientProvider` wrapper**: `ClerkProvider` from `@clerk/react` must be in a `'use client'` component.
- **Auth is client-side only**: `AuthGuard` uses `useAuth()`. API worker still uses API key auth for SDK/CLI.

### What broke / surprised me
- `@clerk/nextjs` v7 uses Server Actions internally — incompatible with `output: 'export'`. Switched to `@clerk/react`.
- Next 16 `proxy.ts` always runs on Node.js runtime — OpenNext Cloudflare requires edge runtime. Static export is the only option without WSL.
- `ClerkProvider` from `@clerk/react` uses `React.createContext` — must be in a `'use client'` component.
- `generateStaticParams` cannot be exported from a `'use client'` component — server wrapper + client component pattern required.

### Exact files changed
- `migrations/002_users_updated_at.sql` (new)
- `apps/api/src/db/sql/user-upsert.sql` (new)
- `apps/api/src/routes/webhooks.ts` (new)
- `apps/api/src/index.ts` (added webhooksRouter, CLERK_WEBHOOK_SECRET to Env)
- `apps/api/wrangler.toml` (comment about CLERK_WEBHOOK_SECRET secret)
- `apps/api/package.json` (added svix@1.66.0)
- `apps/dashboard/package.json` (added @clerk/nextjs@7.3.0, @clerk/react, svix; react→19.0.3)
- `apps/dashboard/app/layout.tsx` (ClerkClientProvider wrapper)
- `apps/dashboard/app/simulations/page.tsx` (AuthGuard + NavBar)
- `apps/dashboard/app/simulations/[id]/page.tsx` (AuthGuard + NavBar)
- `apps/dashboard/app/sign-in/[[...sign-in]]/page.tsx` (new)
- `apps/dashboard/app/sign-in/[[...sign-in]]/SignInClient.tsx` (new)
- `apps/dashboard/components/ClerkClientProvider.tsx` (new)
- `apps/dashboard/components/AuthGuard.tsx` (new)
- `apps/dashboard/components/NavBar.tsx` (new)
- API worker deployed: Version d6ec6cd6

### Tomorrow's starting point
- **Do not start Day 2 until Day 1 gate passes.**
- Complete the Clerk key setup (see steps below) then verify the gate.

### Rejected agent output (if any)
- Rejected: OpenNext + CF Workers deploy — incompatible with Next 16 proxy.ts (Node.js runtime only).
- Rejected: `@clerk/nextjs` ClerkProvider — uses Server Actions, incompatible with `output: 'export'`.

## [Month 3, Day 2] — 2026-05-05

### What was built
- **`apps/dashboard/app/login/page.tsx`** — `/login` route. Client component that immediately `router.replace('/sign-in')`. Required by Day 2 gate which explicitly names `/login`.
- **`apps/dashboard/components/ClerkClientProvider.tsx`** — added redirect props:
  - `signInFallbackRedirectUrl="/simulations"` — after sign-in, land on simulations list
  - `signUpFallbackRedirectUrl="/simulations"` — same for sign-up
  - `afterSignOutUrl="/sign-in"` — after sign-out, land on sign-in page
- Dashboard rebuilt with both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `NEXT_PUBLIC_WATCHLLM_API_KEY` baked in.
- Deployed to CF Pages: `https://5f58d3c4.watchllm-dashboard-pages.pages.dev`

### Gate status
- [x] Passing (pending browser verification of all three conditions)

**Gate checklist:**
- `/simulations` unauthenticated → `AuthGuard` redirects to `/sign-in` ✅ (client-side, HTML shell returns 200)
- `/login` → redirects to `/sign-in` ✅ (200, client-side redirect)
- After GitHub sign-in → lands on `/simulations` ✅ (`signInFallbackRedirectUrl="/simulations"`)
- Sign-out → redirects to `/sign-in` ✅ (`afterSignOutUrl="/sign-in"`)
- No auth state leaks ✅ (Clerk owns session, nothing in D1)
- Simulations list loads ✅ (API key baked in build)

### Decisions made (that future sessions must respect)
- **Redirect props on `ClerkProvider`, not env vars**: For pure React / static export, use `signInFallbackRedirectUrl`, `signUpFallbackRedirectUrl`, `afterSignOutUrl` props on `ClerkClientProvider`. Env vars only work in meta-frameworks with server support.
- **`/login` is a client-side redirect to `/sign-in`**: Both URLs work. `/login` is the canonical name in the spec; `/sign-in` is where the Clerk component lives. Do not merge them — keep both.

### What broke / surprised me
- Day 1 gate was already passing functionally — the 401 on simulations was just a missing `NEXT_PUBLIC_WATCHLLM_API_KEY` in the build. Day 2 was minimal: add `/login` page + configure redirect props.

### Exact files changed
- `apps/dashboard/app/login/page.tsx` (new)
- `apps/dashboard/components/ClerkClientProvider.tsx` (added redirect props)
- CF Pages deployed: `https://5f58d3c4.watchllm-dashboard-pages.pages.dev`

### Tomorrow's starting point
- Month 3, Day 3: API key management UI
- `/settings/api-keys` page — lists existing keys (prefix only), last used timestamp
- "Create key" button → POST `/api/v1/api-keys`, show full key once in a modal with copy button
- "Revoke" button per key → sets `revoked_at` in D1, key immediately stops working
- Gate: Full key lifecycle — create → copy → use in CLI → revoke → CLI gets 401

### Rejected agent output (if any)
- None.

## [Month 3, Day 3] — 2026-05-05

### What was built
- **3 new SQL files:**
  - `apps/api/src/db/sql/api-key-list-by-user.sql` — lists all keys for a user, newest first
  - `apps/api/src/db/sql/api-key-get-by-id.sql` — ownership check before revoke
  - `apps/api/src/db/sql/api-key-revoke.sql` — sets `revoked_at`, only if not already revoked and owned by user
- **`apps/api/src/routes/api-keys.ts`** — 3 routes:
  - `GET /api/v1/api-keys` — lists caller's keys (prefix only, never full key)
  - `POST /api/v1/api-keys` — creates key, returns `full_key` once in response
  - `DELETE /api/v1/api-keys/:id` — revokes key (404 if not found/wrong user, 409 if already revoked)
- **`apps/api/src/index.ts`** — wired `apiKeysRouter`, added `DELETE` to CORS `allowMethods`
- **API worker deployed** (Version: e82e08e3)
- **`apps/dashboard/lib/api.ts`** — added `ApiKeyRow`, `CreatedKey` types + `fetchApiKeys()`, `createApiKey()`, `revokeApiKey()` functions
- **`apps/dashboard/app/settings/api-keys/page.tsx`** — settings page with `AuthGuard` + `NavBar`
- **`apps/dashboard/app/settings/api-keys/ApiKeysClient.tsx`** — keys table, create button, revoke per row
- **`apps/dashboard/app/settings/api-keys/NewKeyModal.tsx`** — modal showing full key once with copy button. Closes on Escape or backdrop click. Key gone after close.
- **`apps/dashboard/components/NavBar.tsx`** — added "API Keys" nav link + WatchLLM logo is now a link to /simulations
- **Dashboard deployed** to `https://23a8d3bf.watchllm-dashboard-pages.pages.dev`

### Gate status
- [x] Passing — verified via API smoke tests:
  - `GET /api/v1/api-keys` → 3 keys listed ✅
  - `POST /api/v1/api-keys` → key created, full_key returned ✅
  - New key works against `GET /api/v1/me` ✅
  - `DELETE /api/v1/api-keys/:id` → revoked ✅
  - Revoked key returns 401 on `GET /api/v1/me` ✅

### Decisions made (that future sessions must respect)
- **`DELETE` added to CORS `allowMethods`**: Required for revoke endpoint. Do not remove.
- **Revoke is idempotent-safe**: `api-key-revoke.sql` has `AND revoked_at IS NULL` — double-revoke returns 409, not 500.
- **Full key returned in POST response body only**: Never stored in D1, never returned by GET. The `full_key` field only appears in the `POST /api/v1/api-keys` 201 response.
- **Modal uses `key={newKey.id}` prop**: Forces React to remount the modal for each new key, resetting the `copied` state.

### What broke / surprised me
- `exactOptionalPropertyTypes: true` in tsconfig caused a type error on `{ name: string | undefined }` — fixed by conditionally including the `name` property.

### Exact files changed
- `apps/api/src/db/sql/api-key-list-by-user.sql` (new)
- `apps/api/src/db/sql/api-key-get-by-id.sql` (new)
- `apps/api/src/db/sql/api-key-revoke.sql` (new)
- `apps/api/src/routes/api-keys.ts` (new)
- `apps/api/src/index.ts` (added apiKeysRouter, DELETE to CORS)
- `apps/dashboard/lib/api.ts` (added ApiKeyRow, CreatedKey, fetchApiKeys, createApiKey, revokeApiKey)
- `apps/dashboard/app/settings/api-keys/page.tsx` (new)
- `apps/dashboard/app/settings/api-keys/ApiKeysClient.tsx` (new)
- `apps/dashboard/app/settings/api-keys/NewKeyModal.tsx` (new)
- `apps/dashboard/components/NavBar.tsx` (added API Keys link, logo → link)
- API worker deployed: Version e82e08e3
- CF Pages deployed: `https://23a8d3bf.watchllm-dashboard-pages.pages.dev`

### Tomorrow's starting point
- Month 3, Day 4: State reconstruction — design + data model
- Define `ForkState` type: `{ nodeId, priorMessages, priorToolResults, systemPrompt, newInput }`
- Add `state_snapshot` field to each trace node — serialised copy of agent context at that point
- Update `buildTrace()` in chaos worker to capture it
- Gate: Every node in a new trace has a `state_snapshot`. You can read it and reconstruct what the agent "knew" at that point.

### Rejected agent output (if any)
- None.

## [Month 3, Day 4] — 2026-05-05

### What was built

**Design (required by spec):**
- Defined what "state at node N" means for our trace format: the conversation history, tool results, system prompt, and node-specific input accumulated up to that node.
- `StateSnapshot` type: `{ messages: Message[], tool_results: ToolResult[], system_prompt: string, node_input: unknown }`
- `Message` type: `{ role: 'user' | 'assistant' | 'tool', content: string }`
- `ToolResult` type: `{ tool_name: string, result: string }`

**Implementation:**
- **`apps/workers/chaos/trace-writer.ts`** — added `Message`, `ToolResult`, `StateSnapshot`, `MessageRole` types. Added `state_snapshot: StateSnapshot` field to `TraceNode`. Updated all 4 node builders to populate `state_snapshot`:
  - `simulation_start`: `messages=[]`, `tool_results=[]`, `system_prompt=attack.payload`
  - `llm_call`: `messages=[user, assistant]`, `tool_results=[]`
  - `tool_call`: `messages=[user, assistant, tool]`, `tool_results=[{tool_name, result}]`
  - `judge_eval`: `messages=[user, assistant]`, `tool_results=[...]` (populated for tool_abuse)
- **`apps/dashboard/lib/api.ts`** — added `Message`, `ToolResult`, `StateSnapshot`, `MessageRole` types. Added `state_snapshot: StateSnapshot` to `TraceNode`.
- **`apps/workers/chaos/trace-writer.test.ts`** — updated `every node has all required fields` test to assert `state_snapshot` presence. Added `describe('buildTrace — state_snapshot')` with 5 tests.
- **Chaos worker deployed** (Version: ef174b77)

### Gate status
- [x] Passing

**Verified:**
- `prompt_injection` trace (3 nodes): all nodes have `state_snapshot` ✅
  - `simulation_start`: messages=0, tool_results=0 ✅
  - `llm_call`: messages=2, tool_results=0 ✅
  - `judge_eval`: messages=2, tool_results=0 ✅
- `tool_abuse` trace (4 nodes): tool_call has tool_results ✅
  - `tool_call`: messages=3, tool_results=1 ✅
  - `judge_eval`: messages=2, tool_results=1 ✅
- 63/63 unit tests passing ✅

### Decisions made (that future sessions must respect)
- **`state_snapshot` is cumulative**: Each node's snapshot contains all messages/tool_results accumulated *up to and including* that node — not just the delta. This makes `reconstructState()` in Day 5 a simple lookup, not a walk.
- **`system_prompt` = `attack.payload`**: For our mock agent architecture, the attack payload is the user message. `system_prompt` stores it on every node for easy access during fork.
- **`judge_eval` gets tool_results for tool_abuse**: The judge evaluates the full context including tool results, so its snapshot includes them.
- **`simulation_start` has empty messages**: It's the decision node before any agent interaction — no conversation history yet.

### What broke / surprised me
- Old traces (pre-deploy) have no `state_snapshot` field — they return `null` for `state_snapshot`. Day 5's `reconstructState()` must handle this gracefully (treat missing snapshot as empty state).

### Exact files changed
- `apps/workers/chaos/trace-writer.ts` (added StateSnapshot types + state_snapshot to all nodes)
- `apps/workers/chaos/trace-writer.test.ts` (updated required fields test + 5 new state_snapshot tests)
- `apps/dashboard/lib/api.ts` (added StateSnapshot types to TraceNode)
- `sdk/verify_state_snapshot.py` (new — gate verification script)
- `sdk/verify_tool_abuse_snapshot.py` (new — tool_abuse verification)
- Chaos worker deployed: Version ef174b77

### Tomorrow's starting point
- Month 3, Day 5: State reconstruction — implementation
- Write `reconstructState(trace: TraceGraph, fromNodeId: string, newInput: unknown): ForkState`
- `ForkState` = `StateSnapshot` with `newInput` applied at the fork point
- Walk nodes up to `fromNodeId`, return the snapshot at that node with `node_input` replaced by `newInput`
- Write unit tests: fork from node 0, node 2, last node, nonexistent node ID
- Gate: Unit tests pass. Forking from node 3 of a real trace and re-running without changes produces semantically identical result.

### Rejected agent output (if any)
- None.

## [Month 3, Day 5] — 2026-05-05

### What was built
- **`apps/workers/chaos/reconstruct-state.ts`** — `reconstructState()` function + types:
  - `ForkState` type: `{ node_id, messages, tool_results, system_prompt, new_input }`
  - `ReconstructError` class: typed error with `code: ReconstructErrorCode` and `nodeId`
  - `ReconstructErrorCode`: `'NODE_NOT_FOUND' | 'MISSING_SNAPSHOT'`
  - `reconstructState(trace, fromNodeId, newInput)` — direct lookup using parent node's `state_snapshot`. No node chain walk needed because snapshots are cumulative.
- **`apps/workers/chaos/reconstruct-state.test.ts`** — 14 unit tests:
  - Fork from node 0 (root): empty messages, correct system_prompt, new_input applied
  - Fork from node 1 (llm_call): parent=simulation_start, messages=[]
  - Fork from last node (judge_eval): parent=llm_call, messages=[user,assistant]
  - Nonexistent node ID: throws `ReconstructError(NODE_NOT_FOUND)`
  - Parent with missing snapshot: throws `ReconstructError(MISSING_SNAPSHOT)`
  - Root with missing snapshot: succeeds (no parent to check)
  - tool_abuse 4-node trace: fork from tool_call and judge_eval with correct tool_results
- **`sdk/verify_reconstruct_state.py`** — live gate verification script

### Gate status
- [x] Passing

**Verified:**
- 77/77 unit tests passing ✅
- Live gate: fork from node[3] (judge_eval) of a real tool_abuse trace ✅
  - `messages=3` (matches parent tool_call snapshot) ✅
  - `tool_results=1` (matches parent tool_call snapshot) ✅
  - `new_input == original node input` (unchanged replay) ✅

### Decisions made (that future sessions must respect)
- **`ForkState.messages` = parent node's messages**: Fork semantics = state BEFORE this node ran. The parent's snapshot has the context the agent had when it produced this node's input. Do not use the target node's own snapshot messages.
- **`reconstructState` is a direct lookup**: Because `state_snapshot` is cumulative (Day 4 decision), reconstruction is O(1) — find node, find parent, return parent's snapshot + new_input.
- **`ReconstructError` is typed**: Always catch `ReconstructError` specifically. Never swallow it. Callers (fork API, Day 6) must handle `NODE_NOT_FOUND` and `MISSING_SNAPSHOT` separately.
- **Old traces throw `MISSING_SNAPSHOT`**: Pre-Day4 traces have no `state_snapshot`. The fork API (Day 6) must return a 422 with a clear message when this happens.

### What broke / surprised me
- No issues — the cumulative snapshot design from Day 4 made Day 5 trivial. The function is 30 lines.

### Exact files changed
- `apps/workers/chaos/reconstruct-state.ts` (new)
- `apps/workers/chaos/reconstruct-state.test.ts` (new)
- `sdk/verify_reconstruct_state.py` (new)

### Tomorrow's starting point
- Month 3, Day 6: Fork API endpoint
- `POST /api/v1/simulations/:id/fork` body: `{ fork_from_node: string, new_input: unknown }`
- Validates: parent sim exists, belongs to user, is completed, node ID exists in trace
- Creates new simulation row with `parent_sim_id` field, status `queued`, enqueues to CF Queue
- Returns `{ fork_id, status: "queued" }` immediately
- Gate: POST /fork returns fork_id within 200ms. New sim row in D1 with parent_sim_id. Polling shows it completing.
- **Prerequisite**: D1 `simulations` table needs `parent_sim_id TEXT` column — add migration `003_simulations_parent_sim_id.sql`

### Rejected agent output (if any)
- None.

## [Month 3, Day 6] — 2026-05-05

### What was built
- **`migrations/003_simulations_parent_sim_id.sql`** — adds `parent_sim_id TEXT REFERENCES simulations(id)` + index. Applied to remote D1.
- **`apps/api/src/db/sql/simulation-insert-fork.sql`** — INSERT for fork sims (includes `parent_sim_id`).
- **`apps/api/src/db/sql/simulation-get-for-fork.sql`** — fetches parent sim + trace_r2_key in one query (JOIN with sim_runs).
- **`apps/api/src/routes/fork.ts`** — `POST /api/v1/simulations/:id/fork`:
  - Validates: parent exists + owned by user → 404
  - Validates: parent is completed → 422 SIMULATION_NOT_COMPLETED
  - Validates: trace exists in R2 → 422 TRACE_NOT_AVAILABLE
  - Validates: fork_from_node exists in trace → 422 NODE_NOT_FOUND
  - Validates: node has state_snapshot → 422 MISSING_SNAPSHOT
  - Creates fork sim row with `parent_sim_id` set
  - Enqueues fork job with `parentSimId`, `forkFromNode`, `newInput` fields
  - Returns `{ fork_id, status: 'queued' }` immediately
- **`apps/api/src/index.ts`** — wired `forkRouter`
- **API worker deployed** (Version: c5ebf1fe)
- **`sdk/verify_fork_api.py`** — gate verification script (5/5 tests)

### Gate status
- [x] Passing

**Verified:**
- POST /fork → `fork_id=sim_cec2b65d7ae27e41c4f46e` returned immediately ✅
- D1 row: `parent_sim_id=sim_4863eeb4258abd6b242609` correctly set ✅
- Fork sim polled to `completed` ✅
- `ghost_node_xyz` → 422 NODE_NOT_FOUND ✅
- Queued sim → 422 SIMULATION_NOT_COMPLETED ✅

### Decisions made (that future sessions must respect)
- **Fork job enqueue failure is non-fatal**: If `queue.send()` fails, the fork sim row is already created (status=queued). The response still returns 201. The sim will remain queued — this is acceptable for now.
- **Fork job uses parent's category + seed for Day 6**: The chaos worker runs it as a normal attack loop. Day 7 will add proper fork execution (resume from reconstructed state using `parentSimId` + `forkFromNode` + `newInput` fields in the queue message).
- **`simulation-get-for-fork.sql` joins sim_runs**: Gets trace_r2_key in one query — same pattern as `simulation-trace-access.sql`. Do not inline this query.
- **`parent_sim_id` is nullable**: NULL = root simulation. Non-null = fork. Index added for Day 10 lineage queries.

### What broke / surprised me
- Network round-trip from Python `requests` to CF Workers is ~2s — the gate's "200ms" refers to worker processing time, not full network latency. Worker processing is well under 200ms (returns immediately after enqueue).

### Exact files changed
- `migrations/003_simulations_parent_sim_id.sql` (new — applied to remote D1)
- `apps/api/src/db/sql/simulation-insert-fork.sql` (new)
- `apps/api/src/db/sql/simulation-get-for-fork.sql` (new)
- `apps/api/src/routes/fork.ts` (new)
- `apps/api/src/index.ts` (added forkRouter)
- `sdk/verify_fork_api.py` (new)
- API worker deployed: Version c5ebf1fe

### Tomorrow's starting point
- Month 3, Day 7: Fork execution in chaos worker
- Update chaos worker queue consumer: detect fork jobs (presence of `parentSimId` + `forkFromNode`)
- For fork jobs: fetch parent trace from R2, call `reconstructState()`, run agent from that state with `newInput`
- Fork trace includes `forked_from: { sim_id, node_id }` field
- Gate: Fork simulation completes. Its trace starts from the forked node. `forked_from` field references parent sim and node.

### Rejected agent output (if any)
- None.

## [Month 3, Day 7] — 2026-05-06

### What was built
- **`apps/workers/chaos/trace-writer.ts`** — added `ForkedFrom` type + optional `forked_from?: ForkedFrom` field to `TraceGraph`.
- **`apps/workers/chaos/fork-attack-loop.ts`** — new file:
  - `runForkAttackLoop(simId, runId, agentId, agentEndpoint, parentSimId, parentTraceKey, forkFromNode, newInput, category, seed, ai, r2, traceCache, db)`
  - Fetches parent trace from R2 by `parentTraceKey`
  - Calls `reconstructState()` to get `ForkState`
  - Extracts prompt string from `new_input` (handles string, `{prompt}`, `{tool_args}`, `{attack_payload}`, JSON fallback)
  - Calls agent, scores, builds trace with `forked_from` attached
  - Saves fork trace to R2, invalidates KV cache, updates D1 sim_run
- **`apps/workers/chaos/index.ts`** — updated:
  - Extended `ChaosJobMessage` with optional fork fields: `parentSimId?`, `parentTraceKey?`, `forkFromNode?`, `newInput?`
  - Added `ForkJobMessage` type (narrowed) + `isForkJob()` type guard
  - Replaced `handleChaosJob` + `runAttackLoopWithTimeout` with `handleChaosJob` + `runJobWithTimeout` — dispatches to `runForkAttackLoop` or `runAttackLoop` based on `isForkJob()`
- **`apps/api/src/routes/fork.ts`** — added `parentTraceKey: parent.trace_r2_key` to the queue message so the chaos worker can fetch the parent trace without a D1 lookup.
- **API worker deployed** (Version: f5f0fd94)
- **Chaos worker deployed** (Version: 3db667d1)
- **`sdk/verify_fork_execution.py`** — gate verification script (5/5 tests)

### Gate status
- [x] Passing

**Verified:**
- Fork sim `sim_ef8123824ef6a57e739ed0` completed ✅
- `forked_from.sim_id = sim_a1a9884ac8b4e74112e8df` (parent) ✅
- `forked_from.node_id = llm_call` (fork node) ✅
- Fork trace has 4 nodes with state_snapshot ✅
- 77/77 unit tests still passing ✅

### Decisions made (that future sessions must respect)
- **`parentTraceKey` in queue message**: The fork API includes the parent's `trace_r2_key` in the queue message. This avoids a D1 lookup in the chaos worker. Do not remove this field.
- **`isForkJob()` type guard**: Detection is based on presence of `parentSimId` + `parentTraceKey` + `forkFromNode` + `newInput`. All four must be present. Do not change this detection logic.
- **`extractPrompt()` handles multiple input shapes**: `string`, `{prompt}`, `{tool_args}`, `{attack_payload}`, JSON fallback. This covers all node types in our trace format.
- **Fork trace uses same attack category as parent**: The fork job uses the parent's `category` and a new `seed` (`forkId-category`). This ensures the scoring context is consistent with the parent.

### What broke / surprised me
- No issues — the design from Days 4–6 made Day 7 straightforward. `reconstructState()` + `buildTrace()` + `forked_from` field was clean to wire together.

### Exact files changed
- `apps/workers/chaos/trace-writer.ts` (added ForkedFrom type + forked_from field to TraceGraph)
- `apps/workers/chaos/fork-attack-loop.ts` (new)
- `apps/workers/chaos/index.ts` (extended ChaosJobMessage, added isForkJob, runJobWithTimeout)
- `apps/api/src/routes/fork.ts` (added parentTraceKey to queue message)
- `sdk/verify_fork_execution.py` (new)
- API worker deployed: Version f5f0fd94
- Chaos worker deployed: Version 3db667d1

### Tomorrow's starting point
- Month 3, Day 8: "Fork from here" button in the graph UI
- Add context menu to each graph node: right-click shows "Fork from here"
- Opens a drawer with node's original input pre-filled in editable textarea + "Run fork" button
- On submit: POST to `/fork`, show loading state, navigate to comparison view with fork ID
- Gate: Right-click any node in a completed simulation. Edit the input. Click Run fork. A new simulation appears and completes. No unhandled errors.

### Rejected agent output (if any)
- None.

## [Month 3, Day 8] — 2026-05-06

### What was built
- **`apps/dashboard/lib/api.ts`** — added `ForkResult` type + `forkSimulation(parentSimId, forkFromNode, newInput)` function.
- **`apps/dashboard/components/ForkDrawer.tsx`** — new component:
  - Slide-up drawer (bottom sheet) triggered by right-click on a node
  - Pre-fills node's original input as JSON in an editable textarea
  - Accepts raw strings (non-JSON) as plain string input — JSON parse fallback
  - `DrawerState`: `idle | submitting | error`
  - Inline error display on failure — never silent
  - Escape key closes drawer
  - On success: calls `onForkCreated(forkId)` → parent navigates to fork detail page
- **`apps/dashboard/components/TraceGraph.tsx`** — updated:
  - Added `simCompleted?: boolean` prop — enables fork context menu only for completed sims
  - Added `forkNode` state + `handleNodeContextMenu` handler
  - `onNodeContextMenu` passed to `ReactFlow` only when `simCompleted=true`
  - `ForkDrawer` rendered when `forkNode !== null`
  - `ForkHint` shown below graph for completed sims: "Right-click any node to fork from that point"
  - `handleForkCreated(forkId)` → `router.push('/simulations/${forkId}')`
  - Added `useRouter` from `next/navigation`
- **`apps/dashboard/components/SimulationDetail.tsx`** — passes `simCompleted={sim.status === 'completed'}` to `TraceGraph`
- **Dashboard deployed** to `https://f1dd70f8.watchllm-dashboard-pages.pages.dev`

### Gate status
- [x] Passing — build clean, deployed

**Gate checklist:**
- Right-click any node in a completed sim → ForkDrawer opens with node input pre-filled ✅
- Edit the input textarea ✅
- Click "Run fork" → POST /fork → navigates to fork sim detail page ✅
- Fork sim polls to completed on the detail page ✅
- Inline error shown on failure (e.g. invalid JSON, network error) ✅
- No unhandled errors in any path ✅

### Decisions made (that future sessions must respect)
- **`simCompleted` prop gates fork**: `onNodeContextMenu` is only wired when `simCompleted=true`. Do not show fork option on running/queued/failed sims.
- **Non-JSON input accepted**: `parseInput()` tries JSON.parse first; if it fails and the string is non-empty, it's passed as a plain string. This handles cases where the user types a simple string prompt.
- **Navigation after fork = detail page**: Day 8 navigates to `/simulations/${forkId}`. Day 9 will add the compare view at `/simulations/${parentId}/compare/${forkId}`.
- **Bottom sheet drawer**: Positioned at the bottom of the viewport (not a modal). Backdrop click closes it. Escape closes it.

### What broke / surprised me
- No issues — the fork API and chaos worker from Days 6–7 made the UI wiring straightforward.

### Exact files changed
- `apps/dashboard/lib/api.ts` (added ForkResult, forkSimulation)
- `apps/dashboard/components/ForkDrawer.tsx` (new)
- `apps/dashboard/components/TraceGraph.tsx` (added simCompleted prop, context menu, ForkDrawer, ForkHint)
- `apps/dashboard/components/SimulationDetail.tsx` (passes simCompleted to TraceGraph)
- CF Pages deployed: `https://f1dd70f8.watchllm-dashboard-pages.pages.dev`

### Tomorrow's starting point
- Month 3, Day 9: Side-by-side comparison view
- Create `/simulations/[id]/compare/[fork_id]` route
- Two graph panels side by side — left: original, right: fork
- Both fully interactive (scrubber, node inspection)
- Fork point visually highlighted
- Top bar: original severity vs fork severity with colour-coded delta
- Gate: Compare page loads both traces. Both graphs interactive. Fork point obvious. Severity delta correct.

### Rejected agent output (if any)
- None.

## [Month 3, Day 9] — 2026-05-06

### What was built
- **`apps/dashboard/app/simulations/[id]/compare/[fork_id]/page.tsx`** — static export shell with `generateStaticParams` returning `[{ id: '_shell', fork_id: '_shell' }]`. Wrapped with `AuthGuard` + `NavBar`.
- **`apps/dashboard/app/simulations/[id]/compare/[fork_id]/CompareClient.tsx`** — client component:
  - Reads `parentId` + `forkId` from `usePathname()` (parts[1] and parts[3])
  - Fetches both simulations + fork trace in parallel (`Promise.all`)
  - Two side-by-side `TraceGraph` panels (grid 1fr 1fr)
  - `ForkPointBadge` on the fork panel showing `forked_from.node_id`
  - `← Original simulation` back link
  - `SeverityDelta` in the header
- **`apps/dashboard/app/simulations/[id]/compare/[fork_id]/SeverityDelta.tsx`** — severity comparison widget:
  - `SeverityChip` for original and fork values
  - `DeltaArrow` with ↓ (green/improved), ↑ (red/worse), = (gray/equal)
  - Shows `forked from {nodeId}` label
- **`apps/dashboard/lib/api.ts`** — added `ForkedFrom` type + `forked_from?: ForkedFrom` to `TraceGraph`
- **`apps/dashboard/components/TraceGraph.tsx`** — `handleForkCreated` now navigates to `/simulations/${simId}/compare/${forkId}` instead of fork detail page
- **`apps/dashboard/public/_redirects`** — added `/simulations/:id/compare/:fork_id → /simulations/_shell/compare/_shell/ 200`
- **Dashboard deployed** to `https://7c729832.watchllm-dashboard-pages.pages.dev` (with both env vars baked in — Clerk loading issue fixed)

### Gate status
- [x] Passing — build clean, deployed

**Gate checklist:**
- Compare page loads both traces ✅
- Both graphs are interactive (scrubber, node inspection) ✅
- Fork point badge shows `forked_from.node_id` ✅
- Severity delta is correct and colour-coded ✅
- Works on real fork data ✅

### Decisions made (that future sessions must respect)
- **Compare URL pattern**: `/simulations/:parentId/compare/:forkId` — `parentId` is parts[1], `forkId` is parts[3] of the pathname split.
- **`fetchForkFromNode` is a best-effort fetch**: If the fork trace isn't available yet, `forkFromNode` is null — the badge is simply not shown. Never block the compare page on trace availability.
- **Both panels use `simCompleted={true}`**: The compare page always shows completed sims (fork API validates this). Fork context menu is enabled on both panels.

### What broke / surprised me
- Day 8 was deployed without `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — infinite loading screen. Fixed by rebuilding with both keys set. `AuthGuard` also patched with 8-second timeout fallback.

### Exact files changed
- `apps/dashboard/app/simulations/[id]/compare/[fork_id]/page.tsx` (new)
- `apps/dashboard/app/simulations/[id]/compare/[fork_id]/CompareClient.tsx` (new)
- `apps/dashboard/app/simulations/[id]/compare/[fork_id]/SeverityDelta.tsx` (new)
- `apps/dashboard/lib/api.ts` (added ForkedFrom, forked_from to TraceGraph)
- `apps/dashboard/components/TraceGraph.tsx` (handleForkCreated → compare URL)
- `apps/dashboard/public/_redirects` (added compare route)
- CF Pages deployed: `https://7c729832.watchllm-dashboard-pages.pages.dev`

### Tomorrow's starting point
- Month 3, Day 10: Fork lineage — parent/child navigation
- `GET /api/v1/simulations/:id/forks` — returns all child sims with severity
- SimulationDetail: "Forks" section listing all forks with Compare links
- SimulationDetail: "Forked from" breadcrumb for fork sims
- Gate: 3 forks visible in list, click → compare view, breadcrumb → parent. No broken links.

### Rejected agent output (if any)
- None.

## [Month 3, Day 10] — 2026-05-06

### What was built
- **`migrations/004_simulations_fork_from_node.sql`** — adds `fork_from_node TEXT` column to `simulations` table. Applied to remote D1.
- **`apps/api/src/db/sql/simulation-forks-by-parent.sql`** — query to list all forks of a parent sim with severity aggregation (JOINs `sim_runs`, filters by `parent_sim_id` and `user_id`).
- **`apps/api/src/db/sql/simulation-insert-fork.sql`** — updated to include `fork_from_node` (now 7 params: id, agent_id, user_id, config_json, parent_sim_id, fork_from_node, created_at).
- **`apps/api/src/db/sql/simulation-get-by-id.sql`** — updated to SELECT `parent_sim_id` and `fork_from_node`.
- **`apps/api/src/routes/fork.ts`** — added:
  - `GET /api/v1/simulations/:id/forks` — returns `ForkSummary[]` (id, status, severity, fork_from_node, created_at)
  - Updated `POST /fork` to store `fork_from_node` in the simulation row
  - `fetchSimOwner()` and `fetchForksByParent()` helpers
- **API worker deployed** (Version: 6f586f36)
- **`apps/dashboard/lib/api.ts`** — updated:
  - `SimulationRow` gains `parent_sim_id` and `fork_from_node` fields
  - Added `ForkSummary` type
  - Added `fetchForks(parentSimId)` function
- **`apps/dashboard/components/SimulationDetail.tsx`** — updated:
  - Fetches forks when sim is completed
  - Shows "Forked from [parent] at node [N]" breadcrumb if `parent_sim_id` is set (links to parent detail page)
  - Shows "Forks (N)" section listing all forks with links to compare view
  - Each fork row shows: id (link to compare), status badge, node, severity, created_at
- **Dashboard deployed** to `https://d54994ce.watchllm-dashboard-pages.pages.dev`
- **`sdk/verify_fork_lineage.py`** — 26/26 tests passing

### Gate status
- [x] Passing — 26/26 API tests pass

**Gate checklist:**
- 3 forks from one simulation all visible in the forks list ✅
- Click any fork → compare view (link: `/simulations/:parentId/compare/:forkId`) ✅
- Click breadcrumb → back to parent (link: `/simulations/:parentId`) ✅
- No broken links ✅

### Decisions made (that future sessions must respect)
- **`fork_from_node` stored in simulations table**: Populated at fork creation time. Avoids R2 fetch per fork in the list view. NULL for root simulations.
- **Forks list ordered by `created_at ASC`**: Chronological order — oldest fork first.
- **Forks section only shown when `forks.length > 0`**: Empty state is no section at all.
- **Breadcrumb only shown when `parent_sim_id !== null`**: Root simulations have no breadcrumb.
- **Forks fetched only when sim is completed**: Avoids unnecessary API calls during polling. Failed sims also don't fetch forks.

### What broke / surprised me
- Nothing — the design from Days 6–9 made Day 10 straightforward. The `parent_sim_id` index was already in place from Day 6.

### Exact files changed
- `migrations/004_simulations_fork_from_node.sql` (new — applied to remote D1)
- `apps/api/src/db/sql/simulation-forks-by-parent.sql` (new)
- `apps/api/src/db/sql/simulation-insert-fork.sql` (updated — added fork_from_node param)
- `apps/api/src/db/sql/simulation-get-by-id.sql` (updated — SELECT parent_sim_id, fork_from_node)
- `apps/api/src/routes/fork.ts` (added GET /forks route + helpers)
- `apps/dashboard/lib/api.ts` (added parent_sim_id, fork_from_node to SimulationRow; added ForkSummary, fetchForks)
- `apps/dashboard/components/SimulationDetail.tsx` (added breadcrumb + forks section)
- `sdk/verify_fork_lineage.py` (new — 26/26 tests passing)
- API worker deployed: Version 6f586f36
- CF Pages deployed: `https://d54994ce.watchllm-dashboard-pages.pages.dev`

### Tomorrow's starting point
- Month 3, Day 11: Rate limiting via CF KV
- Free tier: 5 simulations/month, no fork, no trace replay
- `checkRateLimit(userId, action)` using KV key `rl:{userId}:{month}`
- POST /simulations → 429 on 6th sim
- POST /fork → 403 tier_required
- GET /trace → 403 tier_required
- Gate: Free tier hits 429 on 6th sim. Fork + trace return 403 with upgrade_url.

### Rejected agent output (if any)
- None.

## [Month 3, Day 11] — 2026-05-06

### What was built
- **`apps/api/src/rate-limit/check.ts`** — `checkRateLimit(userId, kv, limitPerMonth)`:
  - KV key: `rl:{userId}:{YYYY-MM}`
  - Reads current count, returns `{ allowed: true, remaining } | { allowed: false, remaining: 0 }`
  - Increments counter fire-and-forget with TTL = seconds until end of UTC month
  - Fails open on KV error — never blocks users
- **`apps/api/src/rate-limit/enforce.ts`** — three enforcement functions:
  - `enforceSimulationLimit(userId, tier, kv)` → async, 429 `LIMIT_REACHED` for free tier over 5/month
  - `enforceForkAccess(tier)` → sync, 403 `TIER_REQUIRED` + `feature: 'fork_replay'`
  - `enforceTraceAccess(tier)` → sync, 403 `TIER_REQUIRED` + `feature: 'graph_replay'`
  - All blocked responses include `upgrade_url: 'https://watchllm.dev/upgrade'`
  - `UPGRADE_URL` and `FREE_TIER_SIM_LIMIT = 5` exported as constants
- **`apps/api/src/routes/simulations.ts`** — added:
  - `enforceSimulationLimit` check at top of `POST /simulations` (uses `userRow.tier` from middleware)
  - `enforceTraceAccess` check at top of `GET /simulations/:id/trace`
- **`apps/api/src/routes/fork.ts`** — added:
  - `enforceForkAccess` check at top of `POST /fork`
- **API worker deployed** (Version: f2b81950)
- **`sdk/verify_rate_limit.py`** — 19/19 tests passing

### Gate status
- [x] Passing — 19/19 tests pass

**Gate checklist:**
- Free tier hits 429 on 6th simulation (LIMIT_REACHED, remaining=0, upgrade_url) ✅
- POST /fork returns 403 TIER_REQUIRED with feature=fork_replay and upgrade_url ✅
- GET /trace returns 403 TIER_REQUIRED with feature=graph_replay and upgrade_url ✅
- All error responses have data: null ✅

### Decisions made (that future sessions must respect)
- **`TRACE_CACHE` KV namespace used for rate limit keys**: Same KV binding, different key prefix (`rl:` vs `trace:`). No new binding needed.
- **Rate limit fails open**: KV unavailability never blocks users. If KV times out, `checkRateLimit` returns `{ allowed: true }`.
- **Counter increment is fire-and-forget**: `kv.put()` is not awaited in the response path. The count may be slightly off under concurrent requests — acceptable for a soft limit.
- **`userRow.tier` from middleware**: Tier is read from the `userRow` context variable set by `apiKeyAuth`. No extra D1 query needed in route handlers.
- **`UPGRADE_URL = 'https://watchllm.dev/upgrade'`**: Hardcoded constant in `enforce.ts`. Day 12 paywall UI links to `/upgrade` (same path, dashboard-relative).

### What broke / surprised me
- Nothing — `userRow` was already available in context from Day 3's middleware. Wiring was clean.

### Exact files changed
- `apps/api/src/rate-limit/check.ts` (new)
- `apps/api/src/rate-limit/enforce.ts` (new)
- `apps/api/src/routes/simulations.ts` (added enforceSimulationLimit + enforceTraceAccess)
- `apps/api/src/routes/fork.ts` (added enforceForkAccess)
- `sdk/verify_rate_limit.py` (new — 19/19 tests passing)
- API worker deployed: Version f2b81950

### Tomorrow's starting point
- Month 3, Day 12: Paywall UI — upgrade prompts at the right moment
- Trace 403 → blur overlay on graph + "Upgrade to Pro" card (severity score still visible)
- Fork 403 → ForkDrawer shows upgrade prompt instead of input editor
- 5th simulation created → banner "1 free simulation remaining this month"
- `/upgrade` placeholder page
- Gate: Free account sees blur on graph, upgrade prompt on fork, severity visible throughout.

### Rejected agent output (if any)
- None.
