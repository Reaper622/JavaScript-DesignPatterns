// 报社类
class Press {
  constructor(name) {
    this.name = name;
    this.subscribers = []; //此处存放订阅者名单
  }

  deliver(news) {
    let press = this;
    // 循环订阅者名单中所有的订报人，为他们发布内容
    press.subscribers.map(item => {
      item.getNews(news, press); // 向每个订阅者发送新闻
    })
    // 实现链式调用
    return this;
  }
}

// 订报人类
class Subscriber {
  constructor(name) {
    this.name = name;
  }

  // 获取新闻
  getNews(news, press) {
    console.log(`${this.name} 获取来自 ${press.name} 的新闻: ${news}`)
  }
  // 订阅方法
  subscribe(press) {
    let sub = this;
    // 避免重复订阅
    if(press.subscribers.indexOf(sub) === -1) {
      press.subscribers.push(sub);
    }
    // 实现链式调用
    return this;
  }

  // 取消订阅方法
  unsubscribe(press) {
    let sub = this;
    press.subscribers = press.subscribers.filter((item) => item !== sub);
    return this;
  }
}

let press1 = new Press('报社一')
let press2 = new Press('报社二')
let press3 = new Press('报社三')

let sub1 = new Subscriber('订报人一')
let sub2 = new Subscriber('订报人二')

// 订报人一订阅报社一、二
sub1.subscribe(press1).subscribe(press2);
// 订报人二订阅报社二、三
sub2.subscribe(press2).subscribe(press3);

// 报社一发出新闻
press1.deliver('今天天气晴');
// 订报人一 获取来自 报社一 的新闻: 今天天气晴


// 报社二发出新闻
press2.deliver('今晚12点苹果发布会');
// 订报人一 获取来自 报社二 的新闻: 今晚12点苹果发布会
// 订报人二 获取来自 报社二 的新闻: 今晚12点苹果发布会

// 报社三发出新闻
press3.deliver('报社二即将倒闭，请大家尽快退订');
// 订报人二 获取来自 报社三 的新闻: 报社二即将倒闭，请大家尽快退订

// 订报人二退订
sub2.unsubscribe(press2);

press2.deliver('本报社已倒闭');
// 订报人一 获取来自 报社二 的新闻: 本报社已倒闭