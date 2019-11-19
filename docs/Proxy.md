# 代理模式

> 代理模式是为一个对象提供一个代用品或者占位符，以便控制对它的访问。

代理模式是一种极为有趣的模式，生活中我们可以找到很多代理模式的场景。比如明星的经纪人，一般的商业活动不会直接跟明星接触，而是和经纪人谈，经纪人会把工作内容和报酬谈好之后在交给明星。

### 代理模式的简单实现

下面我们用一个明星买包的例子来解释下代理

 当明星没有经济人 自己买包

```javascript
// 定义一个包类
class Bags {
  constructor(props) {
    this.name = props;
  }
  getName() {
    return this.name;
  }
}

// 定义一个明星对象
class Star {
  buyBag(bag) {
    console.log(`买到了一个${bag.getName()}包`);
  }
}

// 创建一个明星实例
let star = new Star();
star.buyBag(new Bags('Coach')); //买到了一个Coach包
```

当明星让自己的助理去买包

```javascript
// 定义一个包类
class Bags {
  constructor(props) {
    this.name = props;
  }
  getName() {
    return this.name;
  }
}

// 定义一个助理对象
class Assistant {
  constructor(props) {
    this.star = props;
  }
  buyBag(bag) {
    this.star.buyBag(bag);
  }
}

// 定义一个明星对象
class Star {
  buyBag(bag) {
    console.log(`买到了一个${bag.getName()}包`);
  }
}



// 创建一个明星实例
let star = new Star();
let assistant = new Assistant(star);
assistant.buyBag(new Bags('Coach')); //买到了一个Coach包
```

此时我们就实现了一个简单的代理模式，但一般我们不会在这么简单的场景使用代理，反而徒增了代码的复杂度。



### 代理的使用场景

图片的懒加载是前端中比较会用到代理模式的场景，当网络不好的时候，图片的加载需要一段时间，这就会产生空白，影响用户体验，这时候在图片真正加载完之前，使用一张loading占位图片，等图片真正加载完在设置`src`属性，来实现图片的懒加载。

```javascript
class ABigImage {
  constructor() {
    this.img = new Image();
    document.body.appendChild(this.img);
  }
  setSrc(src) {
    this.img.src = src;
  }
}

class ProxyImage {
  constructor() {
    this.proxyImage = new Image();
  }

  setSrc(src) {
    let bigImageObj = new ABigImage();
    bigImageObj.img.src = './local.png'; // 低清晰度图片url 或者本地图片
    this.proxyImage.src = src;
    this.proxyImage.onload = function() {
      bigImageObj.img.src = src;
    }
  }
}

var proxyImage = new ProxyImage();
proxyImage.setSrc('图片Url')
```

在演示中我们可以感受到 （启用chrome的 Network 中的 Disable cache 并设置网速为 slow 3G 会让我们有更直观的感受）

![uG2uWQ.gif](https://s2.ax1x.com/2019/09/29/uG2uWQ.gif)

到这里图片的预加载已经实现，并且当我们的网速非常好，已经达到可以取消图片预加载的一些问题，那么我们可以直接使用`ABigImage`的`setSrc`方法，并且删除代理类，这样我们根本就不许要改动本体代码，这是易于维护的。

```
// 网速很快时
let aImage = new ABigImage();
aImage.setSrc('图片url')
```

#### 总结

- 代理模式符合开放封闭原则。
- 代理模式会让代码易于维护。
- 本体对象一般和代理对象拥有相同的方法，所以使用者并不知道请求的是本体对象还是代理对象。



> 本例中所有的例子均可在 [Demo](<https://github.com/Reaper622/JavaScript-DesignPatterns/tree/master/Proxy>)查看

