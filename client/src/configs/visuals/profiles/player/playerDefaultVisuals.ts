import { IEntityVisualConfig } from '../../IEntityVisualConfig';
import { defaultEntityVisuals } from '../../defaultEntityVisuals';

// Placeholder for default player visuals
export const playerDefaultVisuals: IEntityVisualConfig = {
  ...defaultEntityVisuals,
  textureKey: 'playerTriangleTexture', // Player uses the triangle texture created in Player.ts
  // animations: { idle: 'player_idle', walk: 'player_walk' } // Example
};
