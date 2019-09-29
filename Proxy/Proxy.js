// // 明星没有经济人 自己买包

// // 定义一个包类
// class Bags {
//   constructor(props) {
//     this.name = props;
//   }
//   getName() {
//     return this.name;
//   }
// }

// // 定义一个明星对象
// class Star {
//   buyBag(bag) {
//     console.log(`买到了一个${bag.getName()}包`);
//   }
// }

// // 创建一个明星实例
// let star = new Star();
// star.buyBag(new Bags('Coach')); //买到了一个Coach包

// // 明星有助理 助理帮忙买包
// // 定义一个包类
// class Bags {
//   constructor(props) {
//     this.name = props;
//   }
//   getName() {
//     return this.name;
//   }
// }

// // 定义一个助理对象
// class Assistant {
//   constructor(props) {
//     this.star = props;
//   }
//   buyBag(bag) {
//     this.star.buyBag(bag);
//   }
// }

// // 定义一个明星对象
// class Star {
//   buyBag(bag) {
//     console.log(`买到了一个${bag.getName()}包`);
//   }
// }



// // 创建一个明星实例
// let star = new Star();
// let assistant = new Assistant(star);
// assistant.buyBag(new Bags('Coach')); //买到了一个Coach包


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
proxyImage.setSrc('http://pic.netbian.com/uploads/allimg/190922/212043-1569158443de0c.jpg')