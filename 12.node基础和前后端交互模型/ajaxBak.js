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
        // =>本次循环获取的方法执行没有出现错误:说明此方法是我想要的,我们下一次直接执行这个小方法即可,这就需要把createXHR重写为小方法(完成之后不需要再判断了,直接退出循环即可),覆盖原方法
        createXHR = curFn;
        break;
      } catch (e) {
        // 出现错误,继续执行下一次循环
        continue;
      }
    }
    if (!flag) {
      throw new Error("your browser is not support ajax,please change your browser,try again!")
    }
    return xhr;
  }
  // ajax:实现ajax请求的公共方法
  // d当一个方法传递参数多且不固定,一般使用统一传值法(把需要传递的参数值都放在一个对象中,一起传递进去即可)
  function ajax(options) {
    // 把需要使用的参数设定一个规则和初始值
    var _default = {
        // 请求的地址
        url: "",
        //请求方式
        type: "get",
        // 请求是同步还是异步
        aync: true,
        // 设置请求回来的内容格式,json就是json格式的对象,"txt"是字符串或json格式的字符串
        dataType: "json",
        // 放在请求主体中的内容
        data: null,
        // 当readystate=2的时候执行的回调方法
        getHead: null,
        // 当readystate=4的时候执行的回调方法
        success: null
      }
      // 使用用户自己传递进来的值覆盖我们的默认值
    for (var key in options) {
      if (options.hasOwnProperty[key]) {
        _default[key] = options[key];
      }
    }
    // 如果当前的请求方式是get,我们需要在url的末尾加随机数
    if (_default.type === "get") {
      if (_default.url.indexOf("?") !== -1) {
        _default.url += "&_=" + Math.random();
      } else {
        _default.url += "?_=" + Math.random();
      }
    }
    var xhr = createXHR();
    xhr.open(_default.type, _default.url, _default.aync);
    xhr.onreadystatechange = function() {
      if (/^2\d{2}$/.test(xhr.status)) {
        // 想要在readystate在2的时候做一些操作,需要保证ajax是异步请求
        if (xhr.readystate === 2) {
          if (typeof _default.getHead === "function") {
            _default.getHead.call(xhr);
          }
        }
        if (xhr.readystate === 4) {
          var val = xhr.responseText;
          // 如果传递的参数值是json,说明获取的内容应该是json格式对象
          if (_default.dataType === "json") {
            // ?
            val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")")
          }
          _default.success && _default.success.call(xhr);
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