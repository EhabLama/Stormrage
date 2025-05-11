// Placeholder for Entity Visual Configuration Interface
// This will define the structure for an entity's visual appearance.
export interface IEntityVisualConfig {
  textureKey: string; // Key for the main sprite texture/atlas
  
  // Optional: if using sprite sheets with distinct frames/animations
  animations?: {
    idle: string | { key: string; frameRate?: number; repeat?: number };
    walk?: string | { key: string; frameRate?: number; repeat?: number };
    attack?: string | { key: string; frameRate?: number; repeat?: number };
    // ... other animation states
  };
  
  scale?: number | { x: number; y: number }; // Default scale
  tint?: number; // Optional tint color
  
  // ... more visual properties as needed (e.g., particle effects on spawn/death)
}
