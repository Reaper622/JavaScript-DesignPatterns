# 策略模式

> 策略模式就是定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

策略模式的核心是讲算法的使用与算法的实现分离开。

一个策略模式的程序至少要包含两部分：

- 一组策略类，策略类封装了具体的算法，并且负责具体的计算过程
- 环境类，接收客户的请求，随后把请求委托给某一个策略类。要做到这点，说明环境类中要维持对某个策略对象的引用。



### 实现一个策略模式

假设我们要实现一个根据评分来打分的系统

```
// 等级与成绩的映射关系 
const levels = {
  S : 100,
  A : 90,
  B : 80,
  C : 70,
  D : 60
}

// 一组策略
let gradeBaseOnLevel = {
  S: () => {
    return `当前成绩为${levels['S']}`
  },
  A: () => {
    return `当前成绩为${levels['A']}`
  },
  B: () => {
    return `当前成绩为${levels['B']}`
  },
  C: () => {
    return `当前成绩为${levels['C']}`
  },
  D: () => {
    return `当前成绩为${levels['D']}`
  },
}

// 调用方法
function getStudentScore(level) {
  return levels[level] ? gradeBaseOnLevel[level]() : 0;
}

console.log(getStudentScore('S')); // 当前成绩为100
console.log(getStudentScore('A')); // 当前成绩为90
console.log(getStudentScore('B')); // 当前成绩为80
console.log(getStudentScore('C')); // 当前成绩为70
console.log(getStudentScore('D')); // 当前成绩为60
```



### 优缺点

- 优点： 可以有效地避免多重条件语句，将一系列方法封装起来也更直观，利于维护
- 缺点： 往往策略组会比较多，我们需要事先知道所有定义好的情况