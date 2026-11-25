import { EventBus } from '../EventBus';
import { GameObjects, Scene, Math } from 'phaser';

import { LOAD_CONFIG_SPRITE_SHEET, 
        LOAD_CONFIG_SMALLENEMY_SPRITE_SHEET_1
        } from '../configs/animation'

import { Player } from '../entities/Player';
import { Surface } from '../entities/Surface';
import { SmallEnemy } from '../entities/SmallEnemy';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    gameText: Phaser.GameObjects.Text;
    player: Player;
    testEnemy: SmallEnemy;
    surfaces: Surface[];
    enemyes: GameObjects.Group;
    constructor ()
    {
        super('Game');
    }

    init(){
        
    }

    create ()
    {


        this.player = new Player(this, 200, 700, 'player')

        LOAD_CONFIG_SMALLENEMY_SPRITE_SHEET_1.forEach(cfg => {
            this.createAnimated(cfg.key, cfg.amountFrames, cfg.frames)
        });

        LOAD_CONFIG_SPRITE_SHEET.forEach(cfg => {
            this.createAnimated(cfg.key, cfg.amountFrames, cfg.frames)
        });

        this.enemyes = this.add.group({
            classType: SmallEnemy,
            runChildUpdate: true  //включает вызовы метода update у детей
        })




        const map = this.make.tilemap({key: 'testMap',})

        const objLayer = map.getObjectLayer('SpawnSmallEnemy')
        if (!objLayer) {
            throw new Error('Не удалось найти objLayer');
        }
        const sortedObjlayer = objLayer.objects.sort((a,b) => a.id - b.id)
        sortedObjlayer.forEach((obj) => {
            if (obj.name === `SpawnSmallEnemy_${obj.id}`) {
                const testEnemy = new SmallEnemy(
                    {
                        scene:this, 
                        x: obj.x??0, //если undefined то 0
                        y: obj.y??0, 
                        texture: 'enemy_1-idle',
                        playerAttacking: this.player
                    }, 
                    obj.width??0,
                    `goblin_${obj.id}`
                )
               
            this.enemyes.add(testEnemy)
            }
        })

        console.log(this.enemyes)
        
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

        this.physics.add.collider(this.player, earthLayer);
        this.physics.add.collider(this.player, skyBlockLayer);

        this.physics.add.collider(this.enemyes, earthLayer);
        this.physics.add.collider(this.enemyes, skyBlockLayer);

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
        this.enemyes.getChildren().forEach((enemy) => {
            const e = enemy as SmallEnemy
            if (Math.Distance.Between(e.x, e.y, this.player.x, this.player.y) < 100){
                    if (e.x >= this.player.x){
                        e.setFlipX(true)
                    }
                    else {
                        e.setFlipX(false)
                    }                 
                }
        })
    }

    createAnimated(
        texture:string, 
        frameConfig?:Phaser.Types.Animations.GenerateFrameNumbers, 
        config?: Phaser.Types.Animations.Animation)
        {
          
            let currentFrameConfig:Phaser.Types.Animations.GenerateFrameNumbers = {
                start:0, 
                end:1,
                first: 0
            }
            if (frameConfig) currentFrameConfig = {...currentFrameConfig, ...frameConfig}
            let animationConfig: Phaser.Types.Animations.Animation = {
                key: 'idle',
                frames: this.anims.generateFrameNumbers(texture, currentFrameConfig),
                frameRate: 7,
                repeat: -1 
            }
            if (config) {
                animationConfig = {...animationConfig, ...config}
            }
            this.anims.create(animationConfig)
        }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
