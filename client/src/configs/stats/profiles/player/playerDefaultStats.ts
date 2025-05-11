import { IEntityStatsConfig } from '../../IEntityStatsConfig';
import { defaultEntityStats } from '../../defaultEntityStats';

// Placeholder for default player stats, inheriting from general entity defaults
export const playerDefaultStats: IEntityStatsConfig = {
  ...defaultEntityStats,
  // Player-specific overrides or additions
  maxHealth: 150, // Players might have slightly more health than a generic default
};
