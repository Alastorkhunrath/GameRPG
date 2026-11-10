import { Boot } from './scenes/Boot';

import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';

import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 912,
    parent: 'game-container',
    min: {
        width: 1024
    },
    input: {
        keyboard: true // Включить клавиатуру
    },
    render: {
        pixelArt: true,
        roundPixels: true
        // antialias: false
    },
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {x: 0, y: 0 },
            debug: true
        }
    },
    scene: [
        Boot,
        Preloader,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
