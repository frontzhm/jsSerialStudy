// 使用惰性思想(js高阶编程技巧之一),来封装常用的方法库,第一次赋值的时候,就把兼容处理好了,把最后的结果放在flag里,以后的每一个方法直接用即可不需再判断
var utils = (function () {
  // listToArray formatJSON getCss offset win children
  var flag = "getComputedStyle" in window;
  // flag true是现代浏览器 不是是ie6-8的低级浏览器
  // 方法可以在外面写 里面有返回值即可


  function zfindAndReplace(str, reg, oldarr, newarr) {
    str = str.replace(reg, function () {
      try {
        return newarr[oldarr.indexOf(arguments[0])];
      } catch (e) {
        Array.prototype.zindexOf = function (findStr) {
          for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] === findStr) {
              return i;
            }
          }
        }
        return newarr[oldarr.zindexOf(arguments[0])];
      }
    })
    return str;
  }

  /**
   var oldarr = ["A", "B", "C", "D", "E"];
   var newarr = ["a", "b", "c", "d", "e"];
   var str = "ABCDADEC";
   console.log(findAndReplace(str, /\w/g, oldarr, newarr)) // abcdadec
   */
  function zlistToArray(likeArray) {
    // var arr = [];
    // try {
    //   arr = Array.prototype.slice.call(likeArray);
    // } catch (e) {
    //   for (var i = 0, l = likeArray.length; i < l; i++) {
    //     arr[arr.length] = likeArray[i];
    //   }
    // }
    if (flag) {
      return Array.prototype.slice.call(likeArray);
    } else {
      var arr = [];
      for (var i = 0, l = likeArray.length; i < l; i++) {
        arr[arr.length] = likeArray[i];
      }
    }
    return arr;
  }

  function zjsonParse(str) {
    // try{
    //  return JSON.parse(str);
    // }catch(e){
    //  return eval("("+str+")");
    // }
    // return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    return flag ? JSON.parse(str) : eval("(" + str + ")");
  }

  // 检测属性是不是公共属性 
  function zhasPublicProperty(obj, prop) {
    // 首先必须是属于对象的属性 然后不是对象的私有属性
    return (prop in obj) && !obj.hasOwnProperty(prop)
  }

  // 数组去掉重复的
  // 思路:
  // 1.建立一个空对象
  // 2.从数组的第一个数开始,数组的项给对象的键值对,对象的键值相等
  // 3.数组的每项和对象相应的键比较,如果对象有obj[23]=23;如在遇到数组有23 那么检测到obj[23]已经存在

  function zunique(arr) {
    var obj = {};
    for (var i = 0, l = arr.length; i < l; i++) {
      var cur = arr[i];
      if (obj[cur] === cur) {
        arr[i] = arr[l - 1];
        arr.length--;
        i--;
      }
      obj[cur] = cur;
    }
    obj = null;
    return arr;
  }

  // 检测类型
  function ztypeof(para) {
    if (typeof para === "undefined") {
      return "undefined"
    }
    if (typeof para === "null") {
      return "null"
    }
    return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
  }


  // 在标准的ie8浏览器中 我们使用offsetLeft就已经把父级的边框算进去了,就不需要我们自己加边框
  // 1.如果不定位的话 那么offsetParent 永远是body body的offsetParent是null

  // 2.如果定位的话
  // 谁定位absolute ,relative fixed,其子元素的offsetParent会变成谁
  // 特殊情况:谁定位fixed ,其offsetParent会变成null 其他的都是上级(比如body)
  // offset()等同于jQuery的offset(),求任意元素离body的偏移,左偏移上偏移(不管当前元素的父级参照物是谁) 
  // 获取的结果是一个对象 left距离body的左偏移 top..
  function offset(selector) {
    var par = selector.offsetParent,
      top = selector.offsetTop,
      left = selector.offsetLeft;
    while (par !== null) {
      // top+=par.clientTop+par.offsetTop;
      // left+=par.clientLeft+par.offsetLeft;

      // 考虑ie8的offsetTop是已经加了par.clientTop的 
      // 所以分开加 不是ie8的时候 加上边框
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        top += par.clientTop;
        left += par.clientLeft;
      }
      top += par.offsetTop;
      left += par.offsetLeft;
      par = par.offsetParent;
    }
    return {
      top: top,
      left: left
    }


    // var par = selector.offsetParent;
    // var top = selector.offsetTop
    //    // 自身的偏移 
    //    // 有父偏移的话
    //    // +父偏移的边框+父偏移的偏移 +....直到
    //    // 无父偏移的话 就没了
    //    top+=par.clientTop+par.offsetTop
    //    par = par.offsetParent;
    //    top+=par.clientTop+par.offsetTop;
    //    //    par = par.offsetParent;
    //    ...
  }

  // 返回浏览器的一屏幕的宽高 clientWidth
  // 返回浏览器的所有屏幕的宽高 scrollWidth
  // 
  function win(attr, value) {
    // 只有scrollTop scrollLeft可以设置 其他的值不能设置
    if (typeof value === "undefined") {
      return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;


  }

  // children:获取所有子节点或者指定标签名的子节点
  // ->轻松得出firstChild,lastChild
  function children(curEle, tagName) {
    // 首先获取所有的子节点(childNode)
    // 然后筛选出元素节点 nodeType===1
    var arr = [];
    // ie6-8下
    if (/MSIE [678]/i.test(navigator.userAgent)) {
      var nodelist = curEle.childNodes;
      for (var i = 0, l = nodelist.length; i < l; i++) {
        var cur = nodelist[i];
        if (cur.nodeType === 1) {
          arr[arr.length] = cur // arr.push(/)
        }
      }
      nodelist = null;
    } else {
      // 现代浏览器的children是类数组 转换为数组
      arr = Array.prototype.slice.call(curEle.children);
    }
    // 二次筛选
    // if(typeof tagName==="string"){
    //  var arr2 = [];
    //  for (i = 0,l=arr.length; i < l; i++) {
    //    cur=arr[i];
    //    if(cur.tagName.toLowerCase()===tagName.toLowerCase()){
    //      arr2[arr2.length]=cur;
    //    }
    //  }
    //  arr = arr2;
    // }
    if (typeof tagName === "string") {
      for (i = 0; i < arr.length; i++) {
        cur = arr[i];
        // 不等于 表示不是我想要的标签
        if (cur.nodeName.toLowerCase() !== tagName.toLowerCase()) {
          // 删除的时候记得索引减1
          arr.splice(i, 1);
          i--;
        }

      }
    }


    return arr;
  }

  // firstChild:获取第一个元素子节点
  function firstChild(curEle) {
    var kids = this.children(curEle);
    return kids.length ? kids[0] : null
  }

  function lastChild(curEle) {
    var kids = this.children(curEle);
    return kids.length ? kids[length - 1] : null
  }

  // prev:获取上一个哥哥节点
  // ->轻松得出 next prevAll nextAll sibling siblings index
  // ->低耦合 高内聚
  function prev(curEle) {
    if (flag) {
      return curEle.previousElementSibling;
    } else {
      // 低版本的话 获取上一个节点 判断是否为元素节点,不是一直往前找 直到找到元素节点,找不到的话null
      var pre = curEle.previousSibling;
      // while里是循环的条件
      while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
      }
      return pre
    }
  }

  function next(curEle) {
    if (flag) {
      return curEle.nextElementSibling;
    } else {
      // 低版本的话 获取上一个节点 判断是否为元素节点,不是一直往前找 直到找到元素节点,找不到的话null
      var nex = curEle.nextSibling;
      // while里是循环的条件
      while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
      }
      return nex;
    }
  }

  // 获取所有的哥哥元素节点
  function prevAll(curEle) {
    var arr = [];
    var pre = this.prev(curEle);
    while (pre) {
      // 注意这里的顺序
      arr.unshift(pre);
      pre = this.prev(pre);
    }
    return arr;
  }

  function nextAll(curEle) {
    var arr = [];
    var nex = this.next(curEle);
    while (nex) {
      // 注意这里的顺序
      arr.push(nex);
      nex = this.next(nex);
    }
    return arr;
  }

  // sibling 获取相邻的两个元素节点
  function sibling(curEle) {
    var arr = [];
    var pre = prev(curEle);
    var nex = next(curEle);
    if (pre) {
      arr.push(pre)
    }
    if (nex) {
      arr.push(nex)
    }
  }

  // siblings 获取所有的兄弟节点
  function siblings(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle))
  }

  // index 获取当前元素的索引
  function index(curEle) {
    return this.prevAll(curEle).length
  }

  // append 向指定容器末尾追加元素
  function append(newEle, container) {
    container.appendChild(newEle);
  }

  // 原生的只提供 appendChild insertBefore
  // 向容器末尾追加元素
  // container.appendChild(newEle)
  // oldEle.parentNode.appendChild(newEle)
  // 向容器内指定元素前面追加元素
  // oldEle.parentNode.insertBefore(newEle,oldEle)
  // 于是思路跟着这两个拓展
  // 
  // 
  // prepend 向指定容器开头追加元素 
  // 把新的元素添加到容器中第一个子元素节点的前面
  // 如果一个子元素都没有 那么放在末尾即可
  function prepend(newEle, container) {
    // children(container).unshift(newEle)
    var fir = this.firstChild(container);
    if (fir) {
      container.insertBefore(newEle, fir);
      return;
    }
    container.appendChild(newEle)
  }

  // insertBefore 把新元素追加到指定元素前面
  function insertBefore(newEle, oldEle) {
    oldEle.parentNode.insertBefore(newEle, oldEle);
  }

  // insertAfter 把新元素追加到指定元素后面
  // 相当于把新元素追加到指定元素下一个元素的前面
  // 如果指定元素的下一个元素不存在的话 相当于指定元素就是最后一个元素
  function insertAfter(newEle, oldEle) {
    var nex = this.next(oldEle);
    if (nex) {
      oldEle.parentNode.insertBefore(newEle, oldEle);
      return;
    }
    oldEle.parentNode.appendChild(newEle)
  }

  // 判断类名的有无
  // -> addClass removeClass
  function hasClass(curEle, className) {
    var oldClass = curEle.className;
    // oldClass假设是"box bg border"
    // bg: / +bg +/
    // box:/^box +/
    // border:/ +border$/
    // var reg = new RegExp("\\b" + className + "\\b");
    var reg = new RegExp("(^| +)" + className + "($| +)");
    return reg.test(oldClass)
  }

  function addClass(curEle, className) {
    // 为了防止classname包含多个类名 我们把传递进来的字符串按照一或多个空格拆分成每一项
    var arr = className.split(/ +/g);
    // var arr = className.split(/ +/); 测试了下没g也行
    // 循环数组,一项项验证增加
    for (var i = 0, l = arr.length; i < l; i++) {
      var cur = arr[i];
      if (!this.hasClass(curEle, cur)) {
        curEle.className += " " + cur;
      }
    }

  }

  function removeClass(curEle, className) {
    var arr = className.split(/ +/g);
    for (var i = 0, l = arr.length; i < l; i++) {
      var cur = arr[i];
      if (this.hasClass(curEle, cur)) {
        var reg = new RegExp("(^| +)" + cur + "( +|$)", "g");
        curEle.className = curEle.className.replace(reg, " ")
      }
    }
  }

  function getElementsByClass(strClass, context) {
    context = context || document;
    if (flag) {
      return Array.prototype.slice.call(context.getElementsByClassName(strClass));
    } else {
      // ie6-8
      var ary = [];
      // 首尾去掉空格 然后以空格分组
      var strClassAry = strClass.replace(/(^ +| +$)/, '').split(/ +/g);
      var nodeList = context.getElementsByTagName("*");
      for (var i = 0, l = nodeList.length; i < l; i++) {
        var cur = nodeList[i];
        // 假设都存在
        var isOk = true;
        for (var k = 0; k < strClassAry.length; k++) {
          var curStrClass = strClassAry[k];
          var reg = new RegExp("(^| +)" + curStrClass + "( +|$)");
          if (!reg.test(cur.className)) {
            isOk = false;
            break;
          }
        }
        if (isOk) {
          ary[ary.length] = cur;
        }
      }
      return ary;

    }
  }

  // 获取css的具体样式
  // 只有符合"数字+单位/数字"才能使用parseFloat
  function getCss(attr) {
    var val = null,
      reg = null;
    if (flag) { //现代浏览器
      val = window.getComputedStyle(this, null)[attr];
    } else { // ie6-8
      // 遇到opacity filter:alpha(opacity=90.5)
      if (attr === "opacity") {
        val = this.currentStyle["filter"]; // filter:alpha(opacity=10) 把获取到的结果进行剖析,获得里面的数字 让数字除以100才和标准浏览器一致
        reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
        // 先检测是否存在 存在的话才取值
        val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
      } else {
        val = this.currentStyle[attr];
      }
    }
    // 如果遇到margin-top:-10px变成-10;
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
    return reg.test(val) ? parseFloat(val) : val;
  }

  // 在js中给元素设置样式的属性值 我们只能通过  当前元素.style.left="3px",设置元素的行内样式
  // box.style.left = 100 + "px";
  // box.style.width = 200 + "px";
  // 给当前的元素的某一个样式设置值(增加在行内样式的)
  function setCss(attr, value) {
    // 在js中设置float 也要设置兼容
    if (attr === "float") {
      // 现代浏览器
      this["style"]["cssFloat"] = value;
      // ie6-8 opera
      this["style"]["styleFloat"] = value;
      return;
    }
    // opacity在ie6-8不兼容 设置两套样式
    if (attr === "opacity") {
      this["style"]["opacity"] = value;
      this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
      return;
    }

    // 对于某些样式属性 如果传递的值没有单位 我们需要把单位默认的补上,这样的话,方法更人性化
    // width height top bottom  leftright padding margin
    // 处理常用的属性
    var reg = /^(width)|(height)|(top)|(bottom)|(left)|(right)|((margin|padding)((Top|Bottom|Left|Right)?))$/;
    if (reg.test(attr)) {
      // 判断传递进来的值是否是纯数字
      if (!isNaN(value))
        value += "px"
    }

    this["style"][attr] = value;
  }

  function setGroupCss(options) {
    // 遍历对象中的每一项 调取setCss方法一个个进行设置即可
    for (var key in options) {
      // 必须是私有属性
      if (options.hasOwnProperty(key)) {
        setCss.call(this, key, options[key])
      }
    }
    // // 通过检测options的 数据类型 不是一个对象 则不能进行批量设置
    // options = options || 0;
    // // if (Object.prototype.toString.call(options) === "[object Object]") {
    // if (options.toString() === "[object Object]") {

    // }
  }

  // jq提供css 既可以获取 也可以设置 也可以批量设置样式值
  // $("#box").css("width")
  // $("#box").css("width",200)
  // $("#box").css({width:200,height:200})
  // 注意这里的 css是getCss setCss setGroupCss的集成 
  // 这里this的高级运用
  function css(curEle) {
    var argTwo = arguments[1];
    var arr = Array.prototype.slice.call(arguments, 1)

    // 第二个参数值是字符串 ->获取样式或者设置 ->如果第三个参数存在的话 就是设置单样式
    if (typeof argTwo === "string") {
      if (typeof arr[1] === "undefined") {
        return getCss.apply(curEle, arr)
      }
      // 第三个参数存在的话 :
      // this.setCss(curEle,argTwo,argThree);
      setCss.apply(curEle, arr);

    }
    // null undefined false "" -> 0
    argTwo = argTwo || 0;
    if (argTwo.toString() === "[object Object]") {
      // 批量设置
      setGroupCss.apply(curEle, arr)
    }

  }

  return {
    // 数组之间一一替换
    zfindAndReplace: zfindAndReplace,
    // 实现将类数组转化为数组
    zlistToArray: zlistToArray,
    // 把json格式的字符串变成json格式的对象
    zjsonParse: zjsonParse,
    // 检测属性是不是公共属性
    zhasPublicProperty: zhasPublicProperty,
    // 检测类型
    ztypeof: ztypeof,
    // 数组去重
    zunique: zunique,


    // window的一些读写属性
    win: win,
    // 偏移
    offset: offset,
    prev: prev,
    next: next,
    prevAll: prevAll,
    nextAll: nextAll,
    sibling: sibling,
    siblings: siblings,
    index: index,
    // 获取子元素
    children: children,
    firstChild: firstChild,
    lastChild: lastChild,
    append: append,
    prepend: prepend,
    insertBefore: insertBefore,
    insertAfter: insertAfter,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    getElementsByClass: getElementsByClass,
    // 获取css的具体样式
    // 只有符合"数字+单位/数字"才能使用parseFloat
    css: css

    // 这里end
  }
}())


// 时间字符串格式化  "2015-6-7 12:13:4".zformatTime() -> 2015年06月07日 12:14:04
// 0,1,2,3,4,5分分表示年月日 时分秒
String.prototype.zformatTime = function zformatTime(formatStr) {
  var reg = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var arr = reg.exec(this).slice(1); // reg.exec(this)的最后的index和input不是数组的项
  // arr = ["2015", "7", "9", "13", "9", "10"]
  formatStr = formatStr || "{0}年{1}月{2}日 {3}:{4}:{5}";
  formatStr = formatStr.replace(/{([\d]+)}/g, function () {
    var val = arr[arguments[1]];
    return val.length === 1 ? "0" + val : val;
  })
  return formatStr;
}


// 精准检测不同浏览器 Detecting browsers by ducktyping:
function detectNavigator() {
  var obj = {
    // Opera 8.0+
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    // Firefox 1.0+
    isFirefox: typeof InstallTrigger !== 'undefined',
    // At least Safari 3+: "[object HTMLElementConstructor]"
    isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    // Internet Explorer 6-11
    isIE: /*@cc_on!@*/ false || !!document.documentMode,
    // Chrome 1+
    isChrome: !!window.chrome && !!window.chrome.webstore,
    // Edge 20+
    isEdge: !this.isIE && !!window.StyleMedia
    // isBlink:(this.isChrome || this.isOpera) && !!window.CSS
  };
}
/*
 自己写的  不是很精准 因为userAgent可以改
 谷歌:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36      // Chrome/52.0.2743.116
 火狐:Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0     // Firefox/47.0
 IE:"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)"    // MSIE 10.0;
 safari:"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"    //Safari/534.57.2
 opera:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36 OPR/39.0.2256.48     // OPR/39.0.2256.48
 */
function getBrowser() {
  var ua = navigator.userAgent;
  // opera 里面有opera chrome safari
  // chrome 里面有chrome safari
  // safari 里面有safari
  // 所以依次判断
  var arr = /(MSIE)\s(\d+(.\d+)*)/.exec(ua) || /(Firefox)\/(\d+(.\d+)*)/.exec(ua) || /(OPR)\/(\d+(.\d+)*)$/.exec(ua) || /(Chrome)\/(\d+(.\d+)*)\s/.exec(ua) || /(Safari)\/(\d+(.\d+)*)$/.exec(ua);
  if (arr !== null) {
    return {
      browser: arr[1],
      version: arr[2]
    }
  } else {
    return "浏览器不是ie firefox opera chrome safari"
  }
}
