~function () {
  function Banner(banner, dataUrl, delay) {
    // 全局变量变成私有属性
    this.banner = banner;
    // 0
    this.slidelist = utils.getElementsByClass("slidelist", this.banner)[0];
    this.tiplist = utils.getElementsByClass("tiplist", this.banner)[0];
    this.arrleft = utils.getElementsByClass("arrleft", this.banner)[0];
    this.arrright = utils.getElementsByClass("arrright", this.banner)[0];
    this.slides = this.slidelist.getElementsByTagName("li");
    this.imgs = this.slidelist.getElementsByTagName("img");
    this.tips = this.tiplist.getElementsByTagName("li");
    this.jsonData = null;
    this.len = null;
    this.curIndex = 0;
    this.delay = delay || 1000;
    this.lazyTimer = null
    this.autoPlayTimer = null;
    // init是唯一入口
    this.init();
  }

  Banner.prototype = {
    // 这个必须写,且放在第一个位置,这样就不会忘
    constructor: Banner,
    // 方法变成公共的,注意this
    // 特别是onclick,setInterval里面的this
    // 确保大部分this指向当前实例
    getData: function () {
      // var xml = new XMLHTTPRequest;
      // xml.open("get","data.txt?_="+Math.random(),false);
      // xml.onreadystatechange = function () {
      // 	 if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
      // 	 	jsonData = formatJSON(xml.responseText);
      // 	 }
      // }
      // xml.send(null);
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
    },
    bindData: function () {
      var str = "",
        str1 = "",
        className = "";
      for (var i = 0; i < this.len; i++) {
        var cur = this.jsonData[i];
        className = i === 0 ? ' class="cur"' : "";
        str += '<li' + className + '><a href="' + cur.url + '"><img trueImg="' + cur.img + '" src="" alt="' + cur.desc + '" title="' + cur.desc + '"></a></li>';
        str1 += '<li' + className + '></li>';
      }
      this.slidelist.innerHTML = str;
      this.tiplist.innerHTML = str1;
    },
    lazyImg: function () {
      var _this = this;
      for (var i = 0; i < this.len; i++) {
        ~function (i) {
          var cur = _this.imgs[i];
          var oImg = new Image;
          oImg.src = cur.getAttribute("trueImg");
          oImg.onload = function () {
            cur.src = this.src;
            cur.style.display = "block";
            oImg = null;
          }
        }(i)
      }
      animate(this.slides[0], {
        opacity: 1
      }, 300)
      window.clearTimeout(this.lazyTimer)
    },
    playWhich: function (n) {
      // n是正数,curIndex<len,n=len的时候相当于第一张也就是0...
      // n是负数,n=-1的时候是最后一张,也就是len-1
      this.curIndex = (n + this.len) % this.len;
      for (var i = 0; i < this.len; i++) {
        if (i === this.curIndex) {
          utils.addClass(this.slides[i], "cur")
        } else {
          utils.removeClass(this.slides[i], "cur")
        }
      }
      // 小索引
      for (i = 0; i < this.len; i++) {
        if (i === this.curIndex) {
          utils.addClass(this.tips[i], "cur")
        } else {
          utils.removeClass(this.tips[i], "cur")
        }
      }
      var _this = this;
      animate(this.slides[this.curIndex], {
        opacity: 1
      }, 300, function () {
        for (var i = 0; i < _this.len; i++) {
          if (i !== _this.curIndex) {
            utils.css(_this.slides[i], "opacity", 0)
          }
        }
      })
    },
    playNext: function () {
      this.playWhich(++this.curIndex);
    },
    playPrev: function () {
      this.playWhich(--this.curIndex);
    },
    play: function () {
      var _this = this;
      this.autoPlayTimer = window.setInterval(function () {
        _this.playNext();
      }, _this.delay)
    },
    pause: function () {
      window.clearInterval(this.autoPlayTimer)
    },
    hoverBanner: function () {
      var _this = this;
      this.banner.onmouseover = function () {
        _this.pause();
        _this.arrleft.style.display = _this.arrright.style.display = "block";
      }
      this.banner.onmouseout = function () {
        _this.play();
        _this.arrleft.style.display = _this.arrright.style.display = "none";
      }
    },
    clickArr: function () {
      // 这是不行的 this
      // this.arrright.onclick = this.playNext;
      var _this = this;
      this.arrright.onclick = function () {
        _this.playNext();
      };
      this.arrleft.onclick = function () {
        _this.playPrev();
      };
    },
    init: function () {
      var _this = this;
      this.getData();
      this.bindData();
      this.lazyTimer = window.setTimeout(function () {
        _this.lazyImg();
      }, 500);
      this.autoPlayTimer = window.setInterval(function () {
        _this.playNext();
      }, this.delay);
      this.hoverBanner();
      this.clickArr();
    }

  }
  window.Banner = Banner
}()