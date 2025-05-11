import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    // Load any essential assets here for the game, like a loading bar
    // For now, we can keep it simple or load a placeholder if needed for SandboxScene
    console.log('BootScene: preload');
  }

  create(): void {
    console.log('BootScene: create - starting SandboxScene');
    this.scene.start('SandboxScene');
  }
}
