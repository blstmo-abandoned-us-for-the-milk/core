# Contributing to erin.js SDK

Thank you for your interest in contributing!

## Development setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/blstmo-abandoned-us-for-the-milk/core.git
   cd core
   pnpm install
   ```

2. Build the project:

   ```bash
   pnpm run build
   ```

3. Run tests:

   ```bash
   # Full test suite (unit tests + load tests + smoke tests)
   pnpm run test:all

   # Unit tests only (faster for iteration)
   pnpm run test

   # With coverage report (opens coverage/index.html)
   pnpm run test:coverage

   # JSON report (test-results/results.json)
   pnpm run test:report
   ```

4. Run lint:

   ```bash
   pnpm run lint
   ```

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) with Changesets for versioning:

- `fix:` - bug fixes
- `feat:` - new features
- `docs:` - documentation
- `chore:` - maintenance

When making changes that affect published packages, add a changeset:

```bash
pnpm exec changeset
```

## Pull request process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure lint and tests pass
4. Add a changeset if your changes affect published packages
5. Submit a pull request

## Project structure

- `packages/` - Monorepo packages
- `apps/docs/` - Documentation site
- `examples/` - Example bots
