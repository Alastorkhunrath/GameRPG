import { GameObjects, Scene, Time } from "phaser";
import { Player } from "./Player";












export class SmallEnemy extends GameObjects.Sprite {
    health : number = 5
    promiseAttack: boolean = false
    attackedTime: Time.TimerEvent
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, size: number){
        super(scene, x, y, texture);
        this.scene = scene as Scene
        this.setScale(Number((size / this.displayWidth).toFixed(2)))

        console.log(this.displayWidth)
        this.setOrigin(0, 0)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false)

        const body = this.body as Phaser.Physics.Arcade.Body
        
        if (body) {
            body.setGravityY(200)
            body.setBounce(0);
            body.setCollideWorldBounds(true);
            
        }
        
        this.on('animationcomplete-enemy_1_hurt', () => {
            this.anims.play('enemy_1_idle', true);
        });
    }

    static preload(
        scene: Scene,
        key: string, 
        path: string, 
        config?: Phaser.Types.Loader.FileTypes.ImageFrameConfig){   
        scene.load.spritesheet(key, path, config) 
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
                frames: this.scene.anims.generateFrameNumbers(texture, currentFrameConfig),
                frameRate: 7,
                repeat: -1 
            }
            if (config) {
                animationConfig = {...animationConfig, ...config}
            }
            this.scene.anims.create(animationConfig)
        }

    takeDamage(damage: number, direction: boolean){
        const enemyBody = this.body as Phaser.Physics.Arcade.Body
        if(this.health>0) {
            this.health -= damage
            enemyBody.setDragX(800)
            // console.log('direction', direction)
            if (direction) {
                enemyBody.setVelocityX(-400);
                
                
            } else {
                enemyBody.setVelocityX(400);
            }
            
            
        }
        this.anims?.play('enemy_1_hurt')
        console.log(`enemy.health - ${this.health}`)     
    }

    destroy(fromScene?: boolean) {
        if (this.attackedTime) this.attackedTime.destroy();
        super.destroy(fromScene);
    }

    attack(player: Player){
        if (this.promiseAttack) return
        const isTounching = this.scene.physics.overlap(this, player)
        if (isTounching) {
            if (player.health > 0) player.health -= 1
            this.promiseAttack = true

            if (this.attackedTime) this.attackedTime.destroy()
                this.attackedTime = this.scene.time.delayedCall(1000, () => {   
                    this.promiseAttack = false;
            })
        }  
    }


}