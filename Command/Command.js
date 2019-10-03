let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let btn3 = document.getElementById('btn3')

// 命令发布者类
class Executor {
    setCommand(btn, command) {
        btn.onclick = function () {
            command.execute()
        }
    }
}       
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

// 定义一个刷新菜单对象的类
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


let menu = new Menu()
let executor = new Executor()

let refreshMenu = new RefreshMenu(menu)

// 给 按钮1 添加刷新功能
executor.setCommand(btn1, refreshMenu)

let addSubMenu = new AddSubMenu(menu)
// 给按钮2添加子菜单功能
executor.setCommand(btn2, addSubMenu)

let deleteMenu = new DeleteMenu(menu)
// 给按钮3添加删除功能
executor.setCommand(btn3, deleteMenu)

