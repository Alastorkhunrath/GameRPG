import { Scene } from "phaser";
import { Player } from "../entities/Player";

export interface SmallEnemyConfigs {
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    playerAttacking: Player
}


export interface PlayerConfigs {


}