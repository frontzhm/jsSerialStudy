var url = require("url");
var str = "http://192.168.0.32:80/index.html?name=huahua&age=7#bbs";
console.log(url.parse(str))
  /* Url{
  	protocol:'http:', 传输协议
  	slashes:true,
  	auth:null,
  	host:'192.168.0.32:80',域名+端口
  	port:'80',
  	hostname:'192.168.0.32',域名(IP)
  	hash:'#bbs',哈希值
  	search:'?name=huahua&age=7',问号+传递进来的数据
  	query:'name=huahua&age=7',传递进来的数据
  	pathname:'/index.html',请求路径及名称
  	path:'index.html?name=huahua&age=7',路径名称+传输的数据
  	href:'http://192.168.0.32:80/index.html?name=huahua&age=7#bbs'
   }
   */
  // 增加true后query中存储的是经过处理解析后的结果,把传递进来的多组数据以键值对的形式
console.log(url.parse(str, true))
  // query:{'name':'huahua',age:'7'}
