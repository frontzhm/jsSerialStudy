/**
 * Created by Administrator on 2017/3/5.
 */
var
  http = require("http"),
  url = require("url"),
  fs = require("fs");
// 创建服务
var server1 = http.createServer(function (req, res) {
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
      res.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8'});
      res.end(conFile);
    } catch (e) {
      // 文件不存在的情况
      res.writeHead(404, {'content-type': 'text/plain;charset=utf-8'});
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
  con = fs.readFileSync(customPath,"utf-8");
  // 先转化为json对象,但是JSON.parse("")会报错,所以如果是空字符串的话就变成"[]"
  con.length === 0?con = "[]":null;
  con = JSON.parse(con);
  // 1)获取所有的客户信息
  if (pathname === "/getList") {
    // 开始按照api文档准备给客户端返回数据
    // 先给默认没有数据的值,
    result = {
      code:1,
      msg:"没有任何的客户信息",
      data:null
    };

    if(con.length > 0){
      result = {
        code:0,
        msg:"成功",
        data:con
      }
    }
    // 告诉浏览器我们返回的文件格式,让浏览器按照相应的格式显示
    res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
    // 返回的数据必须是json字符串
    res.end(JSON.stringify(result));
    return;
  }
  // 2)根据传递进来的客户ID获取某一个具体的客户信息
  if(pathname === "/getInfo"){
    // 把客户端传递进来的id获取到,这里的customId是字符串类型
    customId =  query.id;
    result = {
      code:1,
      msg:"客户不存在",
      data:null
    };
    console.log(customId)
    for(var i = 0;i < con.length;i++){
      console.log(con[i])
      // 字符串类型和数字类型
      if(con[i]["id"] == customId){
        result = {
          code:0,
          msg:"成功",
          data:con[i]
        };
        break;
      }
    }
    // 告诉浏览器我们返回的文件格式,让浏览器按照相应的格式显示
    res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
    // 返回的数据必须是json字符串
    res.end(JSON.stringify(result));
    return;
  }

});

// 监听端口
server1.listen(80,function () {
  console.log("server is success listening on 80 port");
});
// node server.js