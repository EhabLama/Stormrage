# Physics Systems

This document outlines the approach to movement and combat physics in the game, utilizing **Phaser's Matter.js physics engine**. The goal is to create responsive, skill-based interactions with potential for complex physical behaviors, while allowing for distinct characteristics between different player classes and mob types.

## Core Principles
-   **Responsiveness:** Player input should translate to on-screen action with minimal delay.
-   **Clarity & Believability:** Physics interactions should be understandable, predictable, and feel appropriate for the game world (leaning towards more realistic interactions with Matter.js).
-   **Scalability:** The system must support unique physics profiles for various entities.
-   **Performance:** Physics calculations must be managed efficiently, especially for multiplayer scenarios.

## Chosen Physics Engine: Matter.js
-   Matter.js is selected for its ability to handle more complex rigid-body physics, including forces, torque, mass, density, friction, and custom collision shapes. This allows for richer interactions like nuanced knockbacks, weight simulation, and potentially constrained compound bodies (e.g., a warrior's weapon affecting movement).

## Movement Physics Architecture

### Movement Profiles (`IEntityPhysicsConfig`)
A key concept is the **Movement Profile**, defined by the `IEntityPhysicsConfig` interface (see `client/src/configs/physics/IEntityPhysicsConfig.ts`). This configuration object is associated with each entity type and defines parameters such as:

-   `moveForce`: Magnitude of force applied for movement.
-   `maxSpeed`: Maximum velocity an entity can reach (manually capped).
-   `maxAngularVelocity`: Maximum speed for rotation.
-   `density`: Affects the entity's mass (given its shape's area).
-   `friction`: Kinetic friction against other surfaces.
-   `frictionAir`: Damping/air drag, slowing the entity over time.
-   `frictionStatic`: Static friction against other surfaces.
-   `bodyShape`: Definition of the Matter.js body shape (e.g., circle, rectangle, fromVertices).
-   `knockbackFactor`: Multiplier for how knockback affects this entity.

These profiles are stored with a base configuration in `client/src/configs/physics/defaultEntityPhysicsConfig.ts` and specific overrides in individual files within `client/src/configs/physics/profiles/player/` and `client/src/configs/physics/profiles/mobs/`.

### Implementation Approach (Client-Side - Phaser with Matter.js)
1.  **Entity Class:** Entities requiring physics (e.g., `Player`) extend `Phaser.Physics.Matter.Sprite`.
2.  **Body Definition:** In the entity's constructor:
    *   A Matter.js body is created using the `bodyShape` defined in its `IEntityPhysicsConfig`.
    *   Physics properties from the `IEntityPhysicsConfig` (density, friction, frictionAir, etc.) are applied to the body definition.
3.  **Input Handling:**
    *   Player input (WASD, Arrow Keys, Mouse for rotation) is captured.
    *   AI logic will determine mob movement intentions.
4.  **Applying Movement & Rotation (in entity's `update` method or a `MovementComponent`):**
    *   **Movement:** Based on input, a force vector is calculated using `moveForce` and applied to the entity's body using `this.applyForce(forceVector)`.
    *   **Rotation:** The entity smoothly rotates to face the target angle (e.g., mouse cursor) by calculating the target angle and using `Phaser.Math.Angle.RotateTo` to interpolate the current rotation, then applying it with `this.setRotation()`. The speed of rotation is governed by `maxAngularVelocity`.
    *   **Velocity Capping:** The entity's velocity magnitude is manually checked against `maxSpeed` each frame and scaled down if exceeded.
    *   **Deceleration:** When no movement input is active, `frictionAir` provides natural damping. For more responsive stopping, velocity can be explicitly reduced or set to zero (as implemented in `Player.ts`).

### Example Profiles (Conceptual - see files in `client/src/configs/physics/profiles/player/` for actuals)
-   **WarriorProfile (e.g., `playerWarriorPhysics.ts`):** Higher `density`, moderate `moveForce`, lower `maxAngularVelocity`, higher `frictionAir`.
-   **ArcherProfile (e.g., `playerArcherPhysics.ts`):** Lower `density`, moderate `moveForce`, higher `maxAngularVelocity`, lower `frictionAir`.

## Static Environment Collision
-   Walls, floors, and other static parts of the game world that require collision will be defined as static Matter.js bodies (`isStatic: true`). This allows them to interact with dynamic bodies without being affected by forces themselves.
-   Decorative elements with no physical interaction will not have Matter.js bodies.

## Combat Physics
*(To be detailed later. Will cover aspects like projectile physics with Matter.js, hit detection using Matter.js collision events, knockback based on mass and force, area-of-effect, etc.)*
-   Initial combat in Sandbox will be client-side.
-   For Arena (Stage 2), combat resolution will be authoritative on SpacetimeDB, with Matter.js physics parameters and interactions needing to be understood or simulated by the server logic.

## SpacetimeDB Considerations (for Stage 2 - Arena)
-   While Phaser's Matter.js engine handles client-side simulation and prediction, SpacetimeDB will be the authority for entity states in the Arena.
-   Client inputs (intended forces, actions) will be sent to SpacetimeDB.
-   SpacetimeDB's server logic will need to perform its own physics calculations (which should be consistent with the client's `IEntityPhysicsConfig` profiles) to update the authoritative game state.
-   The client will receive updates from SpacetimeDB and reconcile any differences with its local Matter.js simulation (e.g., by correcting positions, velocities).

---
*This document is a work in progress and will be updated as the physics systems are implemented and refined.*
