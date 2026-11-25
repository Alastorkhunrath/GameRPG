import { GameObjects, Scene, Time, Animations } from "phaser";
import { SmallEnemy } from "./SmallEnemy";

interface MovementKeys {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
}

export class Player extends GameObjects.Sprite{
    scene: Scene;
    keysMove: MovementKeys;
    keyImage: string
    health: number = 3

    isAttacking: boolean = false
    amountAttack: number = 0
    attackedTime: Time.TimerEvent
    power: number = 1
    hitRegistered: boolean = false
    direction: boolean = false
    body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string ){
        super(scene, x, y, texture);

        const widthFrame = 37
        const heightFrame = 37


        this.keyImage = texture 

        console.log(this)
        this.scene = scene as Scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false)
        
        this.body = this.body as Phaser.Physics.Arcade.Body
        
        if (this.body){
            // this.body.setOffset(this.width, this.height)
            this.body.setSize(widthFrame-20, heightFrame, false);
            this.body.setOffset((heightFrame-20)/2, 0)
            this.body.setGravityY(800)
            
        }

        this.setOrigin(0.5,0.5)
        this.setScale(1)
        this.keysMove = this.scene.input.keyboard?.addKeys('W,A,S,D,SPACE') as MovementKeys

        this.on('animationcomplete-attack_1', () => {
            this.isAttacking = false;
            this.body.setSize(widthFrame-20, heightFrame, false);
            this.body.setOffset((heightFrame-20)/2, 0)
            
            this.anims.play('idle', true);
            
        });
        this.on('animationcomplete-attack_2', () => {
            this.isAttacking = false;
            this.body.setSize(widthFrame-20, heightFrame, false);
            this.body.setOffset((heightFrame-20)/2, 0)
            this.anims.play('idle', true);
           
        });
        this.on('animationcomplete-attack_3', () => {

            this.amountAttack = 0
            this.isAttacking = false;
            this.body.setSize(widthFrame-20, heightFrame, false);
            this.body.setOffset((heightFrame-20)/2, 0)
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
                
                if (!this.hitRegistered){
                    this.dealDamage(enemyes)
                    this.hitRegistered = true
                }
                
            }
            else if (anim.key === 'attack_2' && frame.index === 4){
                if (!this.hitRegistered){
                    this.dealDamage(enemyes)
                    this.hitRegistered = true
                }
            }
            else if (anim.key === 'attack_3' && frame.index === 5){
                if (!this.hitRegistered){
                    this.dealDamage(enemyes)
                    this.hitRegistered = true
                }
            }
        });
    }

    dealDamage(enemyes: GameObjects.Group){
        this.scene.physics.overlap(this, enemyes, (player, enemy) => {
            const e = enemy as SmallEnemy
            const p = player as Player
            e.takeDamage(p.power, this.direction)
        })

    }

    pressBtnAttack(){
        
        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keydown-SPACE', () => {
                this.attack()

            }, this)
            }
    }

    updateMove(){
        const body = this.body as Phaser.Physics.Arcade.Body
        if (!body) return  
        if (!this.isAttacking) {
            if (this.keysMove.W.isDown && body.blocked.down){
                body.setVelocityY(-290)
             }

             if (this.keysMove.D.isDown){
                    
                    body.setVelocityX(110)

                    this.flipX = false
                    this.direction = this.flipX
                    // body.setOffset(20,0) 
                    this.anims?.play('run', true)
             }
             else if (this.keysMove.A.isDown){
                    body.setVelocityX(-110)
                    this.flipX = true
                    this.direction = this.flipX
                    // body.setOffset(15,0)
                 this.anims?.play('run', true)

             }
             else{
                body.setVelocityX(0)
                this.anims?.play('idle', true)
             }
        }

    }

    attack(){

        const body = this.body as Phaser.Physics.Arcade.Body
        
        if (this.isAttacking) return; 
        body?.setVelocityX(0)

        this.hitRegistered = false;
        this.isAttacking = true;
        
        this.amountAttack = (this.amountAttack % 3) + 1;
        if (this.amountAttack === 1) {
            body.setSize(60, 37, false);
            this.anims?.play('attack_1', true);
        }
        else if (this.amountAttack === 2) {
            body.setSize(62, 37, false);
            this.anims?.play('attack_2', true);
        }
        else if (this.amountAttack === 3) {
            body.setSize(62, 51, false);
            this.anims?.play('attack_3', true);}
        if (this.attackedTime) this.attackedTime.destroy()
            
        this.attackedTime = this.scene.time.delayedCall(2000, () => {   
            this.amountAttack = 0;
            this.isAttacking = false
        })
        
    }
    


}




// export const player = new Player(Scene, 200, 700, 'player')