# 命令模式

> 在软件系统里，`行为请求者`与`行为实现者`通常呈现一种*紧耦合*，但在某些场合，比如要对行为进行`记录、撤销/重做、事务`等处理时，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如果要将`行为请求者`与`行为实现者`解耦合，我们需要将一组行为抽象为对象，实现二者之间的松耦合，这就是`命令模式`。

我们需要在命令的发布者和接受者之间定义一个命令对象，命令对象会暴露一个统一的借口给命令的发布者而命令的发布者不需要去了解接受者是如何执行命令的，做到了命令发布者和接受者的解耦合。

[![u06DRP.png](https://s2.ax1x.com/2019/10/03/u06DRP.png)](https://imgchr.com/i/u06DRP)

我们下面的例子中一个页面有三个按钮，每个按钮有不同的功能：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>命令模式</title>
</head>
<body>
    <div>
        <button id="btn1">Button1</button>
        <button id="btn2">Button2</button>
        <button id="btn3">Button3/button>
    </div>
    <script src="./Command.js"></script>
</body>
</html>
```

接下来我们定义一个命令发布者（执行者）的类

```javascript
class Executor {
    setCommand(btn, command) {
        btn.onclick = function () {
            command.execute();
        }
    }
}  
```

接着我们定义一个命令接受者，此例中为一个菜单

```javascript
// 定义一个命令接受者
class Menu {
    refresh() {
        console.log('刷新菜单')
    }

    addSubMenu() {
        console.log('增加子菜单')
    }

    deleteMenu() {
        console.log('删除菜单')
    }
}
```

之后我们将Menu的方法执行封装在单独的类中

```js

class RefreshMenu {
    constructor(receiver) {
        // 使命令对象与接受者关联
        this.receiver = receiver
    }
    // 暴露出统一接口给 Excetor
    execute() {
        this.receiver.refresh()
    }
}

// 定义一个接受子菜单的命令对象的类
class AddSubMenu {
    constructor(receiver) {
        // 使命令对象与接受者关联
        this.receiver = receiver
    }

    // 暴露出统一的接口给 Excetor
    execute() {
        this.receiver.addSubMenu()
    }
}

// 定义一个接受删除菜单对象的类
class DeleteMenu {
    constructor(receiver) {
        this.receiver  = receiver
    }

    // 暴露出统一的接口给 Excetor
    execute() {
        this.receiver.deleteMenu()
    }
}

```

之后我们分别实例华不同的对象

```javascript
// 首先获取按钮对象
let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let btn3 = document.getElementById('btn3')

let menu = new Menu()
let executor = new Executor()

let refreshMenu = new RefreshMenu(menu)

// 给 按钮1 添加刷新功能
executor.setCommand(btn1, refreshMenu) // 点击按钮1 显示"刷新菜单"

let addSubMenu = new AddSubMenu(menu)
// 给按钮2添加子菜单功能
executor.setCommand(btn2, addSubMenu)// 点击按钮2 显示"添加子菜单"

let deleteMenu = new DeleteMenu(menu)
// 给按钮3添加删除功能
executor.setCommand(btn3, deleteMenu)// 点击按钮3 显示"删除菜单"

```



#### 总结

- 发布者与接受者实现了解耦合，符合单一职责原则。
- 命令可扩展，对请求可以进行排队或日志记录，符合开放—封闭原则。
- 但额外增加了命令对象，存在一定的多余开销。