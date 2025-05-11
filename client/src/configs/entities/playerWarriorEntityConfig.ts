import { IEntityConfig } from './IEntityConfig';
import { playerWarriorPhysicsConfig } from '../physics/profiles/player/playerWarriorPhysics';
import { playerDefaultStats } from '../stats/profiles/player/playerDefaultStats'; // Using default stats for now
import { playerDefaultVisuals } from '../visuals/profiles/player/playerDefaultVisuals'; // Using default visuals for now
// import { warriorAbilitySet } from '../abilities/sets/playerWarriorAbilities'; // Example for future

export const playerWarriorEntityConfig: IEntityConfig = {
  id: 'player_warrior',
  displayName: 'Warrior',
  
  physics: playerWarriorPhysicsConfig,
  stats: { // Example: Warrior might have more health than default player
    ...playerDefaultStats,
    maxHealth: 200, 
  },
  visuals: { // Example: Warrior might use a different texture or scale
    ...playerDefaultVisuals,
    // textureKey: 'warrior_texture', // When assets are ready
    // scale: 1.1, 
  },
  // abilities: warriorAbilitySet.abilities, // Example
};
