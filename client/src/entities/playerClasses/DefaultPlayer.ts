import BasePlayer from '../BasePlayer';
import { IEntityConfig } from '../../configs/entities/IEntityConfig';
import { playerDefaultEntityConfig } from '../../configs/entities/playerDefaultEntityConfig';
import Phaser from 'phaser';

export default class DefaultPlayer extends BasePlayer {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Pass the specific config for this class to the BasePlayer constructor
    super(scene, x, y, playerDefaultEntityConfig as IEntityConfig); 
    // Note: Casting as IEntityConfig because playerDefaultEntityConfig is already typed as such,
    // but ensures clarity if BasePlayer's constructor default was different.
  }

  // Override updateCharacter or add specific methods for DefaultPlayer if needed in the future
  // For now, it will use all logic from BasePlayer.
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, wasdKeys: { [key: string]: Phaser.Input.Keyboard.Key }, delta: number): void {
    this.updateCharacter(cursors, wasdKeys, delta);
  }
}
