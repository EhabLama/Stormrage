import Phaser from 'phaser';
import { IAbilityConfig } from '../configs/abilities/IAbilityConfig';
// import { IEntityStatsConfig } from '../configs/stats/IEntityStatsConfig'; // If abilities use mana/energy

// Placeholder for an Ability Caster Component
// Manages an entity's abilities, cooldowns, and casting logic.
export default class AbilityCasterComponent {
  private scene: Phaser.Scene;
  private entity: Phaser.GameObjects.GameObject;
  private abilities: IAbilityConfig[];
  // private statsConfig?: IEntityStatsConfig; // Optional, for mana/resource checks

  // Store cooldowns or active ability states
  private abilityCooldowns: Map<string, number> = new Map(); // abilityId -> cooldownEndTime

  constructor(
    scene: Phaser.Scene,
    entity: Phaser.GameObjects.GameObject,
    abilities: IAbilityConfig[]
    // statsConfig?: IEntityStatsConfig
  ) {
    this.scene = scene;
    this.entity = entity;
    this.abilities = abilities;
    // this.statsConfig = statsConfig;
  }

  public canCast(abilityId: string): boolean {
    const ability = this.abilities.find(a => a.id === abilityId);
    if (!ability) {
      console.warn(`Ability ${abilityId} not found for ${this.entity.name || 'Entity'}`);
      return false;
    }

    const now = this.scene.time.now;
    const cooldownEndTime = this.abilityCooldowns.get(abilityId) || 0;

    if (now < cooldownEndTime) {
      // console.log(`Ability ${abilityId} is on cooldown.`);
      return false;
    }

    // Add other checks like mana/resource cost if applicable
    // if (this.statsConfig && ability.manaCost && this.statsConfig.currentMana < ability.manaCost) return false;

    return true;
  }

  public cast(abilityId: string, target?: Phaser.Types.Math.Vector2Like): boolean {
    if (!this.canCast(abilityId)) {
      return false;
    }

    const ability = this.abilities.find(a => a.id === abilityId);
    if (!ability) return false; // Should have been caught by canCast

    console.log(`${this.entity.name || 'Entity'} casts ${ability.name}`);
    // Implement actual ability logic here or delegate to an ability execution system/function
    // This might involve creating projectiles, applying effects, playing animations, etc.

    // Set cooldown
    // if (ability.cooldown) {
    //   this.abilityCooldowns.set(abilityId, this.scene.time.now + ability.cooldown);
    // }
    
    return true;
  }

  // Called by the entity's update method, if abilities have ongoing effects or need per-frame checks
  public update(delta: number): void {
    // Update cooldowns, manage active ability durations, etc.
  }
}
