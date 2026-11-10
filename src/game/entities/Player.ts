import { GameObjects, Scene, Time, Animations } from "phaser";
import { SmallEnemy } from "./SmallEnemy";

interface MovementKeys {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
}


export class Player extends GameObjects.Sprite{
    scene: Scene;
    keysMove: MovementKeys;

    health: number = 3

    isAttacking: boolean = false
    amountAttack: number = 0
    attackedTime: Time.TimerEvent
    power: number = 1
    promiseAttack: boolean = false

    direction: boolean = false



    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture);

        this.keyImage = texture

        this.scene = scene as Scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false)
        
        const body = this.body as Phaser.Physics.Arcade.Body
        
        if (body){
            const body = this.body as Phaser.Physics.Arcade.Body;
            console.log(this.frame)
            body.setSize(this.frame.width - 10, this.frame.height+5, true);
            
            body.setGravityY(800)
        }

        this.setOrigin(0.5,0)
        this.setScale(1)
        this.keysMove = this.scene.input.keyboard?.addKeys('W,A,S,D,SPACE') as MovementKeys
        console.log(this.keysMove)

        this.on('animationcomplete-attack_1', () => {
            this.isAttacking = false;
            body.setOffset(10,0)
            this.anims.play('idle', true);
            
        });
        this.on('animationcomplete-attack_2', () => {
            this.isAttacking = false;
            body.setOffset(10,0)
            this.anims.play('idle', true);
           
        });
        this.on('animationcomplete-attack_3', () => {

            this.amountAttack = 0
            this.isAttacking = false;
            body.setOffset(10,0)
            this.anims.play('idle', true);
        });


    }

    static preload(
        scene: Scene,
        key: string, 
        path: string, 
        config?: Phaser.Types.Loader.FileTypes.ImageFrameConfig){   
        scene.load.spritesheet(key, path, config) 
    }


    animationUpdateAttack(enemyes: GameObjects.Group){
        this.on('animationupdate', (anim: Animations.Animation, frame: Animations.AnimationFrame) => {
            if (anim.key === 'attack_1' && frame.index === 5) {
                
                if (!this.promiseAttack){
                    this.dealDamage(enemyes)
                    this.promiseAttack = true
                }
                
            }
            else if (anim.key === 'attack_2' && frame.index === 3){
                if (!this.promiseAttack){
                    this.dealDamage(enemyes)
                    this.promiseAttack = true
                }
            }
            else if (anim.key === 'attack_3' && frame.index === 3){
                if (!this.promiseAttack){
                    this.dealDamage(enemyes)
                    this.promiseAttack = true
                }
            }
        });
    }



    dealDamage(enemyes: GameObjects.Group){
        this.scene.physics.overlap(this, enemyes, (player, enemy) => {
            const e = enemy as SmallEnemy
            const p = player as Player
            // const direction = e.flipX
            e.takeDamage(p.power, this.direction)
        })

    }

    pressBtnAttack(){
        
        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keydown-SPACE', () => {
                this.attack()
                console.log('direction', this.direction)

            }, this)
            }
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
    updateMove(){
        const body = this.body as Phaser.Physics.Arcade.Body

        if (!body) return  



        if (!this.isAttacking) {
            if (this.keysMove.W.isDown && body.blocked.down){
                
                body.setVelocityY(-280)
                console.log('SPACE')
                // this.anims?.play('run', true)
             }

             if (this.keysMove.D.isDown){
                    body.setVelocityX(110)
                    this.flipX = false

                    this.direction = this.flipX
                    body.setOffset(20,0) 
                    this.anims?.play('run', true)
                 
             }
     
             else if (this.keysMove.A.isDown){
               
                    body.setVelocityX(-110)
                    this.flipX = true
                    this.direction = this.flipX
                    body.setOffset(15,0)
                 this.anims?.play('run', true)

             }
             else{
                body.setVelocityX(0)
                this.anims?.play('idle', true)

                if (this.flipX){
                    body.setOffset(15,0)
                } else {
                    body.setOffset(20,0)
                }

             }
        }

       


        
    }

    attack(){

        const body = this.body as Phaser.Physics.Arcade.Body
        
        if (this.isAttacking) return; 
        // console.log('Attack')
        body?.setVelocityX(0)

        this.promiseAttack = false;
        this.isAttacking = true;
        
        this.amountAttack = (this.amountAttack % 3) + 1;
        if (this.amountAttack === 1) this.anims?.play('attack_1', true);
        else if (this.amountAttack === 2) this.anims?.play('attack_2', true);
        else if (this.amountAttack === 3) this.anims?.play('attack_3', true);
        // console.log(this.amountAttack)
        if (this.attackedTime) this.attackedTime.destroy()

        this.attackedTime = this.scene.time.delayedCall(2000, () => {   
            this.amountAttack = 0;
        })
        
    }
    


}