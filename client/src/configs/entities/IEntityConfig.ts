import { IEntityPhysicsConfig } from '../physics/IEntityPhysicsConfig';
import { IEntityStatsConfig } from '../stats/IEntityStatsConfig';
import { IEntityVisualConfig } from '../visuals/IEntityVisualConfig';
import { IAbilityConfig } from '../abilities/IAbilityConfig'; // Assuming abilities are defined individually

// Master configuration interface for an entity (player class, mob type)
// This composes various domain-specific configurations.
export interface IEntityConfig {
  id: string;               // Unique identifier for this entity type (e.g., 'player_warrior', 'mob_imp')
  displayName: string;      // User-friendly name
  
  physics: IEntityPhysicsConfig;
  stats: IEntityStatsConfig;
  visuals: IEntityVisualConfig;
  
  // Abilities could be an array of IAbilityConfig objects,
  // or a key to an ability set defined elsewhere.
  // For simplicity, let's assume an array of ability configs for now.
  abilities?: IAbilityConfig[]; 
}
