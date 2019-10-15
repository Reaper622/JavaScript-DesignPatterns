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



// 使用封装的方法
ajaxCall("get", "/url/data", function(res) {
    document.write(res)
})