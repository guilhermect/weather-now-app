# GitHub Copilot Instructions

## Working method

- Always inspect the existing code before editing.
- Read `README.md` and relevant documents in `docs/` before implementing a task.
- Work only within the scope of the requested phase.
- Do not implement features planned for future phases early.
- Do not modify files unrelated to the task.
- Present a short plan before implementing.
- When ambiguity does not block implementation, choose the simplest option and document the decision.
- Ask questions only when missing information genuinely blocks implementation.
- Avoid premature abstractions.
- Prefer small, pure, testable functions.
- Do not use `any` in TypeScript.
- Do not leave TODOs, placeholders, or commented-out code without a documented justification.
- Never invent weather data in production.
- Simulated data may exist only in tests or test fixtures.
- Do not automatically create commits, tags, or pushes.
- At completion, suggest a Conventional Commit message.

## Product constraints

- The interface must be mobile-first.
- The primary experience must work at 320px viewport width.
- Keep the experience simple on large screens, using a centered maximum width.
- Do not add charts, maps, carousels, dashboards, or complex animations.
- Prioritize minimum and maximum temperature, chance of rain, and likely rain time.
- Do not present probability of rain as a guarantee that it will rain.
- Do not confuse probability of rain with precipitation volume.
- Thresholds used to classify low or relevant rain chances are product decisions, not official meteorological classifications.
- All interface text must be in Brazilian Portuguese.
- Do not implement geolocation, city search, favorites, notifications, or air quality in the MVP.

## Architecture

- Organize code by feature.
- Keep external integration isolated in an API layer.
- Keep API response types separate from application domain types.
- Normalize API responses before passing data to components.
- Keep rain analysis rules in pure domain functions.
- Visual components must not know the raw API format.
- Avoid global state; use local state and hooks.
- Do not add a backend solely to proxy Open-Meteo in the MVP.

## Definition of done

- The implementation is complete.
- There are no TypeScript errors.
- Lint passes.
- Related tests pass.
- The production build passes.
- Loading, success, empty, and error states have been considered where applicable.
- Basic accessibility has been checked.
- The interface has been reviewed at mobile and desktop viewports.
- Affected documentation has been created or updated.
- `CHANGELOG.md` has been updated in the Unreleased section.
- The phase status in `docs/ROADMAP.md` has been updated.

## Documentation as code

- Documentation is part of the definition of done.
- Before completing any task, compare current code and configuration behavior with the repository's Markdown files.
- Create or update all affected Markdown documents in the same change.
- A task is not complete while its documentation is outdated.
- Document every new dependency, command, script, environment variable, external integration, API contract, business rule, architectural decision, known limitation, or user-visible behavior.
- Update `README.md` when installation, execution, commands, or the product overview changes.
- Update `docs/ARCHITECTURE.md` when structure, responsibility, or data flow changes.
- Update `docs/API.md` when integration, endpoint, parameters, types, or error handling changes.
- Update `docs/PRODUCT.md` when scope, business rules, or user experience changes.
- Update `docs/DECISIONS.md` when a relevant technical or product decision is made.
- Update `docs/ROADMAP.md` when a phase starts or completes.
- Update `CHANGELOG.md` for every relevant functional, technical, or documentation change.
- Do not make artificial documentation changes without relevant content.
- Clearly distinguish planned features from implemented features.
- Never document as implemented anything that does not yet exist in the code.
