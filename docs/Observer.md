# 观察者模式 （发布-订阅模式）

> 观察者模式也称作 发布—订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，依赖于它的对象都将得到通知。在JavaScript开发中，我们一般用事件模型来替代传统的发布—订阅模式。

总的来说，这种模式的实质就是你可以对程序中的某个对象的状态进行观察，并且在其发生改变时能够得到通知。

当前已经有了很多实用观察者模式的例子，例如 `DOM事件绑定`就是一个非常典型的*发布—订阅模式*,还有 Vue.js 框架中的`数据双向绑定`，也利用了*观察者模式*。

所以一般观察者模式有两种角色：

- 观察者 （发布者）
- 被观察者 （订阅者）

下面我们举一个具体的例子，假设有三个报纸出版社，报社一，报社二，报社三，有两个订报人，分别是：订阅者1，订阅者2.此时出版社就是被观察者，订报人就是观察者。

我们先定义`报社类`:

```javascript
// 报社类
class Press {
  constructor(name) {
    this.name = name;
    this.subscribers = []; //此处存放订阅者名单
  }

  deliver(news) {
    let press = this;
    // 循环订阅者名单中所有的订报人，为他们发布内容
    press.subscribers.map(item => {
      item.getNews(news, press); // 向每个订阅者发送新闻
    })
    // 实现链式调用
    return this;
  }
}

```

接着我们定义`订报人类`

```javascript
// 订报人类
class Subscriber {
  constructor(name) {
    this.name = name;
  }

  // 获取新闻
  getNews(news, press) {
    console.log(`${this.name} 获取来自 ${press.name} 的新闻: ${news}`)
  }
  // 订阅方法
  subscribe(press) {
    let sub = this;
    // 避免重复订阅
    if(press.subscribers.indexOf(sub) === -1) {
      press.subscribers.push(sub);
    }
    // 实现链式调用
    return this;
  }

  // 取消订阅方法
  unsubscribe(press) {
    let sub = this;
    press.subscribers = press.subscribers.filter((item) => item !== sub);
    return this;
  }
}
```

之后我们通过实际操作进行演示：

```javascript
let press1 = new Press('报社一')
let press2 = new Press('报社二')
let press3 = new Press('报社三')

let sub1 = new Subscriber('订报人一')
let sub2 = new Subscriber('订报人二')

// 订报人一订阅报社一、二
sub1.subscribe(press1).subscribe(press2);
// 订报人二订阅报社二、三
sub2.subscribe(press2).subscribe(press3);

// 报社一发出新闻
press1.deliver('今天天气晴');
// 订报人一 获取来自 报社一 的新闻: 今天天气晴


// 报社二发出新闻
press2.deliver('今晚12点苹果发布会');
// 订报人一 获取来自 报社二 的新闻: 今晚12点苹果发布会
// 订报人二 获取来自 报社二 的新闻: 今晚12点苹果发布会

// 报社三发出新闻
press3.deliver('报社二即将倒闭，请大家尽快退订');
// 订报人二 获取来自 报社三 的新闻: 报社二即将倒闭，请大家尽快退订

// 订报人二退订
sub2.unsubscribe(press2);

press2.deliver('本报社已倒闭');
// 订报人一 获取来自 报社二 的新闻: 本报社已倒闭
```

上文我们提到了，`Vue.js`的双向绑定的原理是数据劫持和发布订阅，我们可以自己来实现一个简单的数据双向绑定

首先我们需要有一个页面结构

```javascript
<div id="app">
    <h3>数据的双向绑定</h3>
    <div class="cell">
        <div class="text" v-text="myText"></div>
        <input class="input" type="text" v-model="myText" >
  </div>
</div>
```

接着我们创建一个类`aVue`

```javascript
class aVue {
  constructor (options) {
    // 传入的配置参数
    this.options = options;
    // 根元素
    this.$el = document.querySelector(options.el);
    // 数据域
    this.$data = options.data;

    // 保存数据model与view相关的指令，当model改变时，我们会触发其中的指令类更新
    this._directives = {};
    // 数据劫持，重新定义数据的 set 和 get 方法
    this._obverse(this.$data);
    // 解析器，解析模板指令，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者
    // 一旦数据发生变动，收到通知，更新视图
    this._complie(this.$el);
  }
  // 对数据进行处理，重写set和get方法
  _obverse(data) {
    let val;
    // 进行遍历
    for(let key in data) {
      // 判断是否属于自身的属性
      if(data.hasOwnProperty(key)) {
        this._directives[key] = [];
      }

      val = data[key];
      if( typeof val === 'object') {
        // 递归遍历
        this._obverse(val);
      }

      // 初始化当前数据的执行队列
      let _dir = this._directives[key];

      // 重新定义数据的set 和 get 方法
      Object.defineProperty(this.$data, key, {
        // 可枚举的
        enumerable: true,
        // 可改的
        configurable: true,
        get: () => val,
        set: (newVal) => {
          if (val !== newVal) {
            val = newVal;
            // 触发_directives 中绑定的Watcher类更新
            _dir.map(item => {
              item._update();
            })
          }
        }
      })
    }
  }

  // 解析器，绑定节点，添加数据的订阅者，更新视图变化
  _complie(el) {
    // 子元素
    let nodes = el.children;
    for(let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 递归对所有元素进行遍历
      if (node.children.length) {
        this._complie(node);
      }

      // 如果有 v-text 指令， 监控 node 的值，并及时更新
      if (node.hasAttribute('v-text')) {
        let attrValue = node.getAttribute('v-text');
        // 将指令对应的执行方法放入指令集
        this._directives[attrValue].push(new Watcher('text', node, this, attrValue, 'innerHTML'))
      }

      // 如果有 v-model 属性，并且元素是 input 或者 textarea 我们监听input事件
      if( node.hasAttribute('v-model') && ( node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
        let _this = this;
        // 添加input事件
        node.addEventListener('input', (function(){
          let attrValue = node.getAttribute('v-model');
          // 初始化复制
          _this._directives[attrValue].push(new Watcher('input', node, _this, attrValue, 'value'));
          return function () {
            // 后面每次都会更新
            _this.$data[attrValue] = node.value;
          }
        })())
      }
    }
  }
}

```

`_observe`方法处理传入的data，重新改写data的`set`与`get`方法，保证我们可以跟踪到data的变化。

`_compile`方法本质是一个解析器，他通过解析模板指令，将每个指令对应的节点绑定更新函数，并添加监听数据的订阅者，数据发生变化时，就去更新视图变化。

接着我们定义订阅者类

```javascript
class Watcher{
  /*
  * name 指令名称
  * el 指令对应的DOM元素
  * vm 指令所属的aVue实例
  * exp 指令对应的值，本例为"myText"
  * attr 绑定的属性值，本例为"innerHTML"
  */
  constructor(name, el, vm, exp, attr) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.exp = exp;
    this.attr = attr;


    // 更新操作
    this._update();
  }

  _update() {
    this.el[this.attr] = this.vm.$data[this.exp];
  }
}
```

在`_compile`中，我们创建了两个`Watcher`实例，不过这两个对应的`_update`的操作结果不同，对于`div.text`的操作其实是`div.innerHTML = this.data.myText`,对于`input`的操作相当于`input.value = this.data.myText`，这样每次数据进行`set`操作时，我们会触发两个`_update`方法，分别更新`div`和`input`的内容。

![udbfdx.gif](https://s2.ax1x.com/2019/10/02/udbfdx.gif)

Finally，我们成功地实现了一个简单的双向绑定。



> 示例Demo源码可在 [Observer](<https://github.com/Reaper622/JavaScript-DesignPatterns/tree/master/Observer>) 查看

### 总结

- 观察者模式可以使代码解耦合，满足开放封闭原则。
- 当过多地使用观察者模式时，如果订阅消息一直没有触发，但订阅者仍然一直保存在内存中。