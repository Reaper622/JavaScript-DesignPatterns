var prototype = {
  name: 'Reaper',
  hobby: {
    love: '123'
  },
  getName: function() {
    return this.name;
  }
}

var obj = Object.create(prototype, 
  {
    skill: {value: 'FE'}
  }
)

console.log(obj.getName()); //Reaper
console.log(obj.skill); // FE
console.log(obj.__proto__ === prototype); //true

Object.create

let proto = {a:1}
let propertiesObject = {
  b: {
    value: 2
  }
}

let obj = Object.create(proto, propertiesObject)
console.log(obj.__proto__ === proto); // true

// 方法继承
let  proto = function() {}
proto.prototype.excute = function() {}
let child = function() {}

// 让child 继承proto的所有原型方法
child.prototype = new proto()

// 所有函数默认继承Object
let Foo = function() {}
console.log(Foo.prototype.__proto__ === Object.prototype); // true

// isPrototypeOf
// prototypeObj 是否在obj的原型链上
prototypeObj.isPrototypeOf(obj)
