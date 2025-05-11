import { IEntityConfig } from './IEntityConfig';
import { playerArcherPhysicsConfig } from '../physics/profiles/player/playerArcherPhysics';
import { playerDefaultStats } from '../stats/profiles/player/playerDefaultStats'; // Using default stats for now
import { playerDefaultVisuals } from '../visuals/profiles/player/playerDefaultVisuals'; // Using default visuals for now
// import { archerAbilitySet } from '../abilities/sets/playerArcherAbilities'; // Example for future

export const playerArcherEntityConfig: IEntityConfig = {
  id: 'player_archer',
  displayName: 'Archer',
  
  physics: playerArcherPhysicsConfig,
  stats: { // Example: Archer might have slightly less health but more mana/energy if applicable
    ...playerDefaultStats,
    maxHealth: 120, 
    // maxMana: 70, 
  },
  visuals: { // Example: Archer might use a different texture
    ...playerDefaultVisuals,
    // textureKey: 'archer_texture', // When assets are ready
  },
  // abilities: archerAbilitySet.abilities, // Example
};
