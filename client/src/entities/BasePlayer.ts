import Phaser from 'phaser';
import { IEntityConfig } from '../configs/entities/IEntityConfig'; 
import { playerDefaultEntityConfig } from '../configs/entities/playerDefaultEntityConfig'; 

// This class will serve as the base for specific player classes like Warrior, Archer, etc.
export default class BasePlayer extends Phaser.Physics.Matter.Sprite {
  protected entityConfig: IEntityConfig; // Changed to protected to allow access in subclasses
  protected moveInput = new Phaser.Math.Vector2(0, 0); // Changed to protected

  constructor(scene: Phaser.Scene, x: number, y: number, config: IEntityConfig = playerDefaultEntityConfig) {
    const textureKey = config.visuals.textureKey || 'playerTriangleTexture'; 
    if (!scene.textures.exists(textureKey)) {
      const graphics = scene.make.graphics({ x: 0, y: 0 }, false);
      graphics.fillStyle(0x00ff00);
      graphics.beginPath();
      graphics.moveTo(16, 0);
      graphics.lineTo(32, 32);
      graphics.lineTo(0, 32);
      graphics.closePath();
      graphics.fillPath();
      graphics.generateTexture(textureKey, 32, 32); 
      graphics.destroy();
    }

    const physicsConf = config.physics; 
    const shapeConfig = physicsConf.bodyShape || { type: 'circle', radius: 16 };
    let matterShape: Phaser.Types.Physics.Matter.MatterBodyConfig['shape'];

    if (shapeConfig.type === 'circle') {
      matterShape = { type: 'circle', radius: shapeConfig.radius, ...shapeConfig.options };
    } else if (shapeConfig.type === 'rectangle') {
      matterShape = { type: 'rectangle', width: shapeConfig.width, height: shapeConfig.height, ...shapeConfig.options };
    } else if (shapeConfig.type === 'polygon') {
      matterShape = { type: 'polygon', sides: shapeConfig.sides, radius: shapeConfig.radius, ...shapeConfig.options };
    } else if (shapeConfig.type === 'fromVertices') {
      matterShape = { type: 'fromVertices', verts: shapeConfig.verts, flagInternal: true, ...shapeConfig.options };
    } else {
      console.warn(`Unknown bodyShape type: ${(shapeConfig as any).type}. Defaulting to circle.`);
      matterShape = { type: 'circle', radius: 16 };
    }
    
    const bodyOptions: Phaser.Types.Physics.Matter.MatterBodyConfig = {
        shape: matterShape,
        friction: physicsConf.friction,
        frictionAir: physicsConf.frictionAir,
        frictionStatic: physicsConf.frictionStatic,
        density: physicsConf.density,
    };
    
    super(scene.matter.world, x, y, textureKey, undefined, bodyOptions);
    this.entityConfig = config; 
    scene.add.existing(this);
    
    if (config.visuals.scale) {
        if (typeof config.visuals.scale === 'number') {
            this.setScale(config.visuals.scale);
        } else {
            this.setScale(config.visuals.scale.x, config.visuals.scale.y);
        }
    }
  }

  // Renamed to 'updateBasePlayer' to avoid conflict if subclasses also have 'updatePlayer'
  // Or subclasses can call super.updatePlayer()
  public updateCharacter( 
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    wasdKeys: { [key: string]: Phaser.Input.Keyboard.Key },
    delta: number
  ): void {
    if (!this.body) {
        return;
    }
    this.processInput(cursors, wasdKeys);
    this.applyRotation(delta); 
    this.applyMovement(delta); 
  }

  // Changed to protected to be accessible by subclasses if they need to override/extend
  protected processInput(cursors: Phaser.Types.Input.Keyboard.CursorKeys, wasdKeys: { [key: string]: Phaser.Input.Keyboard.Key }): void {
    this.moveInput.set(0,0); 
    if (cursors.left.isDown || (wasdKeys.A && wasdKeys.A.isDown)) this.moveInput.x = -1;
    else if (cursors.right.isDown || (wasdKeys.D && wasdKeys.D.isDown)) this.moveInput.x = 1;

    if (cursors.up.isDown || (wasdKeys.W && wasdKeys.W.isDown)) this.moveInput.y = -1;
    else if (cursors.down.isDown || (wasdKeys.S && wasdKeys.S.isDown)) this.moveInput.y = 1;
    
    this.moveInput.normalize();
  }
  
  protected applyRotation(delta: number): void { // Changed to protected
    const pointer = this.scene.input.activePointer;
    const targetAngleRad = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY) + Math.PI / 2;
    
    const currentAngleRad = this.rotation;
    let newAngle = Phaser.Math.Angle.RotateTo(
        currentAngleRad,
        targetAngleRad,
        this.entityConfig.physics.maxAngularVelocity * (delta / 1000) 
    );
    this.setRotation(newAngle); 
  }

  protected applyMovement(delta: number): void { // Changed to protected
    if (!this.body) {
        return;
    }
    const { moveForce, maxSpeed } = this.entityConfig.physics;

    if (this.moveInput.lengthSq() > 0) { 
        const force = new Phaser.Math.Vector2(this.moveInput.x * moveForce, this.moveInput.y * moveForce);
        this.applyForce(force);
    }

    const currentVelocity = this.body.velocity; 
    if (currentVelocity) {
        const speed = Math.sqrt(currentVelocity.x * currentVelocity.x + currentVelocity.y * currentVelocity.y);
        if (speed > maxSpeed) {
            const factor = maxSpeed / speed;
            this.setVelocity(currentVelocity.x * factor, currentVelocity.y * factor);
        }
    }

    if (this.moveInput.lengthSq() === 0) {
        this.setVelocity(this.body.velocity.x * 0.9, this.body.velocity.y * 0.9); 
        if (this.body.velocity.x !== undefined && Math.abs(this.body.velocity.x) < 0.1) {
            this.body.velocity.x = 0;
        }
        if (this.body.velocity.y !== undefined && Math.abs(this.body.velocity.y) < 0.1) {
            this.body.velocity.y = 0;
        }
    }
  }
}
