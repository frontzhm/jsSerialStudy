// JavaScript Document
$(function () {
  ~function () {
    function Banner(banner, delay) {
      this.banner = banner;
      this.slidelist = $(".slidelist", this.banner).first();
      this.tiplist = $(".tiplist", this.banner).first();
      this.arrleft = $(".arrleft", this.banner).first();
      this.arrright = $(".arrright", this.banner).first();
      this.slides = $("li", this.slidelist);
      this.tips = null;
      this.len = this.slides.length;
      this.curIndex = 0;
      this.timer = null;
      this.delay = delay || 3000;
      this.init();
    }

    function zBanner(banner, delay) {
      return new Banner(banner, delay);
    }

    Banner.prototype = {
      constructor: Banner,
      getTip: function () {
        var str = "";
        for (var i = 0; i < this.len; i++) {
          if (i === 0) {
            str += '<li class="current"></li>';
          } else {
            str += '<li></li>';
          }
        }
        this.tiplist.html(str);
        this.tips = $("li", this.tiplist);
      },
      playWhich: function (n) {
        this.curIndex = (this.len + n) % this.len;
        this.slides.eq(this.curIndex).fadeIn();
        this.tips.eq(this.curIndex).addClass('current').siblings().removeClass("current");
      },
      playNext: function () {
        this.slides.eq(this.curIndex).fadeOut();
        this.playWhich(++this.curIndex);
      },
      playPrev: function () {
        this.slides.eq(this.curIndex).fadeOut();
        this.playWhich(--this.curIndex);
      },
      clickArr: function () {
        var _this = this;
        // 左箭头单击事件
        this.arrleft.click(function () {
          _this.playPrev();
        });
        // 右箭头单击事件
        this.arrright.click(function () {
          _this.playNext();
        });
      },
      clickTip: function () {
        var _this = this;
        this.tips.click(function () {
          _this.slides.eq(_this.curIndex).fadeOut();
          _this.playWhich($(this).index());
        });
      },
      hoverBanner: function () {
        var _this = this;
        this.banner.hover(function () {
          window.clearInterval(_this.timer);
          _this.timer = null;
        }, function () {
          clearInterval(_this.timer);
          _this.timer = setInterval(function () {
            _this.playNext();
          }, _this.delay);
        });
      },
      init: function () {
        if (this.len === 1) {
          this.arrleft.remove();
          this.arrright.remove();
          this.tiplist.remove();
        } else {
          this.getTip();
          this.clickArr();
          this.clickTip();
          var _this = this;
          this.timer = setInterval(function () {
            _this.playNext();
          }, this.delay);
          this.hoverBanner();
        }


      }
    }
    window.zBanner = zBanner;
    // end
  }()

  var banner = zBanner($(".banner").first());
  var banner1 = zBanner($(".banner").eq(1));


  /*$(function(){

   var banner = $(".banner").first();
   var slidelist = $(".slidelist", banner).first();
   var tiplist = $(".tiplist", banner).first();
   var arrleft = $(".arrleft", banner).first();
   var arrright = $(".arrright", banner).first();
   var slides = $("li", slidelist);
   var tips = null;
   var len = slides.length;
   var curIndex = 0;
   var timer = null;
   var delay = 2000;
   ~function(){
   var str = "";
   for(var i=0;i<len;i++){
   if(i===0){
   str+='<li class="current"></li>';
   }else{
   str+='<li></li>';
   }
   }
   tiplist.html(str);
   tips = $("li", tiplist);
   }()

   // 播放某一张
   function playWhich(n) {
   //前一张图淡出，后一张淡入,前一张和后一张的区别就是索引号不同
   curIndex = (len + n) % len;
   slides.eq(curIndex).fadeIn();
   tips.eq(curIndex).addClass('current').siblings().removeClass("current");
   }

   function playNext() {
   slides.eq(curIndex).fadeOut();
   playWhich(++curIndex);
   }

   function playPrev() {
   slides.eq(curIndex).fadeOut();
   playWhich(--curIndex);
   }
   // 左箭头单击事件
   $('.arrleft').click(function() {
   playPrev();
   });
   // 右箭头单击事件
   $('.arrright').click(function() {
   playNext();
   });
   // 点击小方块
   tips.click(function() {
   slides.eq(curIndex).fadeOut();
   playWhich($(this).index());
   });

   // 自动播放
   timer = setInterval(playNext, delay);
   $('.banner').hover(function() {
   clearInterval(timer);
   timer = null; //设计还有的一个习惯：清除（停止）定时器之后，认为定时器就没有用了，将定时器清空
   }, function() {
   clearInterval(timer);
   timer = setInterval(playNext, delay);
   });
   })*/
})
