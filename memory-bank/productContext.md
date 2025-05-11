# Product Context

## Problem Space
Many web-based RPGs or action games suffer from:
-   High friction to start playing (downloads, account creation).
-   Lack of truly responsive, skill-based combat.
-   Poorly implemented or laggy multiplayer.
-   Generic gameplay loops that don't offer immediate engagement or long-term depth.
This project aims to address these by combining instant web accessibility with deep roguelite mechanics and seamless, low-latency multiplayer.

## Solution: 2D Topdown RPG Roguelite
Our game provides:
1.  **Instant Web Access & Play:**
    *   Quick loading via browser.
    *   No mandatory account creation to jump into the Sandbox or Arena.
2.  **Engaging Dual Gameplay Experience:**
    *   **Sandbox (Single-Player):** A no-pressure environment to learn mechanics, test skills, and enjoy immediate action against dummy targets.
    *   **Arena (Multiplayer):** Fast-paced, Slither.io-style drop-in multiplayer combat with Hades-inspired roguelite depth.
3.  **Reaction-Based Combat:**
    *   Utilizing Phaser with **Matter.js physics** for responsive and potentially complex client-side controls and physical interactions.
    *   SpacetimeDB backend designed for low-latency multiplayer interactions.
4.  **Clear Development Path & Architecture:**
    *   **Data-Driven Design:** Entity characteristics (physics, stats, visuals, abilities) will be defined in configuration files within `client/src/configs/`, promoting easier tuning and scalability.
    *   **Component-Based Logic:** Entity behaviors will be built using reusable components (e.g., `MovementComponent`), promoting modularity.
    *   **Stage 1 (Sandbox):** Focus on perfecting core client-side gameplay in Phaser with Matter.js.
    *   **Stage 2 (Arena & Multiplayer):** Integrate SpacetimeDB for a robust multiplayer experience.
    *   **Stage 3 (Polishing):** Add layers of roguelite progression, content, and refinement.
    *   **Future UI:** Plan to use React for complex overlay UIs.

## User Experience Goals

### Sandbox Map (Stage 1 Focus)
1.  **Immediate Action:** Player enters the Sandbox quickly and can start interacting with dummy targets.
2.  **Responsive Controls:** Movement, attacks, and skills feel snappy and precise (Phaser).
3.  **Clear Feedback:** Obvious visual and (eventually) audio feedback for actions, hits, and damage.
4.  **Learning Environment:** Easy to understand and experiment with game mechanics without penalty.

### Arena Map (Stage 2 Focus)
1.  **Seamless Entry:** Drop into an active Arena session quickly.
2.  **Multiplayer Interaction:** Immediately see and interact with other players.
3.  **Low-Latency Combat:** PvP encounters feel fair and responsive, powered by SpacetimeDB.
4.  **Engaging Loop:** Fun, repeatable combat encounters with emerging strategies.

### Overall Technical Experience
-   Minimal perceived lag or stuttering.
-   Smooth animations and visual effects (Phaser).
-   Stable connections, especially in the Arena (SpacetimeDB).
-   Immediate feedback to player inputs across both maps.

## Success Metrics
1.  **Time to Play (Sandbox & Arena):** Aim for < 10-15 seconds from page load to active gameplay.
2.  **Player Engagement (Sandbox):** Players feel empowered to experiment and master controls.
3.  **Player Engagement (Arena):** High retention in short play sessions; players feel compelled to "one more round."
4.  **Combat Responsiveness:** Input-to-action latency consistently low.
5.  **Server Performance (Arena - SpacetimeDB):** Maintain low-latency for all players in an Arena session.
6.  **Client Performance (Phaser):** Consistent 60+ FPS.

This product context will guide decisions to ensure the game is fun, accessible, and technically sound, aligning with the core vision of a fast-paced, reaction-based RPG Roguelite.
