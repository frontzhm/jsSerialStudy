// 导入三个常用的node内置的模块
var
  http = require("http"),
  fs = require("fs"),
  fs = require("fs"),
  // url模块中提供了一个方法,url.parse()用来解析url地址的
  url = require("url");
// 超市相当于服务器,但还是需要服务员才能营业,可能需要很多个服务员(0-65535),并且贴胸牌识别
// 1.http
// http.createServer:创建一个服务(服务员),变量server就是我们创建的服务
// server.listen:为这个服务监听一个端口
// var server = http.createServer()
var server = http.createServer(function(request, response) {
  // 当客户端向服务器端的当前服务发送一个请求,并且当前服务已经成功接收到这个请求后,执行这个回调函数(发送请求类似于买东西)
  // console.log("it is a joke")
  // request:存放的是所有客户端请求的信息,包含客户端通过问号传参的方式传递给服务器的数据内容
  // request.url存放的是客户端请求的文件资源的目录和名称以及传递给服务器服务器端的数据,例如:客户端请求的地址是localhost/index.html?name=huahua&age=8,获取到的是index.html?name=huahua&age=8
  console.log(request.url)
    // response:提供了服务器端向客户端返回内容和数据的方法
    // 重新执行这个文件 地址栏输入localhost/index.html?name=huahua&age=8,会打印出/index.html?name=huahua&age=8
  var urlObj = url.parse(request.url, true),
    pathname = urlObj.pathname,
    query = urlObj.query;
  if (pathname === '/test.html') {
    // ->根据请求的URL地址(具体是根据地址中的pathname)获取到对应的资源文件的源代码
    // fs.readFileSync([path+name],[encode]),同步读取指定文件中的内容,就是文件中的内容读取不完不执行下面的操作,只有都读取出来才会执行后续的操作
    var con = fs.readFileSync("./test.html", "utf-8");
    // response(响应):提供了向客户端返回内容和数据的方法
    // reponse.write向客户端返回内容
    // reponse.end告诉服务器响应结束(一定要加)
    response.write(con)
    response.end()
  }
})

// 80就是胸牌
// server.listen(80)
server.listen(80, function() {
  // 当服务创建成功,且端口号监听成功之后执行
  console.log("server is created sucessfully,listening on 80 port")
});
// node server.js
