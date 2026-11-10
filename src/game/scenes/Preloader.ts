import { Scene } from 'phaser';

import { Player } from '../entities/Player';
import { Game } from './Game';
import { SmallEnemy } from '../entities/SmallEnemy';

export class Preloader extends Scene
{
    player: Player;
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {


        //  A simple progress bar. This is the outline of the bar.
        // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        // const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        // this.load.on('progress', (progress: number) => {
        //     //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
        //     bar.width = 4 + (460 * progress);

        // });
    }

    preload ()
    {

        this.load.setPath('assets');

        try{
            this.load.tilemapTiledJSON(
                'testMap',
                '/maps/test_tileMap_3.tmj'
            )
            this.load.image(
                'GrasslandTerrainTileset',
                'tiles/Grassland_Terrain_Tileset.png'
            );
            this.load.image(
                'worldTileset',
                'tiles/world_tileset.png'
            );
            // console.log('Успех')
        } catch (e){
            console.error('ошибка', e)
        }
        
        
        SmallEnemy.preload(
            this, 
            "enemy_1-idle", 
            "small_enemy/dimon/IDLE.png", 
            {
                frameWidth: 81,
                frameHeight: 71,
                // spacing: 63
            }
        )
        SmallEnemy.preload(
            this, 
            "enemy_1-hurt", 
            "small_enemy/dimon/HURT.png", 
            {
                frameWidth: 81,
                frameHeight: 71,
                // spacing: 63
            }
        )

        Player.preload(
            this, 
            "player-idle", 
            "player/idle/IDLE_3.png", 
            {
                frameWidth: 54,
                frameHeight: 37,
                // spacing: 63
            }
        )
        
        Player.preload(
            this, 
            "player-run", 
            "player/run/RUN_4.png", 
            {
                frameWidth: 54,
                frameHeight: 37,
               
            }
        )

        for (let i=1; i<4; i++){
            Player.preload(
                this, 
                `player-attack_${i}`, 
                `player/attacks/ATTACK_${i}-${i+1}.png`, 
                {
                    frameWidth: 54,
                    frameHeight: 37
                }
        )
        }

       
        //  Load the assets for the game - Replace with your own assets
        
        this.load.on('complete', () => {
            // console.log(this.scene)
           
            this.scene.start('Game');
        });
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        
        
    }
}
