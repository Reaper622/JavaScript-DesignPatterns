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