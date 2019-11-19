# 单例模式

> 单例模式的核心思想是：保证一个类仅有一个实例，并提供一个访问它的全局访问点

JavaScript 的单例模式不同于面向对象的应用，而在实际的开发中却有很多用途，例如提高页面性能，避免不必要的DOM操作。例如在我们点击登录后出现的登录浮窗，无论点击多少次登录按钮，这个浮窗都只会被创建一次。这里就可以用惰性单例模式来创建。

> 惰性单例是值在需要的时候才创建对象实例。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Single Pattern</title>
</head>
<body>
  <button id="btn">点我登录</button>
  <script>
    class Login {
      createLayout() {
        console.log('invoked')
        let theDiv = document.createElement('div');
        theDiv.innerHTML = '我是浮窗'
        document.body.appendChild(theDiv)
        theDiv.style.display = 'none'
        return theDiv
      }
    }
    class Single {
      getSingle(fn) {
        let result;
        return function () {
          return result || (result = fn.apply(this, arguments))
        }
      }
    }

    let theBtn = document.getElementById('btn')
    let single = new Single()
    let login = new Login()
    // 由于闭包， createLoginLayer 对 result 的引用， 所以当single.getSingle 函数执行完之后，内存中并不会销毁 result
    // 之后点击按钮是，根据 createLoginLayer 函数的作用域链中已经存在result，所以直接返回result
    let createLoginLayer = single.getSingle(login.createLayout)
    theBtn.onclick= function() {
      let layout = createLoginLayer()
      layout.style.display = 'block'
    }
  </script>
</body>
</html>
```

此时我们可以连续点击登录按钮，但 `invoked`只会输出一次，代表着实例只创建了一次并且之后使用的都是唯一的那个实例。



### 总结

- 单例模式的主要思想： 实例已经创建，就直接返回，反之，则创建新的实例。
- 符合开放封闭原则。

