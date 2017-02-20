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

  // ->处理静态资源文件的请求(HTML/CSS/JS...),自己扩展mime类型,(谷歌其实不需要这个,但是ie需要)
  // 这就是前端路由:根据客户端请求的东西不一样,返回的东西不一样
  var reg = /\.(HTML|CSS|JS|JSON|TXT|ICO)/i;
if (reg.test(pathname)) {
  var suffix = reg.exec(pathname)[1].toUpperCase();
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
    var conFile = fs.readFileSync("." + pathname, "utf-8");
    res.writeHead(200, { 'content-type': suffixMIME + ';charset=utf-8' })
    res.end(conFile);
  } catch (e) {
    res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8' });
    res.end("request file is not found~")
  }
}

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
