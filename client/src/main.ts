import Phaser from 'phaser';
import BootScene from '@/scenes/BootScene';
import SandboxScene from '@/scenes/SandboxScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Automatically detect renderer (WebGL or Canvas)
  scale: {
    mode: Phaser.Scale.RESIZE, // Resize game to fit parent
    parent: undefined, // ID of the DOM element to add the canvas to
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'matter', // Switch to Matter.js
    matter: {
      gravity: { x: 0, y: 0 }, // No global gravity for a top-down game
      debug: true, // Enable Matter.js debug drawing
      // Other Matter.js specific world settings can go here
    },
  },
  scene: [BootScene, SandboxScene], // Array of scenes to add to the game
  backgroundColor: '#000000', // Default background color
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Phaser.Game(config);
