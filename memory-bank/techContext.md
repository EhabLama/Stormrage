# Technical Context

## Development Environment

### Core Technologies
1.  **Frontend:**
    *   **Phaser:** Game engine (latest stable version, e.g., Phaser 3.60+).
    *   **Matter.js:** Integrated via Phaser for 2D physics.
    *   **TypeScript:** For all client-side code.
    *   **WebGL:** Primary renderer for Phaser.
    *   **(Future) React:** For complex overlay UI elements.
2.  **Backend & Multiplayer:**
    *   **SpacetimeDB:** Database, server logic, and real-time synchronization.
    *   Language for SpacetimeDB modules (e.g., **Rust**).
3.  **Build Tools (Client):**
    *   **Node.js & npm/yarn:** For managing client-side dependencies and running build scripts.
    *   **Webpack/Parcel (or similar):** For bundling TypeScript and assets for the browser.

## Development Setup

### Required Tools
-   **Node.js** (Latest LTS for client development).
-   **TypeScript** (globally or project-local).
-   **Git** for version control.
-   **SpacetimeDB CLI** and associated toolchain (e.g., Rust toolchain if using Rust for modules).
-   A code editor with good TypeScript and (potentially) Rust support (e.g., VS Code).

### Project Structure (Conceptual - Key `client/src/` Folders)
```
client/src/
├── main.ts             // Game entry point
├── scenes/             // Phaser scenes
├── configs/            // Data configurations (physics, stats, abilities, visuals, entities)
│   ├── physics/
│   ├── stats/
│   └── ...
├── components/           // Reusable entity logic components
├── entities/             // Entity classes (Player, mobs)
│   └── mobs/
└── systems/              // Global game systems
```
(Refer to `docs/project_architecture.md` for a more detailed tree.)

### Backend (SpacetimeDB Project)
```
spacetimedb/
├── src/                // Server-side modules
├── spacetimedb.toml
└── schema.spl
```

## Dependencies (Illustrative)

### Frontend (client/package.json)
```json
{
  "dependencies": {
    "phaser": "^3.60.0", // Or latest stable
    "typescript": "^5.x" // Or latest stable
    // Potentially SpacetimeDB JavaScript SDK if available/needed
  },
  "devDependencies": {
    "webpack": "^5.x",
    "webpack-cli": "^4.x",
    "webpack-dev-server": "^4.x",
    "ts-loader": "^9.x",
    "html-webpack-plugin": "^5.x",
    "copy-webpack-plugin": "^11.x"
    // Other build/dev tools
  }
}
```

### Backend (SpacetimeDB - managed by its own system, e.g., Cargo.toml if Rust)
-   SpacetimeDB server/runtime.
-   Rust crates if using Rust (e.g., `spacetimedb_sdk`).

## Technical Constraints

### Browser Support
-   Modern desktop browsers (Chrome, Firefox, Edge, Safari - latest 2 versions).
-   WebGL support is essential.
-   Stable internet connection, especially for Arena mode.

### Performance Requirements
-   **Initial Load (Phaser client):** Aim for < 10-15 seconds.
-   **FPS (Phaser client):** Target 60+ FPS consistently.
-   **Latency (Arena - SpacetimeDB):** Critical for reaction-based gameplay. Aim for lowest possible round-trip time. SpacetimeDB's performance will be key.
-   **Client Memory:** Keep Phaser client footprint reasonable.

### Network Requirements (for Arena via SpacetimeDB)
-   Reliant on SpacetimeDB's transport mechanisms (typically WebSockets).

## Development Workflow

### Local Development
1.  **Client (Phaser + Matter.js):**
    *   Work within `client/` directory.
    *   `npm install` for dependencies.
    *   `npm start` for webpack-dev-server.
    *   Focus on implementing logic in `entities/` and `components/`, driven by data from `configs/`.
2.  **Backend (SpacetimeDB):**
    *   Work within `spacetimedb/` directory.
    *   Develop server modules and schema.
3.  Access game via browser (e.g., `http://localhost:8080`).

### Testing
-   **Client:** Manual testing of Sandbox mechanics. Unit tests for specific client-side logic (e.g., with Jest) if deemed necessary.
-   **Backend/Multiplayer:** Testing SpacetimeDB modules. Integration testing of client-server interaction for Arena mode.
-   Focus on playtesting for game feel and responsiveness.

### Deployment
-   **Client:** Build static assets (HTML, JS, CSS, images) from the `client/` project. Deploy these to a CDN or static web hosting.
-   **Backend:** Deploy SpacetimeDB instance and modules according to SpacetimeDB's recommended practices (cloud hosting, self-hosting options).

## Tool Usage Patterns

### Version Control (Git)
-   Feature branch workflow.
-   Regular commits.
-   Clear commit messages.

### Asset Pipeline (Client - Phaser)
-   Optimize images (e.g., using tools like TexturePacker for sprite sheets, or manual optimization).
-   Phaser's loader will handle asset loading.
-   Consider progressive loading for larger assets if needed later.

### SpacetimeDB Development
-   Define schema in `schema.spl`.
-   Implement server-side logic in modules (e.g., Rust).
-   Use SpacetimeDB CLI for local development, deployment, and management.

This document provides the technical context for development using Phaser and SpacetimeDB. Specific versions and configurations may be refined as development progresses.
