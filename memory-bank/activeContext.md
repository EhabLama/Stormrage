# Active Context

## Current Work Focus: Stage 1 - Sandbox Development (Post-Architectural Refactor)
-   **Primary Goal:** Begin implementing core gameplay features upon the newly established data-driven, component-based architecture using Phaser and Matter.js.
-   **Key Technologies:** Phaser, Matter.js, TypeScript.
-   **Current Phase:** Architectural refactor complete. Ready to implement core components and entity logic.

## Recent Changes & Decisions
-   **Physics Engine:** Confirmed use of **Matter.js**.
-   **Client Architecture:** Major refactor completed:
    *   Centralized `client/src/configs/` for all data profiles (physics, stats, abilities, visuals, aggregated entity blueprints).
    *   Scaffolded `client/src/components/` for reusable logic.
    *   Established `client/src/entities/` with `BasePlayer.ts` and `playerClasses/` (e.g., `DefaultPlayer.ts`) for specific player class implementations.
    *   Scaffolded `client/src/systems/` for global game systems.
-   **Documentation:**
    *   `/docs` folder created and populated with `project_architecture.md`, `ui_strategy.md`, and updated design documents.
    *   Root `gameidea.md` now serves as a pointer to detailed docs.
-   **Future UI:** Plan for **React** for complex UIs remains.
-   **Player Entity Structure:** Adopted Approach #2: `BasePlayer.ts` with specific classes like `DefaultPlayer.ts` extending it, each configured by its own `IEntityConfig`.

## Next Steps (Immediate for Stage 1)
1.  **Implement `MovementComponent`:**
    *   Flesh out the placeholder `client/src/components/MovementComponent.ts` with logic to handle movement and rotation based on an `IEntityPhysicsConfig`.
    *   Refactor `client/src/entities/BasePlayer.ts` (and by extension, `DefaultPlayer.ts`) to instantiate and use this `MovementComponent`. Player input should be passed to the component.
2.  **Refine Player Physics & Collision Shape:**
    *   Fine-tune values in `client/src/configs/physics/profiles/player/playerDefaultPhysics.ts` for desired Matter.js game feel.
    *   Update `playerDefaultPhysics.ts` and `BasePlayer.ts` to use the triangle vertex data for the player's collision shape instead of the current debug circle.
3.  **Implement Basic Stats & Health:**
    *   Flesh out `client/src/configs/stats/IEntityStatsConfig.ts` and `defaultEntityStats.ts`.
    *   Create/refine `playerDefaultStats.ts`.
    *   Implement `client/src/components/HealthComponent.ts`.
    *   Add `HealthComponent` to `BasePlayer.ts`, configured by `IEntityConfig.stats`.
    *   Display player health (simple UI text).
4.  **Basic Combat Interaction (Sandbox):**
    *   Create `client/src/entities/mobs/DummyTarget.ts`.
    *   Define its `IEntityConfig` (physics, stats, visuals).
    *   Instantiate `DummyTarget` in `SandboxScene.ts`.
    *   Implement a basic attack action for the player.
    *   Use `CombatSystem.ts` (or direct component interaction) to handle damage from player to dummy target.

## Active Decisions & Priorities (Stage 1)

### Client Development (Phaser + Matter.js - Highest Priority)
-   **Physics Engine:** Matter.js.
-   **Architecture:** Data-driven configs, component-based entity logic, base class + specific class inheritance for players.
-   **Focus:**
    *   Implementing core reusable components (`MovementComponent`, `HealthComponent`).
    *   Integrating these components into `BasePlayer.ts`.
    *   Establishing basic gameplay loop in the Sandbox (move, (future) attack dummy).
-   **Asset Strategy:** Continue with simple geometric shapes or placeholder sprites.

### Backend Development (SpacetimeDB - Deferred to Stage 2)
-   No active development.

### Infrastructure (Minimal for Stage 1)
-   Webpack Dev Server for local client development.

## Important Patterns & Considerations (Stage 1)
1.  **Data-Logic Separation:** Adhere to the new architecture separating `configs/` data from `components/`/`entities/`/`systems/` logic.
2.  **Component-Based Design:** Favor composition of behaviors through components.
3.  **Matter.js Best Practices:** Continue to learn and apply Matter.js concepts correctly.
4.  **Iterative Development:** Implement features step-by-step, testing frequently.

## Project Insights & Learnings (Ongoing)
-   The current architecture (Matter.js, data-driven, components, specific entity classes) provides a robust and scalable foundation.
-   Clear documentation (`/docs` folder) is essential for tracking design decisions and structure.

This document reflects the completion of the major architectural refactor and outlines the next steps for implementing core gameplay features.
