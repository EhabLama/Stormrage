import Phaser from 'phaser';
import { IEntityStatsConfig } from '../configs/stats/IEntityStatsConfig';

// Placeholder for a Health Component
// Manages an entity's health, damage taking, and death.
export default class HealthComponent {
  private scene: Phaser.Scene;
  private entity: Phaser.GameObjects.GameObject; // The entity this component is attached to
  private statsConfig: IEntityStatsConfig;
  
  private currentHealth: number;

  // Event emitter for health changes or death
  public events = new Phaser.Events.EventEmitter();

  constructor(
    scene: Phaser.Scene, 
    entity: Phaser.GameObjects.GameObject, 
    statsConfig: IEntityStatsConfig
  ) {
    this.scene = scene;
    this.entity = entity;
    this.statsConfig = statsConfig;
    this.currentHealth = this.statsConfig.maxHealth;
  }

  public takeDamage(amount: number): void {
    if (this.currentHealth <= 0) return; // Already dead

    this.currentHealth -= amount;
    this.events.emit('healthChanged', this.currentHealth, this.statsConfig.maxHealth);

    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.handleDeath();
    }
    console.log(`${this.entity.name || 'Entity'} took ${amount} damage, health: ${this.currentHealth}`);
  }

  public heal(amount: number): void {
    if (this.currentHealth <= 0) return; // Cannot heal if dead (usually)

    this.currentHealth += amount;
    if (this.currentHealth > this.statsConfig.maxHealth) {
      this.currentHealth = this.statsConfig.maxHealth;
    }
    this.events.emit('healthChanged', this.currentHealth, this.statsConfig.maxHealth);
    console.log(`${this.entity.name || 'Entity'} healed ${amount}, health: ${this.currentHealth}`);
  }

  private handleDeath(): void {
    console.log(`${this.entity.name || 'Entity'} has died.`);
    this.events.emit('died', this.entity);
    // Entity might destroy itself or trigger other game logic via the event
    // e.g., this.entity.destroy();
  }

  public getCurrentHealth(): number {
    return this.currentHealth;
  }

  public getMaxHealth(): number {
    return this.statsConfig.maxHealth;
  }

  public isAlive(): boolean {
    return this.currentHealth > 0;
  }
}
