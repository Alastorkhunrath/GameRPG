import { GameObjects, Geom, Scene } from "phaser";



export class Surface extends GameObjects.Rectangle {



    constructor(scene: Scene,x: number, y: number, width: number, height: number, fillColor?: number, fillAlpha?: number){
        super(scene, x, y, width, height, fillColor, fillAlpha)
        scene.add.existing(this)
        scene.physics.add.existing(this, true)
        
        // this.setOrigin(0.5,0)


    } 
}
























