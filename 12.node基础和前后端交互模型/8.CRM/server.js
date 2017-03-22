/**
 * Created by Administrator on 2017/3/5.
 */
var
  http = require("http"),
  url = require("url"),
  fs = require("fs");
// 创建服务
var server1 = http.createServer(function(req, res) {
  var
    urlObj = url.parse(req.url, true),
    pathname = urlObj.pathname,
    // 存储的是客户端请求的url地址中问号传参后面的信息(键值对的形式存储的)
    query = urlObj.query;
  // 静态资源文件请求的处理
  var reg = /\.(HTML|CSS|JS|ICO)/i;
  if (reg.test(pathname)) {
    var suffix = reg.exec(pathname)[1].toUpperCase();
    var suffixMIME = "text/html";
    switch (suffix) {
      case "CSS":
        suffixMIME = "text/css";
        break;
      case "JS":
        suffix = "text/javascript";
        break;
    }
    try {
      var conFile = fs.readFileSync("." + pathname, "utf-8");
      res.writeHead(200, { 'content-type': suffixMIME + ';charset=utf-8' });
      res.end(conFile);
    } catch (e) {
      // 文件不存在的情况
      res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8' });
      res.end("file is not found~");
    }
    return;
  }

  // API数据接口的处理
  var
    con = null,
    customPath = "./json/custom.json",
    result = null,
    customId = null;
  // 这里的con是json格式字符串,首先将文件中的内容得到
  con = fs.readFileSync(customPath, "utf-8");
  // 先转化为json对象,但是JSON.parse("")会报错,所以如果是空字符串的话就变成"[]"
  con.length === 0 ? con = "[]" : null;
  con = JSON.parse(con);
  // 1)获取所有的客户信息
  if (pathname === "/getList") {
    // 开始按照api文档准备给客户端返回数据
    // 先给默认没有数据的值,
    result = {
      code: 1,
      msg: "没有任何的客户信息",
      data: null
    };

    if (con.length > 0) {
      result = {
        code: 0,
        msg: "成功",
        data: con
      }
    }
    // 告诉浏览器我们返回的文件格式,让浏览器按照相应的格式显示
    res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    // 返回的数据必须是json字符串
    res.end(JSON.stringify(result));
    return;
  }
  // 2)根据传递进来的客户ID获取某一个具体的客户信息
  if (pathname === "/getInfo") {
    // 把客户端传递进来的id获取到,这里的customId是字符串类型
    customId = query.id;
    result = {
      code: 1,
      msg: "客户不存在",
      data: null
    };
    console.log(customId)
    for (var i = 0; i < con.length; i++) {
      console.log(con[i])
        // 字符串类型和数字类型
      if (con[i]["id"] == customId) {
        result = {
          code: 0,
          msg: "成功",
          data: con[i]
        };
        break;
      }
    }
    // 告诉浏览器我们返回的文件格式,让浏览器按照相应的格式显示
    res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    // 返回的数据必须是json字符串
    res.end(JSON.stringify(result));
    return;
  }

  // 3)根据传递进来的客户ID删除某一个具体的客户信息
  if (pathname === "/removeInfo") {
    customId = query.id;
    console.log(customId)
    console.log(con)
    for (var i = 0; i < con.length; i++) {
      var flag = false;
      if (con[i]["id"] == customId) {
        con.splice(i, 1);
        flag = true;
        break;
      }
    }
    result = {
      code: 1,
      msg: "没有任何的客户信息"
    };
    if (flag) {
      fs.writeFileSync(customPath, JSON.stringify(con), "utf-8");
      result = {
        code: 0,
        msg: "删除成功"
      };
    }
    res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    res.end(JSON.stringify(result));
    return;
  }

  // 4)增加用户信息
  if (pathname === "/addInfo") {

    // 获取客户端通过请求主体传递进来的内容
    var str = ""
      // 所有的事件依然是异步编程
      // 一点点接受客户端传过来的内容
    req.on("data", function(chunk) {
      str += chunk;
    });
    // 客户端的数据接受完毕
    req.on("end", function() {
      console.log(str);
      if (str.length === 0) {
        result = {
          code: 1,
          msg: "增加失败,没有传递任何内容"
        }
        res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
        // 返回的数据必须是json字符串
        res.end(JSON.stringify(result));
        return;
      }
      var data = JSON.parse(str);
      console.log(data)
      // 在现有的data中追加一个id:获取con中最后一项id,新的id是在原有基础上加1即可,判断原先有没有数据
      data["id"] = con.length === 0 ? 1 : parseFloat(con[con.length - 1]["id"]) + 1;
      con[con.length] = data;
      fs.writeFileSync(customPath, JSON.stringify(con), "utf-8");
      result = {
        code: 0,
        msg: "添加成功"
      }
      res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
      res.end(JSON.stringify(result));
      return;
    });
    console.log("我会先执行")
    return;
  }
  // 5)修改用户信息
  if (pathname === "/updateInfo") {
    var str = "";
    req.on("data", function(chunk) {
      str += chunk;
    });
    req.on("end", function() {
      // 什么都没传
      if (str.length === 0) {
        result = {
          code: 1,
          msg: "修改失败,没有传递任何内容"
        }
        res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(result));
        return;
      }
      // 时刻考虑,没有数据的情况
      if (con.length === 0) {
        result = {
          code: 1,
          msg: "用户不存在"
        }
        res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(result));
        return;
      }
      str = JSON.parse(str);
      var hasId = false;
      for (var i = 0; i < con.length; i++) {
        var cur = con[i];
        if (cur["id"] == str["id"]) {
          // 引用数据类型,var obj = {},其实是obj=xx01,xx01里面存的是{}
          // 基本数据类型,var str = "d",str就是"d"
          con[i] = str;
          hasId = true;
          break;

        }
      }
      // 没找到id
      result.msg = "修改失败,修改的用户不存在"
      if (hasId) {
        fs.writeFileSync(customPath, con, "utf-8");
        result = {
          code: 0,
          msg: "修改成功"
        }
      }
      res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
      res.end(JSON.stringify(result));
      return;

    });
    return;
    // 操作在接受数据之后的只能写在回调函数里,因为这里是异步编程  
  }
  // 如果请求的地址不是上述任何一个,则提示不存在
  res.writeHead(404, { "content-type": "text/plain;charset=utf-8" });
  res.end("请求的数据接口不存在");
});

// 监听端口
server1.listen(80, function() {
  console.log("server is success listening on 80 port");
});
// node server.js
