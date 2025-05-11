import Phaser from 'phaser';
import { IEntityPhysicsConfig } from '../configs/physics/IEntityPhysicsConfig';

// Placeholder for a Movement Component
// This component would encapsulate the logic for moving an entity based on its physics config and input.
// An entity (e.g., Player, Mob) would own an instance of this component.

export default class MovementComponent {
  private scene: Phaser.Scene;
  private entitySprite: Phaser.Physics.Matter.Sprite; // The sprite this component acts upon
  private physicsConfig: IEntityPhysicsConfig;
  private moveInput = new Phaser.Math.Vector2(0, 0); // Internal state for movement direction

  constructor(
    scene: Phaser.Scene,
    entitySprite: Phaser.Physics.Matter.Sprite,
    physicsConfig: IEntityPhysicsConfig
  ) {
    this.scene = scene;
    this.entitySprite = entitySprite;
    this.physicsConfig = physicsConfig;

    // Apply initial physics properties from config to the body if not already done by sprite constructor
    // Note: Properties like frictionAir, density are usually set when the body is created via bodyOptions.
    // This block is more for runtime adjustments if needed, or ensuring properties are set.
    // if (this.entitySprite.body) { 
        // Example: this.entitySprite.setFrictionAir(this.physicsConfig.frictionAir); // This is done via bodyOptions
    // }
  }

  // Called by the entity's update method
  public update(delta: number, externalInput?: Phaser.Math.Vector2, targetRotation?: number): void {
    if (!this.entitySprite.body) { // Guard for the entire update logic
        return;
    }

    if (externalInput) {
      this.moveInput.set(externalInput.x, externalInput.y).normalize();
    } else {
      this.moveInput.set(0,0); // Default to no movement if no external input provided
    }
    
    if (targetRotation !== undefined) {
      this.applyRotation(delta, targetRotation);
    }
    this.applyMovement(delta);
  }

  private applyRotation(delta: number, targetAngleRad: number): void {
    const currentAngleRad = this.entitySprite.rotation;
    const newAngle = Phaser.Math.Angle.RotateTo(
      currentAngleRad,
      targetAngleRad,
      this.physicsConfig.maxAngularVelocity * (delta / 1000)
    );
    this.entitySprite.setRotation(newAngle);
  }

  private applyMovement(delta: number): void {
    // Body null check is at the start of update() which calls this.
    // However, to be absolutely safe for direct calls or complex flows, an additional check here is fine.
    if (!this.entitySprite.body) return;

    const { moveForce, maxSpeed } = this.physicsConfig;

    if (this.moveInput.lengthSq() > 0) {
      const force = new Phaser.Math.Vector2(this.moveInput.x * moveForce, this.moveInput.y * moveForce);
      this.entitySprite.applyForce(force);
    }

    // currentVelocity will be undefined if body is undefined, but we guarded above.
    // It can also be undefined if the body is static and has no velocity component.
    const currentVelocity = this.entitySprite.body.velocity; 
    if (currentVelocity) { // Check if velocity object exists
      const speed = Math.sqrt(currentVelocity.x * currentVelocity.x + currentVelocity.y * currentVelocity.y);
      if (speed > maxSpeed) {
        const factor = maxSpeed / speed;
        this.entitySprite.setVelocity(currentVelocity.x * factor, currentVelocity.y * factor);
      }
    }

    // Damping / stopping logic
    // Ensure body and velocity exist before trying to dampen
    if (this.moveInput.lengthSq() === 0 && this.entitySprite.body && this.entitySprite.body.velocity) {
      const velX = this.entitySprite.body.velocity.x;
      const velY = this.entitySprite.body.velocity.y;

      this.entitySprite.setVelocity(velX * 0.9, velY * 0.9); // Apply strong damping

        if (Math.abs(velX) < 0.1 && Math.abs(velY) < 0.1) { 
         this.entitySprite.setVelocity(0,0); 
      } else {
        if (Math.abs(velX) < 0.1) {
            this.entitySprite.setVelocityX(0); 
            // If setVelocityX doesn't preserve Y: this.entitySprite.setVelocity(0, velY);
        }
        if (Math.abs(velY) < 0.1) {
            this.entitySprite.setVelocityY(0);
            // If setVelocityY doesn't preserve X: this.entitySprite.setVelocity(velX, 0);
        }
      }
    }
  }

  // Method for external systems (like AI or Player input handler) to set movement direction
  public setMoveInput(x: number, y: number): void {
    this.moveInput.set(x,y).normalize();
  }
}
