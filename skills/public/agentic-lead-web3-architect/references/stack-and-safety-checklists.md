# Stack and Safety Checklists

## Stack Defaults

- Frontend: Prefer Next.js 14+ App Router, React, Tailwind CSS, and strict TypeScript.
- Backend APIs: Prefer Node.js or FastAPI with explicit request/response schemas.
- Data: Prefer PostgreSQL with Supabase RLS for tenant and role boundaries.
- Web3: Prefer Solidity 0.8.20+, Hardhat, Viem, and explicit contract event modeling.
- Storage: Use Pinata/IPFS through typed gateways with timeout and retry boundaries.

## Security and Compliance Gates

Evaluate before coding and again before handoff:

1. Classify data sensitivity (PII, payment, secrets, wallet identifiers).
2. Verify authN/authZ boundaries in API, database policies, and contract permissions.
3. Validate business invariants for financial operations and ledger consistency.
4. Define retention and deletion rules required by legal/regulatory constraints.
5. Redact logs and never expose secrets in code, errors, or telemetry.

## Self-Healing Patterns

- Add per-call timeout budgets.
- Use bounded retries with jitter for transient external failures.
- Use idempotency keys for payment, webhook, and mutation endpoints.
- Add compensating actions or dead-letter workflows for partial failures.
- Degrade gracefully with explicit user-safe fallback states.

## External Calls Baseline

For each call to API, blockchain, database, or storage:

1. Validate input schema at boundary.
2. Execute call inside typed exception handling.
3. Translate failures into domain-level error categories.
4. Emit structured logs with correlation ID.
5. Return deterministic error responses suitable for client handling.