# 2D Topdown RPG Roguelite Web Game

## Core Philosophy
- **Instant Accessibility:** Web-based, aiming for quick load times and immediate play.
- **Engaging Gameplay Loop:**
    - **Arena (Multiplayer):** Inspired by Slither.io for immediate, drop-in multiplayer action.
    - **Roguelite Mechanics:** Inspired by Hades for combat depth and progression.
- **Reaction-Based Combat:** Ultra-responsive controls and low-latency feedback are paramount.
- **Optimized Performance:** Lightweight client (Phaser with Matter.js for physics) and efficient backend (SpacetimeDB).
- **UI Strategy:** Plan to use React for complex overlay UIs in later stages (see `ui_strategy.md`).

## Game Design

### Maps & Modes
1.  **Sandbox Map (Single-Player):**
    *   A dedicated practice area.
    *   Features dummy targets to test skills, movement, and damage systems.
    *   Focus of the initial development stage.
2.  **Arena Map (Multiplayer):**
    *   The primary multiplayer environment.
    *   Players engage in real-time combat and interaction.

### Character System
- (To be detailed - initial focus on core mechanics)
- Will likely involve distinct skills/abilities suitable for a roguelite and fast-paced PvP.
- Detailed class information (Warrior, Archer, Mage, etc.) and their specific physics/abilities will be documented in `character_classes.md`.
- Mob information will be documented in `mobs.md`.

### Combat Design
- **Responsive & Skill-Based:** Player reaction and skill are central.
- **Top-Down Perspective:** Clear visibility for combat.
- **Low Latency:** Essential for fair and engaging PvP.

## Technical Architecture

### Frontend Stack
1.  **Core Technologies:**
    *   **Phaser:** Primary game engine.
    *   **Matter.js:** Integrated via Phaser for 2D physics simulations.
    *   **TypeScript:** For robust and maintainable code.
2.  **Key Phaser & Matter.js Features Utilized:**
    *   Phaser Scene management (for Sandbox, Arena, UI).
    *   Phaser Input handling for responsive controls.
    *   Matter.js for physics (collision, movement, forces, custom body shapes). Detailed in `physics_systems.md`.
    *   Phaser Sprite and animation systems.
3.  **Performance Targets:**
    *   Fast initial load time.
    *   High FPS (60+).
    *   Minimal input latency.

### Backend & Multiplayer Stack
1.  **Core Technology:**
    *   **SpacetimeDB:** Will handle database, server-side game logic, and real-time multiplayer synchronization.
2.  **Multiplayer Architecture:**
    *   Leverage SpacetimeDB's capabilities for state synchronization and real-time communication.
    *   Focus on low-latency interactions for the Arena map.

### Cloud Infrastructure
- Deployment of SpacetimeDB (details to be determined based on SpacetimeDB's hosting/deployment options).
- CDN for frontend asset distribution.

## Development Stages & Priorities

### Stage 1: Sandbox Development (Current Focus)
1.  **Setup Phaser Project:** Initialize project structure, TypeScript.
2.  **Implement Sandbox Map:**
    *   Basic environment.
    *   Player character with core movement mechanics.
    *   Dummy target(s).
3.  **Develop Core Combat Mechanics (Client-Side):**
    *   Basic attack/skill system.
    *   Damage calculation and feedback on dummy targets.
    *   Health/status display.
4.  **Asset Integration:** Initial placeholder or basic assets.

### Stage 2: Arena & Multiplayer Integration
1.  **SpacetimeDB Setup:** Configure and deploy SpacetimeDB.
2.  **Develop Arena Map:** Design and implement the multiplayer map.
3.  **Integrate SpacetimeDB:**
    *   Port/develop game logic within SpacetimeDB.
    *   Implement player state synchronization (position, actions, health).
    *   Handle multiplayer interactions and combat resolution.
4.  **Network Optimization:** Ensure low-latency and stable multiplayer experience.

### Stage 3: Game Polishing
1.  **Refine Gameplay:** Balance, controls, user experience.
2.  **Enhance Visuals & Audio:** Implement final assets, effects, sound.
3.  **Add Roguelite Elements:** Progression systems, varied abilities, etc.
4.  **Extensive Testing & Optimization:** Performance, bug fixing, scalability.

## Key Considerations
- **Performance First:** Every technical decision must prioritize low latency and responsiveness.
- **Iterative Development:** Build and test core features incrementally, especially within each stage.

---
*This document provides a general overview. For more detailed information on specific aspects, please refer to other documents in the `/docs` folder.*
