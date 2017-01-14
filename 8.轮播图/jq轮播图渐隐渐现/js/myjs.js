// JavaScript Document
$(function () {
  var $num = 0;//控制图片播放张数；如果变量名称之前加$，个人习惯 -- 表示的是jq中变量名称
  var timer = null;
  //鼠标移上离开控制a显示隐藏
  /*$('.main').mouseover(function(e) {
   $('.left,.right').show();
   });
   $('.main').mouseout(function(e) {
   $('.main a').hide();
   });*/
  /*$('.main').hover(function(e) {
   $('.main a').toggle();
   });*/
  //右箭头单击事件
  $('.right').click(function (e) {
    fn();
  });
  //左箭头单击事件
  $('.left').click(function (e) {
    //前一张图淡出，后一张淡入,前一张和后一张的区别就是索引号不同
    $('.main ul li').eq($num).fadeOut();
    //要在++之前，先给$num一个限制条件
    $num--;//加加之后表示的是后一张，淡入
    //if($num>4){$num=0}//先++，再判断，最后执行
    //通过jq获取到最大的一个num取值
    //if($num>$('.main ul li').length-1){$num=0}
    //利用取余数
    $num = $num % $('.main ul li').length;
    $('.main ul li').eq($num).fadeIn();
    $('.main ol li').eq($num).addClass('current').siblings().removeClass();
  });

  //小方块开始
  $('.main ol li').click(function (e) {
    $(this).addClass('current').siblings().removeClass();
    //前一张淡出，后一张淡入
    $('.main ul li').eq($num).fadeOut();
    //实现 点谁，对应的图片就淡入;把$num和索引值关联起来
    $num = $(this).index();
    $('.main ul li').eq($num).fadeIn();
  });

  //自动播放
  function fn() {
    //前一张图淡出，后一张淡入,前一张和后一张的区别就是索引号不同
    $('.main ul li').eq($num).fadeOut();
    //要在++之前，先给$num一个限制条件
    $num++;//加加之后表示的是后一张，淡入
    //if($num>4){$num=0}//先++，再判断，最后执行
    //通过jq获取到最大的一个num取值
    //if($num>$('.main ul li').length-1){$num=0}
    //利用取余数
    $num = $num % $('.main ul li').length;
    $('.main ul li').eq($num).fadeIn();
    $('.main ol li').eq($num).addClass('current').siblings().removeClass();
  }

  timer = setInterval(fn, 2000);
  $('.main').hover(function (e) {
    clearInterval(timer);
    timer = null;//设计还有的一个习惯：清除（停止）定时器之后，认为定时器就没有用了，将定时器清空
    $('.main a').show();
  }, function (e) {
    clearInterval(timer);
    timer = setInterval(fn, 2000);
    $('.main a').hide();
  });
})