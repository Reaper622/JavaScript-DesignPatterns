# 迭代器模式

> 迭代器模式时指模块提供的一种方法去顺序访问一个集合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式也可以把迭代过程从业务逻辑中分离出来，使用迭代器模式后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

其实我们无形中已经使用了不少迭代器模式的功能，例如 JS 中数组的 `map`, 与 `forEach`已经内置了迭代器。

```javascript
[1,2,3].forEach(function(item, index, arr) {
    console.log(item, index, arr);
});
```

同时迭代器分为两种：内部迭代器 与 外部迭代器

- 内部迭代器

> 内部迭代器在调用时非常方便，外界不会去关系其内部的实现。在每次调用时，迭代器的规则就已经制定完毕，如果遇到一些不同样的迭代规则，此时的内部迭代器就不是很清晰

- 外部迭代器

> 外部迭代器会显式地请求迭代下一个元素(`next`方法)，外部迭代器虽然增加了调用的复杂度，但是增强了迭代器的灵活性，我们可以手动地控制迭代过程或者顺序。就像`Generator`函数

### 手写实现一个迭代器

我们可以通过代码实现一个简单的迭代器：

```javascript
// 创建者类
class Creator {
  constructor(list) {
    this.list = list;
  }
  // 创建一个迭代器来进行遍历
  creatIterator() {
    return new Iterator(this);
  }
}

// 迭代器类
class Iterator {
  constructor(creator) {
    this.list = creator.list;
    this.index = 0;
  }

  // 判断是否完成遍历
  isDone() {
    if (this.index >= this.list.length) {
      return true
    }
    return false
  }
  // 向后遍历操作
  next() {
    return this.list[this.index++]
  }
}

let arr = [1,2,3,4];

let creator = new Creator(arr);
let iterator = creator.creatIterator();
console.log(iterator.list) // [1,2,3,4]
while (!iterator.isDone()) {
  console.log(iterator.next()); 
}

// 执行结果为 1,2,3,4
```

### ES6中的迭代器

JavaScript 中的有序数据集合包括：

- Array
- Map
- Set
- String
- typeArray
- arguments
- NodeList

！！ 注意 Object 不属于有序数据集合

以上的有序数据集合都部署`Symbol.iterator`属性，属性值作为一个函数，执行这个函数，返回一个迭代器，迭代器部署`next`方法来按顺序遍历访问子元素

以数组对象为例：

```javascript
let array = [1,2,3];

let iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```



### 总结

- 同时迭代器分为两种：内部迭代器 与 外部迭代器, 内部迭代器操作方便，外部迭代器可控性强。
- 任何部署了`[Symbol.iterator]`接口的数据都可以使用`for of`循环。
- 迭代器模式使目标对象和迭代器对象分离，符合了开放封闭原则。