# System Patterns

This document outlines key architectural patterns and structures used in the project, focusing on the client-side Phaser game.

## Core Architecture: Data-Driven with Component-Based Entities

The client architecture emphasizes a separation of data (configurations) from logic (behavior).

1.  **Configuration Data (`client/src/configs/`):**
    *   All defining characteristics of entities (players, mobs) and game elements are stored as typed configuration objects.
    *   **Domains:** Configs are organized by domain:
        *   `configs/physics/`: For Matter.js physics profiles (`IEntityPhysicsConfig`, defaults, specific profiles like `playerWarriorPhysics.ts`). Includes movement forces, speeds, body shapes, friction, density, etc.
        *   `configs/stats/`: For entity statistics (`IEntityStatsConfig`, defaults, profiles like `playerWarriorStats.ts`). Includes health, mana, etc.
        *   `configs/abilities/`: For ability definitions and class/mob ability sets (`IAbilityConfig`, etc.).
        *   `configs/visuals/`: For visual appearance (`IEntityVisualConfig`, texture keys, animation names, scale).
    *   **Aggregation:** Master entity configurations (e.g., `configs/entities/playerWarriorEntityConfig.ts`) aggregate these domain-specific profiles into a complete `IEntityConfig` blueprint for each entity type.
    *   **Inheritance:** Default configurations (e.g., `defaultEntityPhysicsConfig.ts`) provide base values, and specific profiles extend these using object spreading.

2.  **Entity Logic (`client/src/entities/`):**
    *   **Base Classes:** A `BasePlayer.ts` class provides common functionality for all player-controlled characters. Similar base classes might exist for mobs.
    *   **Specific Entity Classes:** Classes like `client/src/entities/playerClasses/DefaultPlayer.ts` (and future `WarriorPlayer.ts`, `ArcherPlayer.ts`, mob classes like `Imp.ts`) extend their respective base class.
        *   They are instantiated with a specific, aggregated `IEntityConfig`.
        *   They set up their Phaser/Matter.js representation.
        *   They compose and manage **logic components**.
        *   They handle class-specific input or AI overrides and delegate to components or base class methods.

3.  **Reusable Logic Components (`client/src/components/`):**
    *   Encapsulate specific pieces of entity behavior (e.g., `MovementComponent.ts`, `HealthComponent.ts`, `AbilityCasterComponent.ts`).
    *   Components are configured by and operate on the data provided by the entity's config profiles.
    *   This promotes reusability (e.g., both players and mobs can use `MovementComponent` but with different physics profiles).

4.  **Global Systems (`client/src/systems/`):**
    *   (Optional, for more complex interactions) Manage game-wide logic or interactions between multiple entities (e.g., `CombatSystem.ts`, `AISystem.ts`).

## Key Technical Decisions & Patterns

### 1. Physics Engine: Matter.js
-   **Pattern:** Rigid-Body Physics Simulation.
-   **Implementation:**
    *   Phaser's Matter.js integration is used (`physics: { default: 'matter', matter: { ... } }` in `main.ts`).
    *   Entities requiring physics are `Phaser.Physics.Matter.Sprite`.
    *   Bodies are defined using `IEntityPhysicsConfig.bodyShape` and other Matter.js properties from the config.
    *   Movement is typically force-based (`entity.applyForce()`), with manual velocity capping for `maxSpeed`.
    *   Rotation is managed by `entity.setRotation()` with smooth interpolation towards a target angle, governed by `maxAngularVelocity`.
    *   Static environment elements are static Matter.js bodies. Decorative elements have no physics body.

### 2. Entity Configuration & Instantiation
-   **Pattern:** Data-Driven Entity Blueprints with Class Inheritance for Logic.
-   **Flow:**
    1.  Define `IEntityPhysicsConfig`, `IEntityStatsConfig`, etc., in `configs/[domain]/`.
    2.  Create default configs (e.g., `defaultEntityPhysicsConfig.ts`).
    3.  Create specific profiles (e.g., `configs/physics/profiles/player/playerWarriorPhysics.ts`).
    4.  Aggregate profiles into a master `IEntityConfig` (e.g., `configs/entities/playerWarriorEntityConfig.ts`).
    5.  A specific entity class (e.g., `client/src/entities/playerClasses/WarriorPlayer.ts`) extends `BasePlayer.ts`. It is instantiated in a scene.
    6.  The specific class's constructor calls `super()` with its dedicated `IEntityConfig`.
    7.  The `BasePlayer` constructor uses this config to set up the Matter body, initialize common components with relevant sub-configs (e.g., physics profile to a future `MovementComponent`).

### 3. Movement System (Current in `BasePlayer`, future in `MovementComponent`)
-   **Pattern:** Component-Based Behavior (Target). Currently, movement logic is in `BasePlayer.ts`.
-   **Flow (Target):**
    1.  `BasePlayer.ts` (or specific player class) instantiates `MovementComponent`, passing its Matter body and its `physicsProfile` (from `IEntityConfig.physics`).
    2.  Player input (or AI) calls `movementComponent.setMoveInput(x, y)` or similar methods on the component.
    3.  Player's `update` calls `movementComponent.update(delta, targetRotationAngle)`.
    4.  `MovementComponent` applies forces/rotation to the Matter body based on its config and current input.

### 4. UI Strategy (Future)
-   **Pattern:** Hybrid UI Approach.
-   **Implementation:**
    *   **In-Game World UI:** Phaser's native rendering.
    *   **Overlay Menus/Screens:** Plan to use **React**. (Details in `docs/ui_strategy.md`).

## Repository Structure (Key `client/src/` parts)
```
client/src/
├── configs/
│   ├── abilities/
│   ├── entities/           // Aggregated entity configs (playerDefaultEntityConfig.ts)
│   ├── physics/            // Physics interfaces, defaults, and profiles
│   │   ├── profiles/
│   │   │   ├── player/     // (playerDefaultPhysics.ts, playerWarriorPhysics.ts)
│   │   │   └── mobs/
│   ├── stats/
│   └── visuals/
├── components/             // (MovementComponent.ts, HealthComponent.ts)
├── entities/               // Entity classes
│   ├── BasePlayer.ts
│   ├── playerClasses/      // Specific player classes (DefaultPlayer.ts)
│   └── mobs/
├── scenes/
├── systems/                // (CombatSystem.ts, AISystem.ts)
└── main.ts
```
(Refer to `docs/project_architecture.md` for a more detailed tree.)

This component-based, data-driven architecture aims for flexibility, maintainability, and clear separation for designers and programmers.
