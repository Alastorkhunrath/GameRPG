import { GameObjects, Scene, Time, Animations } from "phaser";
import { Player } from "./Player";
import type { SmallEnemyConfigs } from "../types/entities";


export class SmallEnemy extends GameObjects.Sprite {
    health : number = 5
    timeAttack: number = 1000
    hitRegistered: boolean = false
    attackedTime?: Time.TimerEvent
    playerAttacking: Player
    constructor({scene, x, y, texture, playerAttacking }: SmallEnemyConfigs, size?: number, enemyType?: string){
        super(scene, x, y, texture);
        this.playerAttacking = playerAttacking
        this.scene = scene as Scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false)

        this.setData('type', enemyType??'0');
        this.setOrigin(0, 0)
        this.flipX = true

        const body = this.body as Phaser.Physics.Arcade.Body

        if (body) {
            body.setSize(26, 25, false)
            body.setGravityY(200)
            body.setBounce(0);
            body.setCollideWorldBounds(true);
            
        }

        this.anims?.play('goblin-IDLE', true);
        this.on('animationcomplete', (anim: Animations.Animation) => {
            if (anim.key === 'goblin-HIT' || anim.key === 'goblin-ATTACK') {
                this.anims.play('goblin-IDLE', true);
            }
        });

        this.on('animationupdate', (anim: Animations.Animation, frame: Animations.AnimationFrame) => {
            if (anim.key === 'goblin-ATTACK' && frame.index === 5) {
                    this.playerAttacking.health -= 1
                    if (!this.hitRegistered){
                        this.hitRegistered = true
                    }
                    console.log(this.playerAttacking, 'получил урон, текущее здоровье', this.playerAttacking.health)
            }
        })
    }

    get getEnemyType():string{
        return this.getData('type')
    }

    static preload(
        scene: Scene,
        key: string, 
        path: string, 
        config?: Phaser.Types.Loader.FileTypes.ImageFrameConfig){   
        scene.load.spritesheet(key, path, config) 
    }

    takeDamage(damage: number, direction: boolean){
        const enemyBody = this.body as Phaser.Physics.Arcade.Body
        if(this.health>0) {
            this.health -= damage
            enemyBody.setDragX(800)
            if (direction) {
                enemyBody.setVelocityX(-400);
            } else {
                enemyBody.setVelocityX(400);
            }
        }
        this.anims?.play('goblin-HIT')
        if (this.health <= 0) this.destroy(true);
        console.log(`enemy.health - ${this.health}`)
        return     
    }

    destroy(fromScene?: boolean) {
        if (this.attackedTime) this.attackedTime.destroy();
        super.destroy(fromScene);
        console.log('His DEAD!')
    }

    attack(){
        if (this.hitRegistered) return
        const isTounching = this.scene.physics.overlap(this, this.playerAttacking)
        if (isTounching) {

            this.hitRegistered = true
            if (this.attackedTime) {
                this.attackedTime.destroy()
            }
            this.attackedTime = this.scene.time.delayedCall(1000, () => {   
                const stillTouching = this.scene.physics.overlap(this, this.playerAttacking);
                if (this.playerAttacking.health > 0 && stillTouching) {
                    this.anims?.play('goblin-ATTACK', true)
                }
                this.hitRegistered = false;
                this.attackedTime = undefined; 
            })
        }  
        else {
            if (this.attackedTime) {
                this.attackedTime.destroy()
                this.attackedTime = undefined;
                console.log('Удалили', this.attackedTime)
            }
            this.hitRegistered = false;
        }
    }

    update(): void{
        if (!(this.scene instanceof Scene)) return;
        const player = this.playerAttacking;
        if (!player) return
        this.attack()
    }

}