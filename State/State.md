# 状态模式

> 状态模式允许一个对象在其内部状态改变时改变行为，这个对象看上去像改变了类一样，但其实并没有。状态模式把所研究对象在其内部状态改变时，其行为也随之改变，状态模式需要对每一个系统可能取得的状态创立一个状态类的子类。当系统的状态变化时，系统改变所选的子类。

假设我们此时有一个电灯，在电灯上有个开关，在灯未亮时按下使灯开启，在灯已亮时按下则将灯关闭，此时行为表现时不一样的：

```javascript
class Light {
    constructor() {
        this.state = 'off'; //电灯默认为关闭状态
        this.button = null;
    }

    init() {
        let button = document.createElement('button');
        let self = this;
        button.innerHTML = '我是开关';
        this.button = document.body.appendChild(button);
        this.button.onclick = () => {
            self.buttonWasClicked();
        }
    }

    buttonWasClicked() {
        if (this.state === 'off') {
            console.log('开灯');
            this.state = 'on';
        } else {
            console.log('关灯');
            this.state = 'off';
        }
    }
}

let light = new Light();
light.init();
```

[![uD8U1A.gif](https://s2.ax1x.com/2019/10/04/uD8U1A.gif)](https://imgchr.com/i/uD8U1A)

此时只有两种状态，我们尚且可以不使用状态模式，但当状态较多时，例如，当电灯出现弱光，强光档位时，以上的代码就无法满足需求。

###  ### 使用状态模式重构

状态模式的关键是把每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部，在按钮被按下时，只需要在上下文中，把这个请求委托给当前状态对象即可，该状态对象会负责渲染它自身的行为。

首先定义三种不同状态的类

```javascript
// 灯未开启的状态
class OffLightState {
    constructor(light) {
        this.light = light;
    }

    buttonWasClicked() {
        console.log('切换到弱光模式');
        this.light.setState(this.light.weakLightState);
    }
}

// 弱光状态
class WeakLightState {
    constructor(light) {
        this.light = light;
    }

    buttonWasClicked() {
        console.log('切换到强光模式');
        this.light.setState(this.light.strongLightState);
    }
}

// 强光状态
class StrongLightState {
    constructor(light) {
        this.light = light;
    }

    buttonWasClicked() {
        console.log('关灯');
        this.light.setState(this.light.offLightState);
    }
}
```

接着我们改写 Light 类，在内部通过`curState`记录当前状态

```javascript
class Light {
    constructor() {
        this.offLightState = new OffLightState(this);
        this.weakLightState = new WeakLightState(this);
        this.strongLightState = new StrongLightState(this);
        this.button = null;
    }

    init() {
        let button = document.createElement('button');
        let self = this;
        button.innerHTML = '我是开关';
        this.button = document.body.appendChild(button);
        this.curState = this.offLightState;
        this.button.onclick = () => {
            self.curState.buttonWasClicked();
        }
    }

    setState(state) {
        this.curState = state;
    }
}
```

之后实例化对象后，我们在页面中查看

```javascript
let light = new Light();
light.init();
```



[![uDGh2d.gif](https://s2.ax1x.com/2019/10/04/uDGh2d.gif)](https://imgchr.com/i/uDGh2d)



## 总结

- 状态模式通过定义不同的状态类，根据状态的改变而改变对象的行为。
- 不必把大量的逻辑都写在被操作的对象的类中，很容易增加新的状态。
- 符合开放-封闭原则。