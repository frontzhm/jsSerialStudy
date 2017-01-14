var
  winW = document.documentElement.clientWidth,
  maxL = 0,
  minL = 0;
//REM

~function () {
  var ratio = 100 / 800;
  document.documentElement.style.fontSize = ratio * winW + 'px';
  if (winW > 750) {

  }
}()
// 页面中如果自己使用TOUCH Move等原生事件,需要把浏览器默认的行为阻止掉
$(document).on('touchstart touchmove touchend', function (ev) {
  ev.preventDefault();
})
// BANNER RENDER

var bannerRender = (function () {
  var
    $banner = $('.banner'),
    $slideList = $('.slide-list', $banner),
    $slides = $('.slide', $slideList),
    $imgs = $('img', $('.slide-list'));
  var step = 1,
    count = 0,
    followTimer = null;
  // PUBLIC FN
  function isSwipe(strx, stry, endx, endy) {
    // 为了减少延迟可以改30->0
    return Math.abs(strx - endx) > 30 || Math.abs(stry - endy) > 30;
  }

  function swipeDir(strx, stry, endx, endy) {
    // 先判断是垂直方向还是水平方向
    if (Math.abs(strx - endx) >= Math.abs(stry - endy)) {
      return strx - endx > 0 ? 'left' : 'right';
    } else {
      return stry - endy > 0 ? 'up' : 'down';
    }
  }

  // TOUCH START
  function dragStart(ev) {
    var point = ev.touches[0];
    $slideList.attr({
      strL: parseFloat($slideList.css("left")),
      strX: point.clientX,
      strY: point.clientY,
      isMove: false,
      dir: null,
      changeX: null
    });
  }

  function dragIng(ev) {
    var point = ev.touches[0];
    var endX = point.clientX,
      endY = point.clientY,
      strX = parseFloat($slideList.attr("strX")),
      strY = parseFloat($slideList.attr("strY")),
      strL = parseFloat($slideList.attr("strL")),
      changeX = endX - strX;
    // 计算是否滑动 以及滑动的方向
    var isMove = isSwipe(strX, endX, strY, endY),
      dir = swipeDir(strX, endX, strY, endY);
    if (isMove && /(left|right)/i.test(dir)) {
      $slideList.attr({
        isMove: true,
        dir: dir,
        changeX: changeX
      });
      var curL = strL + changeX;
      curL = curL > maxL ? maxL : curL;
      curL = curL < minL ? minL : curL;
      $slideList[0].style.webkitTransitionDuration = '0s';
      $slideList.css('left', curL);
    }


  }

  function dragEnd(ev) {
    var
      isMove = $slideList.attr("isMove"),
      dir = $slideList.attr("dir"),
      changeX = parseFloat($slideList.attr("changeX"));
    if (isMove && /(left|right)/i.test(dir)) {
      // 滑动的距离超过屏幕一半到下一张 
      if (Math.abs(changeX) >= winW / 2) {
        if (dir === 'left') {
          step++;
        } else {
          step--;
        }
      }
      $slideList[0].style.webkitTransitionDuration = '.2s';
      $slideList.css('left', -step * winW);
      // 滑动的时候做延迟加载
      lazyImg();
      // 动画运动过程中 我们监听一个定时器:动画运动完成,判断当前是否运动到边界,如果到达边界,我们让其立马回到自己真实的位置
      window.clearTimeout(followTimer);
      followTimer = window.setTimeout(function () {
        window.clearTimeout(followTimer);
        if (step === 0 || step === count - 1) {
          $slideList[0].style.webkitTransitionDuration = '0s';
          step = step === 0 ? count - 2 : 1;
          $slideList.css('left', -step * winW);
          // 滑动的时候做延迟加载
          lazyImg();
        }
        /*	
         合并到上面
         if(step===0){
         $slideList[0].style.webkitTransitionDuration='0s';
         $slideList.css('left',-(count-2)*winW);
         step=count-2;
         }
         if(step===count-1){
         $slideList[0].style.webkitTransitionDuration='0s';
         $slideList.css('left',-winW);
         step=1;
         }*/
      }, 200)
    }
  }

  /**
   * [lazyImg 图片延迟加载,让当前的活动块及相邻的两个活动块进行加载]
   * @return {[type]} [description]
   */
  function lazyImg() {
    var $cur = $slides.eq(step)
    // add向现有集合添加新的元素 一次添加一个
    var $tar = $cur.add($cur.next()).add($cur.prev());
    $tar.each(function (index, item) {
      var $img = $(this).find('img');
      // ATTR存储或者获取的属性值都是一个字符串,
      // 如果当前的图片已经加载过我们就不需要进行加载了
      // mine
      // if($img.attr('src')===$img.data('src')){
      // 	return;
      // }
      if ($img.attr('isLoad') === 'true') {
        return;
      }
      var oImg = new Image;
      oImg.src = $img.data('src');
      oImg.onload = function () {
        $img.attr({
          src: this.src,
          isLoad: true
        });
        $img.css('display', 'block');
        oImg = null;
      }
    })

  }

  return {
    init: function () {
      // init css style
      count = $slides.length;
      minL = -(count - 1) * winW;
      $slideList.css('width', count * winW);
      $slides.css('width', winW);
      // lazy img
      lazyImg();
      // swipe left or right
      $slideList
        .on('touchstart', dragStart)
        .on('touchmove', dragIng)
        .on('touchend', dragEnd);

    }
  }
})()
bannerRender.init();
