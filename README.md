# Stormrage - 2D Topdown RPG Roguelite Web Game

This project is a 2D top-down RPG Roguelite web game being developed with Phaser (using Matter.js for physics) and TypeScript for the client, and SpacetimeDB for the backend/multiplayer (backend not yet implemented).

## Current Status
The project is in **Stage 1: Sandbox Development**.
A basic sandbox environment is set up with a player character that can move and rotate. The architecture is data-driven with a component-based approach for entities.

Refer to the `/docs` folder for detailed design and architecture documents, including:
-   `docs/game_overview.md`: Overall game concept and features.
-   `docs/project_architecture.md`: Client-side folder structure and data/logic flow.
-   `docs/physics_systems.md`: Details on the Matter.js physics implementation.
-   `docs/character_classes.md`: Information on planned player classes.
-   `docs/ui_strategy.md`: Plans for UI development.

## Client Setup and Running (Frontend)

The client-side game is located in the `/client` directory.

### Prerequisites
-   Node.js (LTS version recommended, e.g., 18.x or 20.x)
-   npm (comes with Node.js) or yarn

### Installation
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer yarn)

### Running the Development Server
1.  Ensure you are in the `client/` directory.
2.  Start the webpack development server:
    ```bash
    npm start
    ```
3.  This will typically open the game in your default web browser at `http://localhost:8080`.
    The server supports Hot Module Replacement (HMR), so changes to the code should reflect live in the browser.

## Project Structure (Client)
Key directories within `client/src/`:
-   `configs/`: Contains all data-driven configurations for entities, physics, stats, abilities, etc.
-   `components/`: Reusable logic components for entities.
-   `entities/`: Entity classes (e.g., `BasePlayer.ts`, specific player classes in `playerClasses/`).
-   `scenes/`: Phaser game scenes.
-   `systems/`: Global game systems.
-   `main.ts`: Main entry point for the Phaser game.

## Backend
The backend is planned to use SpacetimeDB. Setup and implementation for the backend will occur in a later development stage.
