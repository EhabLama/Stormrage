import { IEntityPhysicsConfig } from '../../IEntityPhysicsConfig';
import { defaultEntityPhysicsConfig } from '../../defaultEntityPhysicsConfig';
import Phaser from 'phaser'; // Required for Phaser.Math.DegToRad

export const playerDefaultPhysicsConfig: IEntityPhysicsConfig = {
  ...defaultEntityPhysicsConfig, // Start with base defaults

  // Override or add player-specific defaults
  maxSpeed: 5, 
  maxAngularVelocity: Phaser.Math.DegToRad(720), // Agile turning
  moveForce: 0.005, 
  frictionAir: 0.05, 
  // density, friction, frictionStatic will be inherited from defaultEntityPhysicsConfig
  // bodyShape will be inherited (circle radius 16)
  // knockbackFactor will be inherited (1.0)
};
