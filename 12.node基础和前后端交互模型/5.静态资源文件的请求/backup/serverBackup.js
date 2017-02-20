var
  http = require("http"),
  url = require("url"),
  fs = require("fs");
// ->创建一个服务(员)
var server1 = http.createServer(function(req, res) {
  // 浏览器输入:localhost:1234,就是向服务器该端口发送请求
  // 返回给客户端的数据
  // res.write("huahua");
  // 一定加end
  // res.end();
  // 解析客户端请求地址中的文件的目录名称以及传递给当前服务器的数据内容
  var
    urlObj = url.parse(req.url, true),
    pathname = urlObj["pathname"],
    query = urlObj["query"];
  // 合并以下三个请求
  // 浏览器天生会发一个favicon的请求
  // 如果客户端请求的资源文件不存在,我们不加try catch服务会终止,这样不好,所以添加try catch 捕获异常信息,这样即使不存在,服务也不会报错
  try {
    var con = fs.readFileSync("." + pathname, "utf-8");
    res.end(con);
  } catch (e) {
    console.log(e)
    res.end("request file is not found")
  }

  /*if (pathname === "/index.html") {
  // node大部分都是异步,但是也可以强制同步
  var con = fs.readFileSync("./index.html", "utf-8");
  // res.write(con);res.end();可以合并到下面一步
  res.end(con);
  return;
}
if (pathname === "/css/index.css") {
  con = fs.readFileSync("./css/index.css", "utf-8");
  res.end(con);
  return;
}
if (pathname === "/js/index.js") {
  con = fs.readFileSync("./js/index.js", "utf-8");
  res.end(con);
  return;
}
*/

});
// ->为当前这个服务配置端口(贴胸牌)
server1.listen(1234, function() {
  // 监听成功之后打印
  console.log("server is success, listening on 1234");
}); // 0-65535,默认找80这个服务员
