# Agent Instructions (AGENTS.md)

This file contains the ground rules for any AI coding agent working on this repository.

## 1. Understand Before Acting
*   Read `.agent/project.json` to understand the project's profile, capabilities, and boundaries.
*   Inspect files before modifying them. Do not assume file paths or package versions based on external knowledge.
*   Classify the request before architecting a solution. Determine if it introduces a new capability.

## 2. Security Invariants
*   **Never trust client input.** All user-supplied data must be validated server-side (using Zod or equivalent).
*   **Never treat client-side checks as sufficient authorization.**
*   **Never treat middleware/proxy as the sole authorization boundary** — every Route Handler/Server Action must re-verify independently.
*   **Never expose secrets.** Environment variables that are secrets must not be exposed to the client (i.e., do not prefix with `NEXT_PUBLIC_`). Do not log secrets.
*   **Fail loudly on missing secrets.** Never invent a fallback secret if an environment variable is missing.
*   **Default to restrictive.** When adding a new capability, use the most restrictive reasonable setting.

## 3. Change Discipline
*   Keep diffs scoped to the user's task. Do not opportunistically rewrite unrelated code.
*   Do not add a dependency without logging why in `.agent/project.json`.
*   Prefer a native/platform solution over a new package.
*   Follow existing conventions unless they are unsafe. If they are unsafe, flag disagreement rather than silently overriding.

## 4. Ask Before Action (Stop and get explicit confirmation)
Do not proceed silently without user confirmation when:
*   Adding authentication, a database/datastore, payments, or a major external service/integration.
*   Collecting a new category of personal data.
*   Weakening or removing any existing security control (e.g., CSP, Headers, Rate Limiting).
*   Adding a runtime dependency with a large transitive footprint (>20 packages).

## 5. Quality Gates
*   Do not remove or weaken a test to make CI pass.
*   Do not disable a lint or security rule to silence a warning; fix the code or get explicit sign-off.
*   Verify security-sensitive changes concretely (e.g., run the check, inspect the header) rather than asserting correctness.
