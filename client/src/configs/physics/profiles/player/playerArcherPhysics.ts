import { IEntityPhysicsConfig } from '../../IEntityPhysicsConfig';
import { defaultEntityPhysicsConfig } from '../../defaultEntityPhysicsConfig';
import Phaser from 'phaser'; // Required for Phaser.Math.DegToRad

export const playerArcherPhysicsConfig: IEntityPhysicsConfig = {
  ...defaultEntityPhysicsConfig, // Start with base defaults

  // Archer-specific overrides
  moveForce: 0.004,
  maxSpeed: 5.5, // Faster
  maxAngularVelocity: Phaser.Math.DegToRad(900), // Very fast turning
  density: 0.0008,  // Lighter
  frictionAir: 0.02, // Less drag
  // Other properties like friction, frictionStatic, bodyShape, knockbackFactor inherited
};
