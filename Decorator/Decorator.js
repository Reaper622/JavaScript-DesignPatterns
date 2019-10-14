function decorateSword(target, key, descriptor) {
    // 首先获取到 init 方法
    const initMethod = descriptor.value
    // 宝剑添加攻击力 100 点
    let moreAtk = 100
    let returnObj
    descriptor.value = (...args) => {
        args[0] += moreAtk
        returnObj = initMethod.apply(target, args)
        return returnObj
    }
}

function decorateArmour(target, key, descriptor) {
    // 首先获取到 init 方法
    const initMethod = descriptor.value
    // 护甲添加防御力 100 点
    let moreDef = 100
    let returnObj
    descriptor.value = (...args) => {
        args[1] += moreDef
        returnObj = initMethod.apply(target, args)
        return returnObj
    }
}


class Warrior {
    constructor(atk=50, def=50, hp=100, mp=100) {
        this.init(atk,def,hp,mp)
    }
    @decorateSword
    @decorateArmour
    init(atk, def, hp, mp) {
        this.atk = atk
        this.def = def
        this.hp = hp
        this.mp = mp
    }

    toString() {
        return `攻击力:${this.atk}, 防御力: ${this.def}, 血量: ${this.hp}, 法力值: ${this.mp}`
    }
}


const Reaper = new Warrior()

console.log(`勇者状态 => ${Reaper}`)