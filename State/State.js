// class Light {
//     constructor() {
//         this.state = 'off'; //电灯默认为关闭状态
//         this.button = null;
//     }

//     init() {
//         let button = document.createElement('button');
//         let self = this;
//         button.innerHTML = '我是开关';
//         this.button = document.body.appendChild(button);
//         this.button.onclick = () => {
//             self.buttonWasClicked();
//         }
//     }

//     buttonWasClicked() {
//         if (this.state === 'off') {
//             console.log('开灯');
//             this.state = 'on';
//         } else {
//             console.log('关灯');
//             this.state = 'off';
//         }
//     }
// }

// let light = new Light();
// light.init();



// 定义三个不同的状态类
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

let light = new Light();
light.init();