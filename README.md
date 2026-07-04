# @fxck/contracts

Shared API contract for the todo rig. Plain ESM npm package — **no build step**.

Consumed by [`api`](https://github.com/fxck/api) and [`web`](https://github.com/fxck/web)
as a git dependency:

```json
{
  "dependencies": {
    "@fxck/contracts": "github:fxck/contracts"
  }
}
```

## Exports

- `API_VERSION` — string constant, the current contract version.
- `Todo` — the shape of a todo item (`{ id, title, done }`).
- `validateTodo(value)` — runtime type guard returning `value is Todo`.

## Scripts

- `npm run typecheck` — `tsc --noEmit` over the JS (checkJs) and the hand-written `index.d.ts`.
- `npm test` — `node --test`.
