import Phaser from 'phaser';
import DefaultPlayer from '@/entities/playerClasses/DefaultPlayer'; // Import specific player class

export default class SandboxScene extends Phaser.Scene {
  private player: DefaultPlayer | undefined; // Update type
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key }; 

  constructor() {
    super('SandboxScene');
  }

  preload(): void {
    console.log('SandboxScene: preload');
    // Load assets specific to the SandboxScene, like player sprites, tilesets, etc.
    // For now, we'll use a simple rectangle for the player.
  }

  create(): void {
    console.log('SandboxScene: create');

    // Add a simple background color or tile
    this.cameras.main.setBackgroundColor('#333333');

    // Create player instance (using DefaultPlayer for now)
    this.player = new DefaultPlayer(this, this.cameras.main.width / 2, this.cameras.main.height / 2);
    // Note: Player/BasePlayer constructor handles add.existing(this)

    // Initialize cursor keys for input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasdKeys = {
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    } else {
      console.error('Keyboard input not available.');
    }

    // Simple instructions text
    this.add.text(10, 10, 'Use WASD/Arrow keys to move. Player faces cursor.', {
      font: '16px Arial',
      color: '#ffffff',
    });
  }

  update(time: number, delta: number): void {
    if (!this.player || !this.cursors || !this.wasdKeys) {
      return;
    }

    // Pass delta if player's updatePlayer needs it for time-based calculations
    this.player.update(this.cursors, this.wasdKeys, delta); // DefaultPlayer has an 'update' method
  }
}
