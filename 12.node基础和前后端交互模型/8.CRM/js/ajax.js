(function() {
  // 创建ajax对象,兼容所有浏览器
  function createXHR() {
    var xhr = null,
      flag = false;
    var ary = [
      function() {
        return new XMLHttpRequest;
      },
      function() {
        return new ActiveXObject("Microsoft.XMLHttp");
      },
      function() {
        return new ActiveXObject("Msxml2.XMLHttp");
      },
      function() {
        return new ActiveXObject("Msxml3.XMLHttp");
      }
    ];
    for (var i = 0; i < ary.length; i++) {
      var curFn = ary[i];
      try {
        xhr = curFn();
        flag = true;
        createXHR = curFn;
        break;
      } catch (e) {
        continue;
      }
    }
    if (!flag) {
      throw new Error("your browser is not support ajax,please change your browser,try again!")
    }
    return xhr;
  }
  function ajax(options) {
    var _default = {
        url: "",
        type: "get",
        async: true,
        dataType: "json",
        data: null,
        getHead: null,
        success: null
      }
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        _default[key] = options[key];
      }
    }
    if (_default.type === "get") {
      if (_default.url.indexOf("?") !== -1) {
        _default.url += "&_=" + Math.random();
      } else {
        _default.url += "?_=" + Math.random();
      }
    }
    var xhr = createXHR();
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function() {
      if (/^2\d{2}$/.test(xhr.status)) {
        if (xhr.readystate === 2) {
          if (typeof _default.getHead === "function") {
            _default.getHead.call(xhr);
          }
        }
        if (xhr.readyState === 4) {
          var val = xhr.responseText;
          if (_default.dataType === "json") {
            // ?
            val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
          }
          _default.success && _default.success.call(xhr,val);
        }
      }
    }
    xhr.send(_default.data);
  }
  window.ajax = ajax;
})()


/**
使用:ajax({
  url:"data.txt",
  dataType:"json",
  getHead:function(){
    // this:当前的xhr对象
  },
  success:function(){
    // this:当前的xhr对象
    // data:我们从服务器获取的主体内容
  }
})
*/