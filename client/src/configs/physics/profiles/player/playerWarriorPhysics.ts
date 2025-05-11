import { IEntityPhysicsConfig } from '../../IEntityPhysicsConfig';
import { defaultEntityPhysicsConfig } from '../../defaultEntityPhysicsConfig';
import Phaser from 'phaser'; // Required for Phaser.Math.DegToRad

export const playerWarriorPhysicsConfig: IEntityPhysicsConfig = {
  ...defaultEntityPhysicsConfig, // Start with base defaults

  // Warrior-specific overrides
  moveForce: 0.006,
  maxSpeed: 4.5, 
  maxAngularVelocity: Phaser.Math.DegToRad(270), // Slower turning
  density: 0.002,   // Heavier
  frictionAir: 0.08, // More drag due to being "heavy"
  // Other properties like friction, frictionStatic, bodyShape, knockbackFactor inherited
};
