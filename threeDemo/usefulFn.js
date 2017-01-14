var utils = {
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
// 第二次升级:有些样式在不同浏览器中是不兼容的 如opacity:0.1在ie6-8不兼容 filter:alpha(opacity=10)
function getCss(curEle, attr) {
  var val = null,
    reg = null;
  if ("getComputedStyle" in window) {
    val = window.getComputedStyle(curEle, null)[attr];
  } else { // ie6-8
    if (attr === "opacity") {
      val = curEle.currentStyle[filter]; // filter:alpha(opacity=10) 把获取到的结果进行剖析,获得里面的数字 让数字除以100才和标准浏览器一致
      reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
      val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
    } else {
      val = curEle.currentStyle[attr];
    }
  }
  reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
  return reg.test(val) ? parseFloat(val) : val;
}

function win(attr, value) {
  if (typeof value === "undefined") {
    return document.documentElement[attr] || document.body[attr];
  }
  document.documentElement[attr] = value;
  document.body[attr] = value;


}

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
}

// 检测类型
function ztypeof(para) {
  return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
}

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
