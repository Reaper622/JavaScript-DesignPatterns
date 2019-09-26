# 工厂模式

工厂模式是用来创建对象的一种设计模式。

它不会暴露创建对象的具体逻辑，而是将逻辑封装在一个函数中，那么这个函数便成为了工厂，同时根据抽象程度的不同分为`简单工厂`、`工厂方法`



### 简单工厂模式

 通过一个工厂创建一种对象类的实力。主要用来创建同一类的对象。

```
// 简单工厂模式
// Pet 类
class Pet {
  // 构造函数
  constructor(props) {
    this.species = props.species;
    this.sound = props.sound;
  }

  // 静态实例创建方法
  static getProps(pet) {
    switch (pet) {
      case 'dog':
        return new Pet({species: 'dog', sound: 'woof'});
      case 'cat':
        return new Pet({species: 'cat', sound: 'meow'});
      case 'bird':
        return new Pet({species: 'bird', sound: 'chirping'});
      }
  }
}

let Adog = Pet.getProps('dog');
console.log(Adog.sound); // woof
let Acat = Pet.getProps('cat');
console.log(Acat.sound); // meow
let Abird = Pet.getProps('bird');
console.log(Abird.sound); // chirping
```

简单工厂让我们只需要传递一个参数给工厂函数即可获取到对应的实例对象，而不需要知道细节，但简单工厂模式只能用于对象数量少，对象创建逻辑不复杂的情况。



### 工厂方法模式

工厂方法模式让我们将创建实例的过程推迟到了*子类*中,这样我们的核心类就变成的抽象类，并且将构造函数和创建者分离，对 new 操作进行了封装。

```
// 工厂方法模式
class Pet {
  constructor(species = '', sound = '') {
    this.species = species;
    this.sound = sound;
  }
}

// 工厂子类
class PetShop extends Pet {
  constructor(species, sound) {
    super(species, sound);
  }
  create(pet) {
    switch (pet) {
      case 'dog':
        return new PetShop('dog','woof');
      case 'cat':
        return new PetShop('cat','meow');
      case 'bird':
        return new PetShop('bird','chirping');
      }
  }
}

let thePetShop = new PetShop();
// 通过创建者的方法进行实例创建
let shopDog = thePetShop.create('dog');
console.log(shopDog.sound); // woof
let shopCat = thePetShop.create('cat');
console.log(shopCat.sound); // meow
let shopBird = thePetShop.create('bird');
console.log(shopBird.sound); // chirping
```

我们可以将工厂方法看做一个实例化对象的工厂，它只做实例化对象这一件事。



### 总结

- 工厂模式将构造函数和创建者分离
- 符合开放封闭原则



