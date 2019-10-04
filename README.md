# JavaScript-DesignPatterns
JavaScript设计模式的相关学习

## 目录
### 创建型
- [工厂模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Factory/Factory.md)
- [单例模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/SinglePattern/SinglePattern.md)
- [原型模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Prototype/Prototype.md)

### 结构型
- [适配器模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Adapter/Adapter.md)
- [代理模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Proxy/Proxy.md)

### 行为型
- [策略模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Strategy/Strategy.md)
- [迭代器模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Iterator/Itrerator.md)
- [观察者模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Observer/Observer.md)
- [命令模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/Command/Command.md)
- [状态模式](https://github.com/Reaper622/JavaScript-DesignPatterns/blob/master/State/State.md)



## 设计原则

### 单一职责原则 (SRP)

一个对象或者方法只做一件事情，如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。应该把对象或者方法划分成较小的粒度。

### 最少知识原则 (LKP)

一个软件实体应该尽可能少地与其他实体发生相互作用。应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就要尽量不要发生直接的相互联系，可以转交给第三方处理。

### 开放-封闭原则 (OCP) [最终目的]

软件实体（类、模块、函数）等应该是可以扩展的，但不可修改。
当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以通过增加代码，写新方法的方式，而要尽量避免改动程序的源代码，防止影响原系统的稳定性。