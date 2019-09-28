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