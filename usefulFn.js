var utils = {
  // 数组之间一一替换
  zfindAndReplace: function zfindAndReplace(str, reg, oldarr, newarr) {
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
  },
  /**
   var oldarr = ["A", "B", "C", "D", "E"];
   var newarr = ["a", "b", "c", "d", "e"];
   var str = "ABCDADEC";
   console.log(findAndReplace(str, /\w/g, oldarr, newarr)) // abcdadec
   */
  // 实现将类数组转化为数组
  zlistToArray: function (likeArray) {
    var arr = [];
    try {
      arr = Array.prototype.slice.call(likeArray);
    } catch (e) {
      for (var i = 0, l = likeArray.length; i < l; i++) {
        arr[arr.length] = likeArray[i];
      }
    }
    return arr;
  },
  // 把json格式的字符串变成json格式的对象
  zjsonParse: function (str) {
    // try{
    //  return JSON.parse(str);
    // }catch(e){
    //  return eval("("+str+")");
    // }
    return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
  },
  // 检测属性是不是公共属性
  zhasPublicProperty: function (obj, prop) {
    // 首先必须是属于对象的属性 然后不是对象的私有属性
    return (prop in obj) && !obj.hasOwnProperty(prop);
  },
  // 检测类型
  ztypeof: function (para) {
    return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
  },

  // 数组去掉重复的
  // 思路:
  // 1.建立一个空对象
  // 2.从数组的第一个数开始,数组的项给对象的键值对,对象的键值相等
  // 3.数组的每项和对象相应的键比较,如果对象有obj[23]=23;如在遇到数组有23 那么检测到obj[23]已经存在
  zunique: function (arr) {
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
  return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
}

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


// 获取css的具体样式
// 只有符合"数字+单位/数字"才能使用parseFloat
function getCss(curEle, attr) {
  var val = null,
    reg = null;
  if ("getComputedStyle" in window) { //现代浏览器
    val = window.getComputedStyle(curEle, null)[attr];
  } else { // ie6-8
    // 遇到opacity filter:alpha(opacity=90.5)
    if (attr === "opacity") {
      val = curEle.currentStyle[filter]; // filter:alpha(opacity=10) 把获取到的结果进行剖析,获得里面的数字 让数字除以100才和标准浏览器一致
      reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
      // 先检测是否存在 存在的话才取值
      val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
    } else {
      val = curEle.currentStyle[attr];
    }
  }
  // 如果遇到margin-top:-10px变成-10;
  reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
  return reg.test(val) ? parseFloat(val) : val;
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
