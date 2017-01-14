~function (jQuery) {
  function banner(ajaxurl, delay) {
    // 通过jquery选择器或者筛选的方法获取到的jQuery集合是不存在DOM的映射机制,
    // 之前获取到的集合,之后再页面中HTML结构改变了,集合中的内容不会跟着自动发生变化(JS获取的元素集合有DDM映射的机制)
    var
      banner = $(this),
      slidelist = $(".slidelist", banner).first(),
      tiplist = $(".tiplist", banner).first(),
      bannerleft = $(".bannerleft", banner).first(),
      bannerright = $(".bannerright", banner).first(),
      slides = null,
      imgs = null,
      tips = null,
      jsonData = null,
      delay = delay || 1000,
      curIndex = 0,
      len = 0,
      autoTimer = null;
    // 1.ajax读取数据
    /*$.ajax({
     url:ajaxurl+"?_="+Math.random(),
     type:"get",
     dataType:"json",
     async:false,//当前的请求是同步的,也就是请求数据完之后才进行下一个
     success:function(data){
     jsonData = data;
     }
     })*/
    jsonData = [{
      "src": "img/01.jpg",
      "desc": "2016新世界",
      "href": "http://www.baidu.com"
    }, {
      "src": "img/02.jpg",
      "desc": "2016新世界",
      "href": "http://www.baidu.com"
    }, {
      "src": "img/03.jpg",
      "desc": "2016新世界",
      "href": "http://www.baidu.com"
    }, {
      "src": "img/04.jpg",
      "desc": "2016新世界",
      "href": "http://www.baidu.com"
    }];
    // 2.数据绑定
    ~function bindData() {
      var str = '',
        str1 = '';
      $.each(jsonData, function (index, item) {
        str += '<li><a href="' + this.href + '"><img trueImg="' + this.src + '" src="" alt="' + this.desc + '"></a></li>'
        index === 0 ? str1 += '<li class="cur"></li>' : str1 += '<li></li>';
      })
      slidelist.html(str);
      tiplist.html(str1);
      // 绑定完数据后获取我们的集合
      slides = $("li", slidelist);
      imgs = $("img", slidelist);
      tips = $("li", tiplist);
      len = slides.length;
      console.log(banner, slidelist, tiplist, bannerleft, bannerright, slides, imgs, tips)
    }();
    // 3.实现图片延迟加载
    window.setTimeout(lazyImg, 500);

    function lazyImg() {
      // 循环的时候自带闭包
      $.each(imgs, function (index, item) {
        // this===item
        var
          _this = this,
          self = $(this),
          oImg = new Image;
        oImg.src = this.getAttribute("trueImg");
        oImg.onload = function () {
          self.prop("src", this.src).css({display: "block"});
        }
        oImg = null;
        // fadeIn()的原理是先让元素display变成block 然后手动让opacity为0然后变成1
        slides.eq(0).css({zIndex: 1}).animate({opacity: 1})
      })
    }

    // 4.想让哪张显示,让哪张的zindex为1,让其他的zindex为0,然后这张的opacity动画到1,其他opacity为0
    function playWhich(n) {
      curIndex = (n + len) % len;
      slides.eq(curIndex).css({zIndex: 1})
        .siblings().css({zIndex: 0})
        .end()
        .animate({opacity: 1}, function () {
          $(this).siblings().css({opacity: 0})
        })
      tips.eq(curIndex).addClass('cur').siblings().removeClass('cur');
    }

    function playNext() {
      playWhich(++curIndex);
    }

    function playPrev() {
      playWhich(--curIndex);
    }

    // 5.自动轮播
    // autoTimer = window.setInterval(playNext, delay);
    // 7.控制按钮显示和鼠标放在banner上
    function play() {
      autoTimer = window.setInterval(playNext, delay);
    }

    function pause() {
      clearInterval(autoTimer)
      autoTimer = null;
    }

    banner.on('mouseover', function () {
      pause();
      $(bannerleft).css({display: "block"});
      $(bannerright).css({display: "block"});
    }).on('mouseout', function () {
      play();
      $(bannerleft).css({display: "none"});
      $(bannerright).css({display: "none"});
    })
    // 6.点击箭头
    bannerleft.on('click', playPrev);
    bannerright.on('click', playNext);
    // 7.点击索引
    tips.on("click", function () {
      playWhich($(this).index())
    })
    // end
  }

  jQuery.fn.extend({
      banner: banner
    }
  )


}(jQuery)
$(".banner").first().banner()

/*$(function() {
 // 通过jquery选择器或者筛选的方法获取到的jQuery集合是不存在DOM的映射机制,
 // 之前获取到的集合,之后再页面中HTML结构改变了,集合中的内容不会跟着自动发生变化(JS获取的元素集合有DDM映射的机制)
 var
 banner = $(".banner"),
 slidelist = $(".slidelist", banner).first(),
 tiplist = $(".tiplist", banner).first(),
 bannerleft = $(".bannerleft", banner).first(),
 bannerright = $(".bannerright", banner).first(),
 slides = null,
 imgs = null,
 tips = null,
 jsonData = null,
 delay = 4000,
 curIndex = 0,
 len = 0,
 autoTimer = null;
 // 1.ajax读取数据
 /*$.ajax({
 url:"json/banner.txt?_="+Math.random(),
 type:"get",
 dataType:"json",
 async:false,//当前的请求是同步的,也就是请求数据完之后才进行下一个
 success:function(data){
 jsonData = data;
 }
 })*//*
 jsonData = [{
 "src": "img/01.jpg",
 "desc": "2016新世界",
 "href": "http://www.baidu.com"
 }, {
 "src": "img/02.jpg",
 "desc": "2016新世界",
 "href": "http://www.baidu.com"
 }, {
 "src": "img/03.jpg",
 "desc": "2016新世界",
 "href": "http://www.baidu.com"
 }, {
 "src": "img/04.jpg",
 "desc": "2016新世界",
 "href": "http://www.baidu.com"
 }];
 // 2.数据绑定
 ~ function bindData() {
 var str = '',
 str1 = '';
 $.each(jsonData, function(index, item) {
 str += '<li><a href="' + this.href + '"><img trueImg="' + this.src + '" src="" alt="' + this.desc + '"></a></li>'
 index === 0 ? str1 += '<li class="cur"></li>' : str1 += '<li></li>';
 })
 slidelist.html(str);
 tiplist.html(str1);
 // 绑定完数据后获取我们的集合
 slides = $("li", slidelist);
 imgs = $("img", slidelist);
 tips = $("li", tiplist);
 len = slides.length;
 console.log(banner, slidelist, tiplist, bannerleft, bannerright, slides, imgs, tips)
 }();
 // 3.实现图片延迟加载
 window.setTimeout(lazyImg, 500);

 function lazyImg() {
 // 循环的时候自带闭包
 $.each(imgs, function(index, item) {
 // this===item
 var
 _this = this,
 self = $(this),
 oImg = new Image;
 oImg.src = this.getAttribute("trueImg");
 oImg.onload = function() {
 self.prop("src", this.src).css({ display: "block" });
 }
 oImg = null;
 // fadeIn()的原理是先让元素display变成block 然后手动让opacity为0然后变成1
 slides.eq(0).css({ zIndex: 1 }).animate({ opacity: 1 })
 })
 }
 // 4.想让哪张显示,让哪张的zindex为1,让其他的zindex为0,然后这张的opacity动画到1,其他opacity为0
 function playWhich(n) {
 curIndex = (n + len) % len;
 slides.eq(curIndex).css({ zIndex: 1 })
 .siblings().css({ zIndex: 0 })
 .end()
 .animate({ opacity: 1 }, function() {
 $(this).siblings().css({ opacity: 0 })
 })
 tips.eq(curIndex).addClass('cur').siblings().removeClass('cur');
 }

 function playNext() {
 playWhich(++curIndex);
 }

 function playPrev() {
 playWhich(--curIndex);
 }

 // 5.自动轮播
 // autoTimer = window.setInterval(playNext, delay);
 // 7.控制按钮显示和鼠标放在banner上
 function play () {
 autoTimer = window.setInterval(playNext, delay);
 }
 function pause () {
 clearInterval(autoTimer)
 autoTimer =null;
 }
 banner.on('mouseover',function () {
 pause();
 $(bannerleft).css({display:"block"});
 $(bannerright).css({display:"block"});
 }).on('mouseout',function () {
 play();
 $(bannerleft).css({display:"none"});
 $(bannerright).css({display:"none"});
 })
 // 6.点击箭头
 bannerleft.on('click',playPrev);
 bannerright.on('click',playNext);
 // 7.点击索引
 tips.on("click",function () {
 playWhich($(this).index()) 
 })
 // end
 })
 */
