interface LoadConfigSpriteSheet {
    key: string,
    amountFrames: Phaser.Types.Animations.GenerateFrameNumbers,
    frames:  Phaser.Types.Animations.Animation
}




export const LOAD_CONFIG_SPRITE_SHEET:LoadConfigSpriteSheet[] = [
    {
        key: 'player-idle',
        amountFrames: {
            start: 0,
            end: 6,
            first:0
        },
        frames: {
            key: 'idle',
            frameRate: 7,
            repeat: -1
        }
    
    },
    {
        key: 'player-run',
        amountFrames: {
            start: 0, end: 7, first:0
        },
        frames: {
            key: 'run', 
            frameRate: 7, 
            repeat: 0
        }
    
    },
    {
        key: 'player-attack_1',
        amountFrames: {
            start: 0, end: 5, first:0
        },
        frames: {
            key: 'attack_1',
            frameRate: 10,
            repeat: 0
        }
    
    },
    {
        key: 'player-attack_2',
        amountFrames: {
            start: 0,
            end: 4,
            first:0
        },
        frames: {
            key: 'attack_2',
            frameRate: 10,
            repeat: 0
        }
    
    },

    {
        key: 'player-attack_3',
        amountFrames: {
            start: 0, end: 5, first:0
        },
        frames: {
            key: 'attack_3',
            frameRate: 10,
            repeat: 0
        }
    
    },



           
]