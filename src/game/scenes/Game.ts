import { EventBus } from '../EventBus';
import { GameObjects, Scene } from 'phaser';

import { LOAD_CONFIG_SPRITE_SHEET} from '../configs/animation'

import { Player } from '../entities/Player';
import { Surface } from '../entities/Surface';
import { SmallEnemy } from '../entities/SmallEnemy';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;


    player: Player;


    surfaces: Surface[];

    enemyes: GameObjects.Group

    constructor ()
    {
        super('Game');
    }

    init(){
        
    }

    create ()
    {
        
        const map = this.make.tilemap({key: 'testMap',})
        // console.log(map)

        const objLayer = map.getObjectLayer('enemySpawn')

        // console.log(objLayer)
        objLayer?.objects.forEach((obj) => {

            if (obj.name === 'enemy_1') {
                this.testEnemy = new SmallEnemy(this, obj.x, obj.y, 'enemy_1-idle', obj.width)
            }


        })

        const tileset = map.addTilesetImage(
            "world_tileset",
            'worldTileset',
            16,
            16
        )

        const tileset2 = map.addTilesetImage(
            "Grassland_Terrain_Tileset",
            'GrasslandTerrainTileset',
            16,
            16
        )
        // console.log(tileset)
        if (!tileset || !tileset2) {
            throw new Error('Не удалось подключить world_tileset');
        }
        const earthLayer = map.createLayer(
            'earth',
            tileset2,
            0,
            0
        );
        const skyBlockLayer = map.createLayer(
            'sky_block',
            tileset2,
            0,
            0
        );
        
        if (!earthLayer || !skyBlockLayer) {
            throw new Error('Не удалось создать слои карты');
        }



        earthLayer.setCollisionBetween(1, 48);
        earthLayer.setCollisionBetween(82, 84);


        skyBlockLayer.setCollisionBetween(82, 84);
        earthLayer.setDepth(-1);
        skyBlockLayer.setDepth(0);
        

        

        this.player = new Player(this, 200, 700, 'player')
        
        LOAD_CONFIG_SPRITE_SHEET.forEach(cfg => {
            this.player.createAnimated(cfg.key, cfg.amountFrames, cfg.frames)
        });

        {
          // CREATE ENEMYES IS TEST

        // this.testEnemy = new SmallEnemy(this, 500, 720, 'enemy_1-idle')
        // this.testEnemy.createAnimated('enemy_1-idle', {start: 0, end: 3, first:0}, {
        //     key: 'enemy_1_idle',
        //     frameRate: 5,
        //     repeat: -1
        // })
        // this.testEnemy.createAnimated('enemy_1-hurt', {start: 0, end: 3, first:0}, {
        //     key: 'enemy_1_hurt',
        //     frameRate: 5,
        //     repeat: 0
        // })
        // this.testEnemy.anims.play('enemy_1_idle')
        // this.enemyes = new GameObjects.Group(this)
        // this.enemyes.add(this.testEnemy)  
        }
        

        this.physics.add.collider(this.player, earthLayer);
        this.physics.add.collider(this.player, skyBlockLayer);

        this.physics.add.collider(this.testEnemy, earthLayer);
        this.physics.add.collider(this.testEnemy, skyBlockLayer);

        this.player.pressBtnAttack()
        this.player.animationUpdateAttack(this.enemyes)

        const mainCamera = this.cameras.main;
        mainCamera.zoom = 1.7
        mainCamera.startFollow(this.player, true, 0.4, 0.5,);
        mainCamera.setBounds(0, 0, 2000, 900);

        EventBus.emit('current-scene-ready', this);
    }

    update(): void {

        
        this.player.updateMove()


    }



    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
