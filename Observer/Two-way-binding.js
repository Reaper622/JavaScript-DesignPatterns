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

// 创建实例
const app = new aVue({
  el: '#app',
  data: {
    myText: 'hello world'
  }
})