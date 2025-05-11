import { IEntityConfig } from './IEntityConfig';
import { playerDefaultPhysicsConfig } from '../physics/profiles/player/playerDefaultPhysics';
import { playerDefaultStats } from '../stats/profiles/player/playerDefaultStats';
import { playerDefaultVisuals } from '../visuals/profiles/player/playerDefaultVisuals';
// import { exampleClassAbilitySet } from '../abilities/sets/exampleClassAbilities'; // Example

// Aggregated configuration for the default player character type
export const playerDefaultEntityConfig: IEntityConfig = {
  id: 'player_default',
  displayName: 'Player',
  
  physics: playerDefaultPhysicsConfig,
  stats: playerDefaultStats,
  visuals: playerDefaultVisuals,
  // abilities: exampleClassAbilitySet.abilities, // Example
};
