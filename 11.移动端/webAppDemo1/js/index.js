// REM
~function () {
  var desW = 640,
    desF = 100
  winW = document.documentElement.clientWidth || document.body.clientWidth;
  if (winW > desW) {
    document.getElementById('main').style.width = desW + 'px';
    document.documentElement.style.fontSize = desF + 'px';
    // $('.main').css('width', desW);
    // $('html').css('font-size', 100);
    return;
  }
  document.documentElement.style.fontSize = winW * desF / desW + 'px';

}()
//HEADER
~function () {
  var $header = $(".header"),
    $menu = $header.find('.menu'),
    $nav = $header.children('.nav');
  $menu.tap(function () {
    if ($(this).attr('isBlock') === "true") {
      var timer = window.setTimeout(function () {
        // 防抖动 在动画之后执行这个
        $nav.css({
          padding: '0 0',
        })
        window.clearTimeout(timer);
      })
      $nav.css({
        height: '0'
      })

      return;
    }
    $nav.css({
      padding: '.1rem 0',
      height: '2.2rem'
    })
    $(this).attr('isBlock', true);
  })
}()