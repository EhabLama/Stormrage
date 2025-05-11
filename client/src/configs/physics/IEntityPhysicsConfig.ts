// Defines the structure for entity physics configurations using Matter.js
export interface IEntityPhysicsConfig {
  // Movement capabilities
  moveForce: number;        // Magnitude of force applied for movement
  maxSpeed: number;         // Maximum speed (velocity magnitude, pixels/sec)
  maxAngularVelocity: number; // Maximum angular speed for turning (radians/sec)
  
  // Core Matter.js body properties influencing physics response
  density: number;          // Affects mass (e.g., 0.001 default)
  friction: number;         // Kinetic friction against other surfaces (e.g., 0.1 default)
  frictionAir: number;      // Air drag/damping (e.g., 0.05 default, 0 means no air drag)
  frictionStatic: number;   // Static friction against other surfaces (e.g., 0.5 default)
  
  // Collision Shape Definition for the Matter.js body
  // This allows defining different collider shapes per entity profile.
  bodyShape: {
    type: 'circle'; radius: number; 
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig; // Optional extra Matter options for the shape
  } | {
    type: 'rectangle'; width: number; height: number; 
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
  } | {
    type: 'polygon'; sides: number; radius: number; 
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
  } | {
    type: 'fromVertices'; verts: { x: number; y: number }[]; 
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
  };

  // Knockback related properties
  knockbackFactor?: number; // Multiplier for how much knockback this entity *receives* (e.g., 1.0 = normal, 0.5 = half, 2.0 = double). Defaults to 1.0 if undefined.
  // knockbackPower?: number; // Could be added later: Multiplier for knockback this entity *deals*.
}
