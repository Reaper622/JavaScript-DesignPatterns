# 装饰者模式

> 装饰者模式是在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法。
>
> 本章节的示例需要 babel 支持修饰器模式

装饰者模式非常贴合 JavaScript 动态语言的特性，因为我们可以轻易的改变某个对象，但同时，因为函数是`一等公民`，所以我们会避免直接改写某个函数，来保护代码的可维护性和可扩展性。

其实就像我们拍照后添加的`滤镜`，不同的滤镜给照片赋予了不同的意境，这就是装饰者模式，通过滤镜装饰了照片，而并没有修改照片本身就给其添加了功能。

下面来举一个例子：

#### 初始实例

加入此时你是以为勇者 但勇者当前只有初始数值

```javascript
class Warrior {
    constructor(atk=50, def=50, hp=100, mp=100) {
        this.init(atk,def,hp,mp)
    }

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

console.log(`勇者状态 => ${Reaper}`) // 勇者状态 => 攻击力:50, 防御力: 50, 血量: 100, 法力值: 100
```

#### 装饰器的使用

之后我们为勇者配备一把圣剑，创建一个 `decorateSword` 方法，注意这个方法是装饰在`init` 上的

```javascript
// 本质是使用了 Object.defineProperty 方法
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



class Warrior {
    constructor(atk=50, def=50, hp=100, mp=100) {
        this.init(atk,def,hp,mp)
    }
    @decorateSword
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

console.log(`勇者状态 => ${Reaper}`) // 勇者状态 => 攻击力:150, 防御力: 50, 血量: 100, 法力值: 100
```

#### 装饰器的叠加

现在，我们这位勇者的防御力还太低了，我们需要为勇者再增添一个护甲

```typescript

// 省略decorateSword

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

console.log(`勇者状态 => ${Reaper}`) // 勇者状态 => 攻击力:150, 防御力: 150, 血量: 100, 法力值: 100
```

我们成功的让勇者升级了，他终于可以打败大魔王了（没准还是个史莱姆）

### 总结：

装饰者一般也用来实现 AOP （面向切面编程）利用AOP可以对业务逻辑的各个部分进行隔离，也可以隔离业务无关的功能比如日志上报、异常处理等，从而使得业务逻辑各部分之间的耦合度降低，提高业务无关的功能的复用性，也就提高了开发的效率。

装饰者模式与代理模式类似，但代理模式的意图是不直接访问实体，为实体提供一个替代者，实体内定义了关键功能，而代理提供或拒绝对实体的访问，或者一些其他额外的事情。而装饰者模式的作用就是为对象动态地加入行为。

