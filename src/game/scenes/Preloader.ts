import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { SmallEnemy } from '../entities/SmallEnemy';

export class Preloader extends Scene
{

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
       
        


        Player.preload(
            this, 
            "player-idle", 
            "player/KNIGHT_2/IDLE.png", 
            {
                frameWidth: 34,
                frameHeight: 37,
                // spacing: 63
            }
        )
        Player.preload(
            this, 
            "player-run", 
            "player/KNIGHT_2/RUN.png", 
            {
                frameWidth: 37,
                frameHeight: 37,
                // spacing: 63
            }
        )
        Player.preload(
            this, 
            "player-attack_1", 
            "player/KNIGHT_2/ATTACK_1_1.png", 
            {
                frameWidth: 60,
                frameHeight: 37,
                // spacing: 63
            }
        )
        Player.preload(
            this, 
            "player-attack_2", 
            "player/KNIGHT_2/ATTACK_2.png", 
            {
                frameWidth: 62,
                frameHeight: 37,
                // spacing: 63
            }
        )
        Player.preload(
            this, 
            "player-attack_3", 
            "player/KNIGHT_2/ATTACK_3.png", 
            {
                frameWidth: 60,
                frameHeight: 51,
                // spacing: 63
            }
        )

        SmallEnemy.preload(
            this, 
            "Goblin_enemy_IDLE", 
            "small_enemy/goblin_enemy/Goblin_enemy_IDLE.png", 
            {
                frameWidth: 26,
                frameHeight: 25,

            }
        )
        SmallEnemy.preload(
            this, 
            "Goblin_enemy_HIT", 
            "small_enemy/goblin_enemy/Goblin_enemy_HIT.png", 
            {
                frameWidth: 26,
                frameHeight: 25,
                // spacing: 63
            }
        )

        SmallEnemy.preload(
            this, 
            "Goblin_enemy_ATTACK", 
            "small_enemy/goblin_enemy/Goblin_enemy_ATTACK.png", 
            {
                frameWidth: 39,
                frameHeight: 26,
                // spacing: 63
            }
        )

    }

    create ()
    {

        this.scene.start('Game');
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        
        
    }
}
