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
            end: 13,
            first:0
        },
        frames: {
            key: 'idle',
            frameRate: 10,
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
            frameRate: 10, 
            repeat: 0
        }
    
    },
    {
        key: 'player-attack_1',
        amountFrames: {
            start: 0, end: 7, first:0
        },
        frames: {
            key: 'attack_1',
            frameRate: 15,
            repeat: 0
        }
    
    },
    {
        key: 'player-attack_2',
        amountFrames: {
            start: 0,
            end: 8,
            first:0
        },
        frames: {
            key: 'attack_2',
            frameRate: 15,
            repeat: 0
        }
    
    },

    {
        key: 'player-attack_3',
        amountFrames: {
            start: 0, end: 10, first:0
        },
        frames: {
            key: 'attack_3',
            frameRate: 15,
            repeat: 0
        }
    
    },



           
]

export const LOAD_CONFIG_SMALLENEMY_SPRITE_SHEET_1:LoadConfigSpriteSheet[] = [
    {
        key: 'Goblin_enemy_IDLE',
        amountFrames: {
            start: 0,
            end: 5,
            first:0
        },
        frames: {
            key: 'goblin-IDLE',
            frameRate: 10,
            repeat: -1
        }
    
    },
    {
        key: 'Goblin_enemy_HIT',
        amountFrames: {
            start: 0,
            end:2,
            first:0
        },
        frames: {
            key: 'goblin-HIT',
            frameRate: 10,
            repeat: 0
        }
    
    },
    {
        key: 'Goblin_enemy_ATTACK',
        amountFrames: {
            start: 0,
            end:4,
            first:0
        },
        frames: {
            key: 'goblin-ATTACK',
            frameRate: 10,
            repeat: 0
        }
    
    },
]
