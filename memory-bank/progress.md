# Progress Tracking

## Current Status: Stage 1 - Sandbox Development (Entity Class Structure Refactor Complete)
-   ✅ Project vision and core technologies (Phaser, Matter.js, SpacetimeDB) redefined.
-   ✅ `gameidea.md` and detailed design documents in `/docs` folder updated/created (including `project_architecture.md`).
-   ✅ **Client Architecture Refactor Complete:**
    *   Switched to **Matter.js** for physics.
    *   Implemented new data-driven configuration structure in `client/src/configs/`.
    *   Scaffolded `client/src/components/`, `client/src/entities/`, `client/src/systems/`.
    *   Established `BasePlayer.ts` and specific player class structure (e.g., `DefaultPlayer.ts` in `entities/playerClasses/`).
    *   `DefaultPlayer.ts` uses aggregated `IEntityConfig`.
    *   Basic Matter.js player movement and rotation functional.
-   ✅ Memory Bank files updated to reflect new architecture.
-   ⏳ Implementation of `MovementComponent` and refactoring `BasePlayer.ts` (or specific player classes) to use it is pending.
-   ❌ Core Sandbox gameplay mechanics (stats, health, basic combat) not yet implemented with new architecture.

## What Works (Code & Architecture)
1.  **Core Phaser Setup with Matter.js:**
    *   ✅ Game initializes with Matter.js physics engine.
    *   ✅ `DefaultPlayer` character (triangle sprite, circular Matter body) renders.
    *   ✅ Player responds to WASD/Arrow key input for movement (force-based).
    *   ✅ Player rotates to face the mouse cursor smoothly.
    *   ✅ Movement stops responsively when keys are released.
2.  **New Client Architecture:**
    *   ✅ `client/src/configs/` directory structure with physics, stats, visuals, abilities, and aggregated entity configs.
    *   ✅ `client/src/entities/` with `BasePlayer.ts` and `playerClasses/DefaultPlayer.ts`.
    *   ✅ Placeholder directories and files for `components/`, `systems/`.
3.  **Documentation:**
    *   ✅ `/docs` folder updated, including `project_architecture.md`.

## What's Left to Build (Immediate Next Steps for Stage 1)

-   **Component Implementation & Integration:**
    -   [ ] Flesh out `client/src/components/MovementComponent.ts`.
    -   [ ] Refactor `client/src/entities/BasePlayer.ts` to instantiate and use `MovementComponent`, passing input and relevant physics config.
-   **Player Physics & Controls Refinement:**
    -   [ ] Fine-tune `playerDefaultPhysics.ts` (and other class profiles) for optimal game feel.
    -   [ ] Update `IEntityPhysicsConfig` and `BasePlayer.ts` constructor to use the triangle vertex data for the player's collision shape (from `config.physics.bodyShape`).
-   **Basic Stats & Health System:**
    -   [ ] Flesh out `client/src/configs/stats/IEntityStatsConfig.ts` and `defaultEntityStats.ts`.
    -   [ ] Create/refine specific stat profiles (e.g., `playerDefaultStats.ts`).
    *   [ ] Implement `client/src/components/HealthComponent.ts`.
    *   [ ] Add `HealthComponent` to `BasePlayer.ts` (or specific player classes), configured by `IEntityConfig.stats`.
    *   [ ] Implement simple UI (e.g., text) to display player health.
-   **Sandbox Combat Mechanics (Initial):**
    -   [ ] Create `client/src/entities/mobs/DummyTarget.ts` (extending a potential `BaseMob.ts`).
    *   Define its `IEntityConfig`.
    *   Instantiate `DummyTarget` in `SandboxScene.ts`.
    *   Implement a basic "attack" action for the Player.
    *   Use `CombatSystem.ts` (or direct component interaction) to handle damage.

### Future Stage 1 Tasks (Beyond Immediate)
-   [ ] Implement other player classes (`WarriorPlayer.ts`, `ArcherPlayer.ts`) extending `BasePlayer.ts` and using their specific configs.
-   [ ] Basic ability system scaffolding (`AbilityCasterComponent`, example abilities).

### Stage 2: Arena & Multiplayer Integration (SpacetimeDB & Phaser Client)
-   (Tasks remain relevant)

### Stage 3: Game Polishing (Phaser Client & SpacetimeDB)
-   (Tasks remain relevant)

## Known Issues
*   Persistent 404 error for an unspecified resource in browser console (likely favicon, non-critical).
*   Old deleted config/type files might still appear in IDE "Open Tabs" list in environment details (editor state artifact).

## Evolution of Decisions
-   **Major Architectural Refactor (Completed):**
    *   Switched to Matter.js physics engine.
    *   Adopted a data-driven, component-based architecture:
        *   Central `configs/` for data profiles.
        *   `components/` for reusable logic.
        *   `entities/` with `BasePlayer.ts` and specific `playerClasses/` (e.g., `DefaultPlayer.ts`).
        *   `systems/` for global logic.
    *   Documentation moved to `/docs` with detailed architectural overview.
    *   Plan to use React for complex UI later.

## Next Milestone Goals
1.  Successfully implement `MovementComponent` and integrate it into `BasePlayer.ts`.
2.  Implement the triangle collision shape for the player using `config.physics.bodyShape`.
3.  Implement basic health system with `HealthComponent` and UI display.
4.  Create a `DummyTarget` mob and implement basic player attack interaction.

This document reflects the completion of the major architectural refactor, including the specific player class structure.
