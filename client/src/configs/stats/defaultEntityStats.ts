import { IEntityStatsConfig } from './IEntityStatsConfig';

// Placeholder for default entity stats
export const defaultEntityStats: IEntityStatsConfig = {
  maxHealth: 100,
  maxMana: 50, // Example default, can be overridden or removed if not all entities use mana
  // baseMovementSpeed: 100, // If we decide to keep this separate from physics maxSpeed
};
