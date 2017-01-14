~function () {
  function AutoBanner(curEle, ajaxUrl, interval) {
    // 把之前获取元素的变量都变成当前实例的私有属性
    this.banner = curEle;
    this.slideList = utils.getElementsByClass("slideList", this.banner)[0];
    this.indexList = utils.getElementsByClass("indexList", this.banner)[0];
    this.slides = this.slideList.getElementsByTagName("li");
    this.imgs = this.slideList.getElementsByTagName("img");
    this.indexs = this.indexList.getElementsByTagName("li");
    this.arrLeft = utils.getElementsByClass("arrLeft", this.banner)[0];
    this.arrRight = utils.getElementsByClass("arrRight", this.banner)[0];
    // 之前的全局变量也变成自己的私有属性
    this.jsonData = null;
    this.interval = interval || 3000;
    this.autoTimer = null;
    this.curIndex = 0;
    this.ajaxUrl = ajaxUrl;
    this.len = 0;
    // 唯一入口
    this.init();

  }

  AutoBanner.prototype = {
    // 原型里所有方法执行的时候一般都是当前实例
    // 原来方法里的this重新弄 _this
    // window.setInterval(fn,1000),这个fn里面的this是window
    // window.setInterval(this.fn,1000)// 即使这样也不行,这里的this.fn只是找函数并没有执行,只有执行的时候this.fn()时候fn里面的this是this
    // window.setInterval(function(){_this.fn()},1000)
    // xx.onclick = fn类似上面
    // xx.onclick = function(){
    // _this.fn()}
    constructor: AutoBanner,
    // ajax请求数据
    getData: function getData() {
      var _this = this;
      var xml = new XMLHTTPRequest;
      xml.open("get", this.ajaxUrl + "?_=" + Math.random(), false);
      xml.onreadystatechange = function () {
        if (xml.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
          _this.jsonData = utils.formatJSON(xhr.responseText)
        }
      }
      xml.send(null);
    },
    // 数据绑定
    bindData: function bindData() {
      // 真实案例中 这个要删除
      this.jsonData = [{
        "img": "img/01.jpg",
        "desc": "2016新世界",
        "url": "http://www.baidu.com"
      }, {
        "img": "img/02.jpg",
        "desc": "2016新世界",
        "url": "http://www.baidu.com"
      }, {
        "img": "img/03.jpg",
        "desc": "2016新世界",
        "url": "http://www.baidu.com"
      }, {
        "img": "img/04.jpg",
        "desc": "2016新世界",
        "url": "http://www.baidu.com"
      }];
      this.len = this.jsonData.length;
      var str = "",
        str2 = "";
      for (var i = 0; i < this.len; i++) {
        var cur = this.jsonData[i];
        str += '<li><a href="' + cur.url + '" target="_blank"><img src="" trueImg="' + cur.img + '" alt="' + cur.desc + '"></a></li>';
        if (i === 0) {
          str2 += '<li class="cur"></li>'
        } else {
          str2 += '<li></li>'
        }
      }
      this.slideList.innerHTML = str;
      this.indexList.innerHTML = str2;
    },
    // 延迟加载
    lazyImg: function lazyImg() {
      var _this = this;
      for (var i = 0; i < this.len; i++) {
        ~function (i) {
          var img = _this.imgs[i];
          var oImg = new Image;
          oImg.src = img.getAttribute("trueImg");
          oImg.onload = function () {
            img.src = this.src;
            img.style.display = "block";
            if (i === 0) {
              var slide = _this.slides[0];
              slide.style.zIndex = 1;
              animate(slide, {opacity: 1}, 300)
            }
            oImg = null;
          }
        }(i)
      }
    },
    // 自动轮播
    autoMove: function autoMove() {
      // 当最后一张显示完了,也就是curindex=leng-1 就要重新展示第一张
      if (this.curIndex === this.len - 1) {
        this.curIndex = -1;
      }
      this.curIndex++;
      this.setBanner();
    },
    // 切换效果和焦点对齐
    setBanner: function setBanner() {
      // a.让索引对应的zindex=1,其余的zidnex=0
      for (var i = 0; i < this.len; i++) {
        var curSlide = this.slides[i]
        if (i === this.curIndex) {
          curSlide.style.zIndex = 1;
          // b.让当前的透明度0->1,当动画结束,我们需要让其他的slide透明度变成0
          animate(curSlide, {opacity: 1}, 300, function () {
            var siblings = utils.siblings(this);
            for (var i = 0; i < this.len - 1; i++) {
              utils.css(siblings[i], {opacity: 0})
            }
          });
        } else {
          curSlide.style.zIndex = 0;
          // utils.css(curSlide,{zIndex:0,opacity:0})
        }
      }
      // c.实现焦点对齐
      for (i = 0; i < this.len; i++) {
        var cur = this.indexs[i];
        i === this.curIndex ? utils.addClass(cur, "cur") : utils.removeClass(cur, "cur")
      }
    },
    // 控制自动轮播
    mouseEvent: function mouseEvent() {
      var _this = this;
      this.banner.onmouseover = function () {
        clearInterval(_this.autoTimer);
        _this.arrLeft.style.display = _this.arrRight.style.display = "block";
      }
      this.banner.onmouseout = function () {
        // autoMove执行的时候也必须保证里面的thiss是当前实例
        // _this.autoTimer = window.setInterval(_this.autoMove,_this.interval);
        _this.autoTimer = window.setInterval(function () {
          _this.autoMove();
        }, _this.interval);
        _this.arrLeft.style.display = _this.arrRight.style.display = "none";
      }
    },
    // 实现焦点切换
    indexEvent: function indexEvent() {
      var _this = this;
      for (var i = 0; i < this.len; i++) {
        var cur = this.indexs[i];
        cur.index = i;
        cur.onclick = function () {
          _this.curIndex = this.index;
          _this.setBanner();
        }
      }
    },
    // 实现左右切换
    leftRight: function leftRight() {
      var _this = this;
      this.arrRight.onclick = function () {
        _this.autoPlay();
      };
      this.arrLeft.onclick = function () {
        if (_this.curIndex === 0) {
          _this.curIndex = _this.len;
        }
        _this.curIndex--;
        _this.setBanner();
      }
    },
    // 命令模式:init相当于指挥室 指挥各方法协同执行
    init: function init() {
      // 开始执行各方法
      var _this = this;
      // 真实中 需要执行
      // this.getData();
      this.bindData();
      window.setInterval(function () {
        _this.lazyImg();
      }, 500);
      this.autoTimer = window.setInterval(function () {
        _this.autoMove()
      }, this.interval);
      this.mouseEvent();
      this.indexEvent();
      this.leftRight();

    }
  }
  window.AutoBanner = AutoBanner;
}()
