# 适配器模式

> 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎么实现的，也不考虑他们将来会如何演化。适配器模式不需要改变当前已有的接口，就能让他们协同作用。

适配器的别名也叫包装器(wrapper)，这是一个并不复杂的模式，在日常开发中有许多这样的场景：例如当我们试图调用某个模块或者某个对象的接口时，却发现这个接口的格式并不符合目前的需求，这时就有两种解决方法，第一种使我们直接修改原来的接口实现，但如果原来的模块或者对象很复杂，亦或是我们拿到的已经是已压缩过的代码，那么去修改原接口就显得不现实了。第二种方法就是我们要讲到的适配器，将原接口转换成你希望拿到的接口，而你只需要通过适配器即可得到，并不需要去修改原模块或对象。

举一个抽象的例子，例如当我们有两台电脑需要充电：

```javascript
class ThinkPad {
  charge() {
    console.log('ThinkPad 开始充电');
  }
}


class MacBook {
  charge() {
    console.log('MacBook 开始充电')
  }
}
// 电源充电
function PowerToCharge(laptop) {
  if(laptop.charge instanceof Function) {
    laptop.charge()
  }
}

PowerToCharge(new ThinkPad()) // ThinkPad开始充电
PowerToCharge(new MacBook()) // MacBook开始充电
```

但是如果MacBook不能直接用一种电源接口充电，可能我们就需要一种转接器，这里也就使用的适配器模式，我们不能直接更改电脑上的接口，但我们可以通过一层转接（封装），来实现充电

```javascript
class ThinkPad {
  charge() {
    console.log('ThinkPad 开始充电');
  }
}


class MacBook {
  type_cCharge() {
    console.log('MacBook 开始充电')
  }
}

// 定义适配器类，来实现对MacBook的转接
class TypeCToDp {
  charge() {
    let macbook = new MacBook();
    return macbook.type_cCharge()
  }
}
// 电源充电
function PowerToCharge(laptop) {
  if(laptop.charge instanceof Function) {
    laptop.charge()
  }
}

PowerToCharge(new ThinkPad()) // ThinkPad开始充电
PowerToCharge(new TypeCToDp()) // MacBook开始充电
```



#### 总结

- 适配器模式虽然是一种相对简单的模式，但适配器在JS或者BFF层使用的场景很多。
- 但同时，我们要意识到适配器模式其实一种补救措施，它用来解决的是一些古老不可维护或者已经在稳定版本的两个接口不兼容的问题，而在开发初期应该减少或者不使用这种模式，而是要规划好接口的一致性。
- 适配器不会改变原有的接口，而是一个对象对另一个对象的包装。
- 适配器模式符合开放封闭原则。