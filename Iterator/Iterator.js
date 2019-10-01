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

let array = [1,2,3];

let iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
