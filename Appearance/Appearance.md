# 外观模式

> 外观模式为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易，不符合单一职责原则和开放封闭原则。

其实外观模式很常见，它其实就是通过一个单独的函数，来简化对一个或多个更大型，更为复杂的函数的访问，是一种对复杂操作的封装。

### 封装Ajax

初始化一个原生 Ajax 请求其实是复杂的，我们可以通过封装来简化

```javascript
function ajaxCall(type, url, callback, data) {
    let xhr = (function(){
        try {
            // 标准方法
            return new XMLHttpRequest()
        }catch(e){}

        try {
            return new ActiveXObject("Msxm12.XMLHTTP")
        }catch(e){}
    }())
    STATE_LOADED = 4
    STATUS_OK = 200

    // 一但从服务器收到表示成功的相应消息，则执行所给定的回调方法
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== STATE_LOADED) {
            return
        }
        if (xhr.state == STATUS_OK) {
            callback(xhr.responseText)
        }
    }

    // 发出请求
    xhr.open(type.toUpperCase(), url)
    xhr.send(data)
}
```

封装之后，我们发送请求的样子就变成了

```javascript
// 使用封装的方法
ajaxCall("get", "/url/data", function(res) {
    document.write(res)
})
```



#### 总结

​	外观模式适用于当需要同时有多个复杂操作时，通过把复杂操作封装，调用时直接用方法调用，提高代码的可阅读性和可维护性。