# Project Brief: 2D Topdown RPG Roguelite Web Game

## Core Requirements
- **Instant Accessibility:** Web-based game, quick to load and play.
- **Engaging Gameplay:**
    - **Arena (Multiplayer):** Slither.io-style immediate multiplayer.
    - **Roguelite Mechanics:** Hades-inspired combat and progression.
- **Reaction-Based Combat:** Ultra-responsive controls, low latency.
- **Technology Stack:**
    - **Frontend:** Phaser game engine with TypeScript, using **Matter.js** for physics.
    - **Backend/Multiplayer:** SpacetimeDB.
    - **Future UI:** Plan to use **React** for complex overlay UIs.
- **Performance:** Optimized for smooth gameplay, especially in multiplayer.
- **Documentation:** Detailed design documents moved to `/docs` folder.

## Project Goals
1.  Create an engaging multiplayer RPG Roguelite experience, instantly accessible via browser.
2.  Deliver an ultra-responsive, reaction-based combat system using Phaser.
3.  Implement seamless multiplayer for the Arena map using SpacetimeDB.
4.  Maintain high performance and low latency.
5.  Develop two distinct maps: a single-player Sandbox for practice and a multiplayer Arena.

## Development Stages
The project follows a three-stage development strategy:

### Stage 1: Sandbox Development (Current Focus)
-   **Focus:** Single-player experience, core mechanics on the client-side.
-   **Tasks:**
    *   Set up Phaser project.
    *   Implement Sandbox map with player character and dummy targets.
    *   Develop client-side movement, combat (basic attacks/skills), and damage systems.
    *   Integrate initial assets.

### Stage 2: Arena & Multiplayer Integration
-   **Focus:** Multiplayer functionality and backend integration.
-   **Tasks:**
    *   Set up and configure SpacetimeDB.
    *   Develop the Arena map.
    *   Implement server-side game logic in SpacetimeDB.
    *   Integrate SpacetimeDB for player state synchronization, multiplayer interactions, and combat resolution in the Arena.
    *   Optimize network performance.

### Stage 3: Game Polishing
-   **Focus:** Refining gameplay, visuals, and adding depth.
-   **Tasks:**
    *   Balance gameplay mechanics.
    *   Enhance visuals, audio, and user interface.
    *   Implement detailed roguelite progression systems.
    *   Conduct extensive testing, optimization, and bug fixing.

## Technical Scope

### Frontend (Phaser + Matter.js + TypeScript)
-   Topdown 2D perspective.
-   Scene management for Sandbox, Arena, UI.
-   Responsive input handling.
-   Matter.js for physics simulation (movement, collision, forces).
-   Sprite and animation systems.
-   Performance targets: Quick load, 60+ FPS, minimal input lag.

### Backend (SpacetimeDB)
-   Handles all server-side game logic.
-   Manages database for player data and game state.
-   Provides real-time multiplayer synchronization for the Arena map.
-   Focus on low-latency communication.

### Infrastructure
-   Deployment of SpacetimeDB (specifics TBD based on SpacetimeDB).
-   CDN for frontend asset distribution.

## Game Scope

### Maps
1.  **Sandbox:** Single-player, practice environment with dummy targets.
2.  **Arena:** Multiplayer, main combat and interaction zone.

### Core Systems (Initial Focus on Sandbox)
-   Player movement.
-   Basic attack/skill system.
-   Damage calculation and feedback.
-   (Multiplayer systems to be developed in Stage 2 with SpacetimeDB).

## Development Priorities (Overall)
1.  **Stage 1 (Sandbox):** Establish core client-side gameplay mechanics in Phaser.
2.  **Stage 2 (Arena & Multiplayer):** Implement robust multiplayer using SpacetimeDB.
3.  **Stage 3 (Polishing):** Refine and expand the game into a full roguelite experience.
4.  **Performance:** Maintain low latency and high responsiveness throughout all stages.

This document serves as the foundational overview. All other Memory Bank documents will align with and expand upon these core tenets.
