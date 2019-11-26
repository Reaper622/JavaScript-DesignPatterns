# 原型模式

> 通过原型实例指定创建对象的类型，并且通过拷贝原型来创建新的对象。

在 JavaScript 中，实现原型模式的方法是`Object.create`方法,通过使用现有的对象来提供新创建的对象的`_proto_`。

- 每一个函数数据类型（普通函数，类）都有一个天生自带的属性：`prototype`，并且这个属性是一个对象数据类型的值。
- 并且在prototype上浏览器天生添加了一个构造函数`constructor`，属性值是当前函数（类）本身。
- 每一个对象数据类型叶天生自带一个属性`proto`,属性值是当前实例所属类的原型。

```javascript
var prototype = {
  name: 'Reaper',
  getName: function() {
    return this.name;
  }
}
// 同时注意 Object.create为浅拷贝
var obj = Object.create(prototype, 
  {
    skill: {value: 'FE'}
  }
)

console.log(obj.getName()); //Reaper
console.log(obj.skill); // FE
console.log(obj.__proto__ === prototype); //true

```

prototype 的几种方法

#### 1.Object.create()方法

```
let proto = {a:1}
let propertiesObject = {
  b: {
    value: 2
  }
}

let obj = Object.create(proto, propertiesObject)
console.log(obj.__proto__ === proto); // true
```



#### 2.方法继承

```javascript
// 方法继承
let  proto = function() {}
proto.prototype.excute = function() {}
let child = function() {}

// 让child 继承proto的所有原型方法
child.prototype = new proto()
```

#### 3.函数对Object的默认继承

```javascript
let Foo = function() {}
console.log(Foo.prototype.__proto__ === Object.prototype); // true
```

#### 4.isPrototypeOf

```javascript
prototypeObj.isPrototypeOf(obj)
```



#### 5.instanceof

contructor.prototype是否出现在obj的原型链上

```javascript
obj instanceof contructor
```

#### 6.getPrototypeOf

Object.getPrototypeOf(obj) 方法返回指定对象obj的原型（内部[[Prototype]]属性的值）

```javascript
Object.getPrototypeOf(obj)
```

#### 7.setPrototypeOf

设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null

```javascript
var obj = {}
var prototypeObj = {}
Object.setPrototypeOf(obj, prototypeObj)
console.log(obj.__proto__ === prototypeObj)  // true
```