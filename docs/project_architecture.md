# Project Architecture Overview

This document outlines the high-level architecture of the `client/src/` directory, emphasizing a data-driven approach with a clear separation between configuration data and game logic.

## Core Philosophy
-   **Data-Driven Design:** Entity behaviors, stats, and appearances are primarily defined by configuration files, making it easier for designers to tweak and balance without deep code changes.
-   **Separation of Concerns:** Logic for different aspects of the game (physics, stats, abilities, visuals, entity behavior) is organized into distinct modules or components.
-   **Modularity & Reusability:** Configurations and logic components are designed to be reusable and extensible.

## Main `client/src/` Folder Structure

```
client/src/
├── main.ts             // Game entry point, Phaser game configuration
│
├── scenes/             // Phaser scenes (BootScene, SandboxScene, ArenaScene, etc.)
│   └── ...
│
├── configs/            // ALL CONFIGURATION DATA (PROFILES, DEFINITIONS)
│   ├── abilities/
│   │   ├── IAbilityConfig.ts
│   │   ├── definitions/      // Individual ability data (e.g., fireball.ts)
│   │   └── sets/             // Ability sets for classes (e.g., playerWarriorAbilities.ts)
│   │
│   ├── physics/
│   │   ├── IEntityPhysicsConfig.ts
│   │   ├── defaultEntityPhysicsConfig.ts
│   │   └── profiles/         // Specific physics profiles for entities
│   │       ├── player/       // (e.g., playerWarriorPhysics.ts)
│   │       └── mobs/         // (e.g., mobImpPhysics.ts)
│   │
│   ├── stats/
│   │   ├── IEntityStatsConfig.ts
│   │   ├── defaultEntityStats.ts
│   │   └── profiles/
│   │       ├── player/
│   │       └── mobs/
│   │
│   ├── visuals/
│   │   ├── IEntityVisualConfig.ts
│   │   ├── defaultEntityVisuals.ts
│   │   └── profiles/
│   │       ├── player/
│   │       └── mobs/
│   │
│   └── entities/             // AGGREGATED entity configurations (blueprints)
│       ├── IEntityConfig.ts  // Master config interface for an entity
│       └── (e.g., playerWarriorEntityConfig.ts, mobImpEntityConfig.ts)
│
├── components/           // REUSABLE LOGIC COMPONENTS for entities
│   ├── MovementComponent.ts
│   ├── HealthComponent.ts
│   ├── AbilityCasterComponent.ts
│   └── ...
│
├── entities/             // ENTITY CLASSES (logic & component composition)
│   ├── BasePlayer.ts     // Base class for all player-controlled characters
│   ├── playerClasses/    // Specific player classes
│   │   ├── DefaultPlayer.ts
│   │   ├── WarriorPlayer.ts // Example, to be created
│   │   └── ArcherPlayer.ts  // Example, to be created
│   └── mobs/
│       └── (e.g., Imp.ts, Brute.ts) // Mob classes
│
└── systems/              // GLOBAL GAME SYSTEMS (optional, for broader interactions)
    ├── CombatSystem.ts
    ├── AISystem.ts
    └── ...
```

## Data and Logic Aggregation Flow: From Config to Playable Character

This section details how low-level configurations are aggregated and used by game logic to create a fully functional, playable character (e.g., a Warrior).

**1. Foundational Configuration (Lowest Level):**
   *   **Interfaces:** Define the structure of configuration objects for each domain.
        *   `configs/physics/IEntityPhysicsConfig.ts`
        *   `configs/stats/IEntityStatsConfig.ts`
        *   `configs/visuals/IEntityVisualConfig.ts`
        *   `configs/abilities/IAbilityConfig.ts`
   *   **Base Default Values:** Provide generic default values for each configuration domain. These act as a fallback or starting point.
        *   `configs/physics/defaultEntityPhysicsConfig.ts`
        *   `configs/stats/defaultEntityStats.ts`
        *   `configs/visuals/defaultEntityVisuals.ts`

**2. Specific Entity Type Profiles (Mid Level):**
   *   For each distinct entity type (e.g., Warrior player, Imp mob), specific profiles are created for each configuration domain. These typically inherit from the base defaults and override values.
   *   **Example for a "Warrior" player class:**
        *   `configs/physics/profiles/player/playerWarriorPhysics.ts`: Defines warrior-specific `moveForce`, `density`, `bodyShape`, etc., often spreading `...defaultEntityPhysicsConfig`.
        *   `configs/stats/profiles/player/playerWarriorStats.ts`: Defines warrior `maxHealth`, etc., spreading `...defaultEntityStats`.
        *   `configs/visuals/profiles/player/playerWarriorVisuals.ts`: Defines warrior `textureKey`, `animations`, spreading `...defaultEntityVisuals`.
        *   `configs/abilities/sets/playerWarriorAbilities.ts`: Defines the set of abilities available to the warrior, likely referencing individual ability definitions from `configs/abilities/definitions/`.

**3. Aggregated Entity Configuration (High-Level Data Blueprint):**
   *   A master configuration object is created for each entity type, bundling all its domain-specific profiles. This is the complete "datasheet" for that entity.
   *   The `configs/entities/IEntityConfig.ts` interface defines the structure of this master config, composing the domain-specific config interfaces.
   *   **Example for a "Warrior" player class:**
        *   `configs/entities/playerWarriorEntityConfig.ts`:
            ```typescript
            import { playerWarriorPhysicsConfig } from '../physics/profiles/player/playerWarriorPhysics';
            import { playerWarriorStats } from '../stats/profiles/player/playerWarriorStats';
            // ... other imports
            export const playerWarriorEntityConfig: IEntityConfig = {
              id: 'player_warrior',
              displayName: 'Warrior',
              physics: playerWarriorPhysicsConfig,
              stats: playerWarriorStats,
              visuals: playerWarriorVisuals,
              abilities: warriorAbilitySet, // (or array of ability configs)
            };
            ```

**4. Entity Class Implementation (Logic Layer):**
   *   **Base Entity Class (e.g., `entities/BasePlayer.ts`):**
        *   The constructor accepts an `IEntityConfig` object.
        *   It uses the `config.visuals.textureKey` to load the sprite.
        *   It uses `config.physics` (which is an `IEntityPhysicsConfig`) to set up the Matter.js body, including its shape (`config.physics.bodyShape`), density, friction, etc.
        *   It instantiates common **logic components** (e.g., `MovementComponent`, `HealthComponent`, `AbilityCasterComponent`), passing them the relevant sub-configurations from the `IEntityConfig` (e.g., `config.physics` to `MovementComponent`, `config.stats` to `HealthComponent`).
        *   Contains common update logic, often delegating to its components.
   *   **Specific Entity Class (e.g., `entities/playerClasses/WarriorPlayer.ts`):**
        *   Extends `BasePlayer.ts`.
        *   Its constructor calls `super(scene, x, y, playerWarriorEntityConfig)` (or another relevant aggregated config).
        *   Can implement warrior-specific logic, override base methods, or add unique components.

**5. Scene Instantiation & Gameplay (Highest Level):**
   *   A game scene (e.g., `SandboxScene.ts`) instantiates the specific entity class:
        *   `this.player = new WarriorPlayer(this, x, y);`
   *   During the game's update loop (`scene.update` -> `player.update`):
        *   The `WarriorPlayer` instance (and its `BasePlayer` part, along with its components like `MovementComponent`) uses the properties from its `playerWarriorEntityConfig` to determine its behavior.
        *   For example, when movement input is detected, the (future) `MovementComponent` would use `playerWarriorEntityConfig.physics.moveForce` to calculate how much force to apply to the Matter.js body. The `HealthComponent` would use `playerWarriorEntityConfig.stats.maxHealth`.

**In essence, the flow is:**
`Raw Data Values (Defaults) -> Typed Profiles (Physics, Stats, etc.) -> Aggregated Entity Blueprint (IEntityConfig) -> Base Entity Class (uses blueprint to set up body & components) -> Specific Entity Class (specializes base, uses blueprint) -> Scene (creates instance) -> Gameplay (behavior driven by configured data via components and entity logic).`

This layered approach allows for:
-   Easy tuning of numbers at various levels of specificity.
-   Clear separation of what an entity *is* (data in `configs/`) from what an entity *does* (logic in `entities/` and `components/`).
-   Reusable logic components that can be applied to any entity configured with the necessary data profiles.

## Benefits
-   **Clear Separation:** Designers can focus on the `configs/` directory to tune game balance and entity characteristics. Programmers can focus on the logic in `components/`, `entities/`, and `systems/`.
-   **Maintainability:** Changes to one entity's profile are isolated. Changes to core logic (e.g., how movement force is applied) are made in one place (e.g., `MovementComponent`).
-   **Scalability:** Adding new entity types primarily involves creating new configuration profiles and potentially a new entity class if its core behavior is unique.

This architecture provides a flexible and organized foundation for developing the game's characters, mobs, and their interactions.
