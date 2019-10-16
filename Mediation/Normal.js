class Player {
    constructor(name, teamColor) {
        this.name = name // 英雄名称
        this.teamColor = teamColor // 队伍颜色
        this.teammates = [] // 队友列表
        this.enemies = [] // 敌人列表
        this.state = 'alive' // 存活状态
    }
    // 获胜
    win() {
        console.log(`Vicotry! ${this.name}`)
    }
    // 失败
    lose() {
        console.log(`Defeat! ${this.name}`)
    }
    // 死亡方法
    die() {
        // 团灭标志
        let ace_flag = true
        // 设置玩家状态为死亡
        this.state = 'dead'
        // 遍历队友列表，若没有团灭，则还未失败
        for(let i in this.teammates) {
            if (this.teammates[i].state !== 'dead') {
                ace_flag = false
                break
            }
        }
        // 如果已被团灭
        if (ace_flag === true) {
            // 己方失败
            this.lose()
            for(let i in this.teammates) {
                this.teammates[i].lose()
            }
            // 敌方胜利
            for(let i in this.enemies) {
                this.enemies[i].win()
            }
        }
    }
}
// 玩家列表
const Players = []

// 定义一个工厂函数来生成玩家

function playerFactory (name, teamColor) {
    let newPlayer = new Player(name, teamColor)
    // 通知所有玩家 新角色加入
    for(let i in Players) {
        if (Players[i].teamColor === teamColor) {
            Players[i].teammates.push(newPlayer)
            newPlayer.teammates.push(Players[i])
        } else {
            Players[i].enemies.push(newPlayer)
            newPlayer.enemies.push(Players[i])
        }
    }
    Players.push(newPlayer)
    return newPlayer
}

// 开始比赛
// 蓝色方
let hero1 = playerFactory('盖伦', 'Blue')
let hero2 = playerFactory('皇子', 'Blue')
let hero3 = playerFactory('拉克丝', 'Blue')
let hero4 = playerFactory('剑姬', 'Blue')
let hero5 = playerFactory('赵信', 'Blue')

// 红色方
let hero6 = playerFactory('诺手', 'Red')
let hero7 = playerFactory('德莱文', 'Red')
let hero8 = playerFactory('卡特琳娜', 'Red')
let hero9 = playerFactory('乌鸦', 'Red')
let hero10 = playerFactory('赛恩', 'Red')


// 红色方被团灭
hero6.die()
hero7.die()
hero8.die()
hero9.die()
hero10.die()


/* 运行结果:
Defeat! 赛恩
Defeat! 诺手
Defeat! 德莱文
Defeat! 卡特琳娜
Defeat! 乌鸦
Vicotry! 盖伦
Vicotry! 皇子
Vicotry! 拉克丝
Vicotry! 剑姬
Vicotry! 赵信
*/

