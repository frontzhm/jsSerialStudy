var
  http = require("http"),
  url = require("url"),
  fs = require("fs");
// ->创建一个服务(员)
var server1 = http.createServer(function(req, res) {
  var
    urlObj = url.parse(req.url, true),
    pathname = urlObj["pathname"],
    query = urlObj["query"];

  // ->处理静态资源文件的请求(HTML/CSS/JS...),自己扩展mime类型,
  var reg = /\.(HTML/CSS / JS / JSON / TXT / ICO) / i;
if (reg.test(pathname)) {
  var suffix = reg.exec(pathname)[1].toUpperCase();
  // 根据请求文件的后缀名获取到当前文件的MIME类型
  var suffixMIME = "text/plain";
  switch (suffix) {
    case "HTML":
      suffixMIME = "text/html";
      break;
    case "CSS":
      suffixMIME = "text/css";
      break;
    case "JS":
      suffixMIME = "text/javascript";
      break;
    case "JSON":
      suffixMIME = "application/json";
      break;
    case "ICO":
      suffixMIME = "application/octet-stream";
      break;
    case "JSON":
      suffixMIME = "application/json";
      break;
  }
  try {
    // ->按照指定的目录读取文件中的内容或代码(读取出来的内容都是字符串形式的)
    var conFile = fs.readFileSync("." + pathname, "utf-8");
    // 重写响应头信息,告诉客户端的浏览器,我返回的内容是什么MIME类型,指定返回的内容格式是utf-8编码的,返回的中文汉字就不会乱码了.
    res.writeHead(200, { 'content-type': +suffixMIME + ';charset=utf-8' })
      // 服务端向客户端返回的内容应该也是字符串
    res.end(conFile);
  } catch (e) {
    res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8' });
    res.end("request file is not found~")
  }
}
/*
 *  1.MIME类型
    每一种资源文件都有自己的标识类型,eg:HTM文件的MIME类型是"text/html",css的是"text/css",txt是text/plain
    浏览器会按照代码的MIME类型进行渲染
 */
try {
  var con = fs.readFileSync("." + pathname, "utf-8");
  res.end(con);
} catch (e) {
  console.log(e)
  res.end("request file is not found")
}

});
// ->为当前这个服务配置端口(贴胸牌)
server1.listen(1234, function() {
  // 监听成功之后打印
  console.log("server is success, listening on 1234");
}); // 0-65535,默认找80这个服务员
