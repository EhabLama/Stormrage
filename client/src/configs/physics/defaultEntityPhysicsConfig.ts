import { IEntityPhysicsConfig } from './IEntityPhysicsConfig'; // Updated import path
import Phaser from 'phaser'; // Required for Phaser.Math.DegToRad

// Base default physics configuration for all entities.
// Specific profiles can override these values.
export const defaultEntityPhysicsConfig: IEntityPhysicsConfig = {
  // Movement
  moveForce: 0.005,
  maxSpeed: 4, 
  maxAngularVelocity: Phaser.Math.DegToRad(360), 
  
  // Matter.js Body Properties
  density: 0.001,
  friction: 0.1,
  frictionAir: 0.05, 
  frictionStatic: 0.5,

  // Collision Shape (default to a small circle)
  bodyShape: {
    type: 'circle',
    radius: 16, // Default radius, can be overridden by specific profiles
  },

  // Knockback
  knockbackFactor: 1.0, // Default: takes full knockback
};
