# Character Classes

This document will detail the different playable character classes in the game, including their unique abilities, stats, and physics profiles.

## Overview
The game will feature distinct classes, each offering a unique playstyle. Each class will be implemented as its own TypeScript file (e.g., `WarriorPlayer.ts`, `ArcherPlayer.ts`) located in `client/src/entities/playerClasses/`, extending a common `BasePlayer.ts` class.
Initial planned classes include:
-   Warrior
-   Archer
-   Mage

## Physics Profiles
Each class will have a unique movement and physics profile affecting how they feel to control, based on the `IEntityPhysicsConfig` interface used with Matter.js (see `client/src/configs/physics/IEntityPhysicsConfig.ts`). These profiles will define parameters such as:
-   `moveForce`: Magnitude of force applied for movement.
-   `maxSpeed`: Maximum velocity.
-   `maxAngularVelocity`: Speed of rotation.
-   `density`: Affects mass.
-   `friction`: Kinetic friction.
-   `frictionAir`: Air drag/damping.
-   `frictionStatic`: Static friction.
-   `bodyShape`: Defines the collision shape.
-   `knockbackFactor`: Modifies how knockback is received.

(See files in `client/src/configs/physics/profiles/player/` for concrete example values, e.g., `playerWarriorPhysics.ts`.)

### Warrior
-   **Concept:** Melee powerhouse, durable.
-   **Movement Physics (Example - Matter.js centric):**
    -   `density`: High (heavier)
    -   `moveForce`: High (strong push)
    -   `maxSpeed`: Moderate
    -   `maxAngularVelocity`: Low (slower turning)
    -   `frictionAir`: Higher (feels weightier, stops with some inertia)
    -   (Other stats like health, damage, abilities TBD)

### Archer
-   **Concept:** Ranged damage dealer, agile.
-   **Movement Physics (Example - Matter.js centric):**
    -   `density`: Low (lighter)
    -   `moveForce`: Moderate
    -   `maxSpeed`: High
    -   `maxAngularVelocity`: High (fast turning)
    -   `frictionAir`: Lower (more nimble, less resistance)
    -   (Other stats like health, damage, abilities TBD)

### Mage
-   **Concept:** Ranged spellcaster, versatile or glass cannon.
-   **Movement Physics (Example - Matter.js centric):**
    -   `density`: Medium
    -   `moveForce`: Moderate
    -   `maxSpeed`: Moderate
    -   `maxAngularVelocity`: Medium
    -   (Other stats like health, damage, abilities TBD)

## Abilities
*(Details on class-specific abilities will be added here as they are designed.)*

---
*This document is a work in progress and will be updated as class designs are finalized.*
