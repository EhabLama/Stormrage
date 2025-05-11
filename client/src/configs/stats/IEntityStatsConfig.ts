// Placeholder for Entity Stats Configuration Interface
// This will define the structure for an entity's core statistics.
// Example properties might include:
// health, maxHealth, mana, maxMana, stamina, maxStamina,
// baseAttack, attackSpeed, defense, criticalHitChance, criticalHitDamage,
// healthRegen, manaRegen, etc.

export interface IEntityStatsConfig {
  maxHealth: number;
  // currentHealth will be a runtime property, not config
  
  // Optional: if the game uses mana/energy for abilities
  maxMana?: number; 
  
  baseMovementSpeed?: number; // This might be redundant if maxSpeed in physics config is the true cap,
                              // but could be a "desired" speed before other factors.
                              // Or, could be used for display purposes.
                              // For now, let's assume physics config handles actual movement speeds.

  // ... more properties to be defined as systems are built
}
