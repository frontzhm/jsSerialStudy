~function () {
  var tween = {

    // start 开始位置
    // alter 总距离
    // curTime 已经运行的时间
    // dur 总时间
    // 返回 已经运行的距离
    Linear: function (start, alter, curTime, dur) {
      return start + curTime / dur * alter;
    }, //最简单的线性变化,即匀速运动

    Quad: { //二次方缓动

      easeIn: function (start, alter, curTime, dur) {

        return start + Math.pow(curTime / dur, 2) * alter;

      },

      easeOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur;

        return start - (Math.pow(progress, 2) - 2 * progress) * alter;

      },

      easeInOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur * 2;

        return (progress < 1 ? Math.pow(progress, 2) : -((--progress) * (progress - 2) - 1)) * alter / 2 + start;

      }

    },

    Cubic: { //三次方缓动

      easeIn: function (start, alter, curTime, dur) {

        return start + Math.pow(curTime / dur, 3) * alter;

      },

      easeOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur;

        return start - (Math.pow(progress, 3) - Math.pow(progress, 2) + 1) * alter;

      },

      easeInOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur * 2;

        return (progress < 1 ? Math.pow(progress, 3) : ((progress -= 2) * Math.pow(progress, 2) + 2)) * alter / 2 + start;

      }

    },

    Quart: { //四次方缓动

      easeIn: function (start, alter, curTime, dur) {

        return start + Math.pow(curTime / dur, 4) * alter;

      },

      easeOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur;

        return start - (Math.pow(progress, 4) - Math.pow(progress, 3) - 1) * alter;

      },

      easeInOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur * 2;

        return (progress < 1 ? Math.pow(progress, 4) : -((progress -= 2) * Math.pow(progress, 3) - 2)) * alter / 2 + start;

      }

    },

    Quint: { //五次方缓动

      easeIn: function (start, alter, curTime, dur) {

        return start + Math.pow(curTime / dur, 5) * alter;

      },

      easeOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur;

        return start - (Math.pow(progress, 5) - Math.pow(progress, 4) + 1) * alter;

      },

      easeInOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur * 2;

        return (progress < 1 ? Math.pow(progress, 5) : ((progress -= 2) * Math.pow(progress, 4) + 2)) * alter / 2 + start;

      }

    },

    Sine: { //正弦曲线缓动

      easeIn: function (start, alter, curTime, dur) {

        return start - (Math.cos(curTime / dur * Math.PI / 2) - 1) * alter;

      },

      easeOut: function (start, alter, curTime, dur) {

        return start + Math.sin(curTime / dur * Math.PI / 2) * alter;

      },

      easeInOut: function (start, alter, curTime, dur) {

        return start - (Math.cos(curTime / dur * Math.PI / 2) - 1) * alter / 2;

      }

    },

    Expo: { //指数曲线缓动

      easeIn: function (start, alter, curTime, dur) {

        return curTime ? (start + alter * Math.pow(2, 10 * (curTime / dur - 1))) : start;

      },

      easeOut: function (start, alter, curTime, dur) {

        return (curTime == dur) ? (start + alter) : (start - (Math.pow(2, -10 * curTime / dur) + 1) * alter);

      },

      easeInOut: function (start, alter, curTime, dur) {

        if (!curTime) {
          return start;
        }

        if (curTime == dur) {
          return start + alter;
        }

        var progress = curTime / dur * 2;

        if (progress < 1) {

          return alter / 2 * Math.pow(2, 10 * (progress - 1)) + start;

        } else {

          return alter / 2 * (-Math.pow(2, -10 * --progress) + 2) + start;

        }

      }

    },

    Circ: { //圆形曲线缓动

      easeIn: function (start, alter, curTime, dur) {

        return start - alter * Math.sqrt(-Math.pow(curTime / dur, 2));

      },

      easeOut: function (start, alter, curTime, dur) {

        return start + alter * Math.sqrt(1 - Math.pow(curTime / dur - 1));

      },

      easeInOut: function (start, alter, curTime, dur) {

        var progress = curTime / dur * 2;

        return (progress < 1 ? 1 - Math.sqrt(1 - Math.pow(progress, 2)) : (Math.sqrt(1 - Math.pow(progress - 2, 2)) + 1)) * alter / 2 + start;

      }

    },

    Elastic: { //指数衰减的正弦曲线缓动

      easeIn: function (start, alter, curTime, dur, extent, cycle) {

        if (!curTime) {
          return start;
        }

        if ((curTime == dur) == 1) {
          return start + alter;
        }

        if (!cycle) {
          cycle = dur * 0.3;
        }

        var s;

        if (!extent || extent < Math.abs(alter)) {

          extent = alter;

          s = cycle / 4;

        } else {
          s = cycle / (Math.PI * 2) * Math.asin(alter / extent);
        }

        return start - extent * Math.pow(2, 10 * (curTime / dur - 1)) * Math.sin((curTime - dur - s) * (2 * Math.PI) / cycle);

      },

      easeOut: function (start, alter, curTime, dur, extent, cycle) {

        if (!curTime) {
          return start;
        }

        if (curTime == dur) {
          return start + alter;
        }

        if (!cycle) {
          cycle = dur * 0.3;
        }

        var s;

        if (!extent || extent < Math.abs(alter)) {

          extent = alter;

          s = cycle / 4;

        } else {
          s = cycle / (Math.PI * 2) * Math.asin(alter / extent);
        }

        return start + alter + extent * Math.pow(2, -curTime / dur * 10) * Math.sin((curTime - s) * (2 * Math.PI) / cycle);

      },

      easeInOut: function (start, alter, curTime, dur, extent, cycle) {

        if (!curTime) {
          return start;
        }

        if (curTime == dur) {
          return start + alter;
        }

        if (!cycle) {
          cycle = dur * 0.45;
        }

        var s;

        if (!extent || extent < Math.abs(alter)) {

          extent = alter;

          s = cycle / 4;

        } else {
          s = cycle / (Math.PI * 2) * Math.asin(alter / extent);
        }

        var progress = curTime / dur * 2;

        if (progress < 1) {

          return start - 0.5 * extent * Math.pow(2, 10 * (progress -= 1)) * Math.sin((progress * dur - s) * (2 * Math.PI) / cycle);

        } else {

          return start + alter + 0.5 * extent * Math.pow(2, -10 * (progress -= 1)) * Math.sin((progress * dur - s) * (2 * Math.PI) / cycle);

        }

      }

    },

    Back: { // 超过范围的三次方缓动


      easeIn: function (start, alter, curTime, dur, s) {

        if (typeof s == "undefined") {
          s = 1.70158;
        }

        return start + alter * (curTime /= dur) * curTime * ((s + 1) * curTime - s);

      },

      easeOut: function (start, alter, curTime, dur, s) {

        if (typeof s == "undefined") {
          s = 1.70158;
        }

        return start + alter * ((curTime = curTime / dur - 1) * curTime * ((s + 1) * curTime + s) + 1);

      },

      easeInOut: function (start, alter, curTime, dur, s) {

        if (typeof s == "undefined") {
          s = 1.70158;
        }

        if ((curTime /= dur / 2) < 1) {

          return start + alter / 2 * (Math.pow(curTime, 2) * (((s *= (1.525)) + 1) * curTime - s));

        }

        return start + alter / 2 * ((curTime -= 2) * curTime * (((s *= (1.525)) + 1) * curTime + s) + 2);

      }

    },

    Bounce: { // 指数衰减的反弹运动

      easeIn: function (start, alter, curTime, dur) {

        return start + alter - Tween.Bounce.easeOut(0, alter, dur - curTime, dur);

      },

      easeOut: function (start, alter, curTime, dur) {

        if ((curTime /= dur) < (1 / 2.75)) {

          return alter * (7.5625 * Math.pow(curTime, 2)) + start;

        } else if (curTime < (2 / 2.75)) {

          return alter * (7.5625 * (curTime -= (1.5 / 2.75)) * curTime + .75) + start;

        } else if (curTime < (2.5 / 2.75)) {

          return alter * (7.5625 * (curTime -= (2.25 / 2.75)) * curTime + .9375) + start;

        } else {

          return alter * (7.5625 * (curTime -= (2.625 / 2.75)) * curTime + .984375) + start;

        }

      },

      easeInOut: function (start, alter, curTime, dur) {

        if (curTime < dur / 2) {

          return Tween.Bounce.easeIn(0, alter, curTime * 2, dur) * 0.5 + start;

        } else {

          return Tween.Bounce.easeOut(0, alter, curTime * 2 - dur, dur) * 0.5 + alter * 0.5 + start;

        }

      }

    }
  }
  // 实现多方向的运动动画
  // curEle:当前元素
  // target:当前动画的目标位置,存储的是每一个方向的目标位置{left:xxx,top:xxx}
  // duration:当前动画的总时间

  // effect:支持以下的情况:
  // 1)如果传递进来的是一个数字
  // 0->linear
  // ["Linear","Quad-easeIn",....]
  // 2)如果传递进来的是数组的话["Quad","easeIn"]
  // 3)如果不传的话 默认就是linear
  function animate(curEle, target, duration, effect, callback) {
    // 处理需要的动画效果
    var tempEffect = tween.Linear;
    if (typeof effect === "number") {
      switch (effect) {
        case 0:
          tempEffect = tween.Linear;
          break;
        case 1:
          tempEffect = tween.Quad.easeIn;
          break;

      }
    } else if (effect instanceof Array) {

      tempEffect = effect.length > 1 ? tween[effect[0]][effect[1]] : tween[effect[0]]
    } else if (typeof effect === "function") {
      // 实际意义:effct是不传值 传的的是函数值
      callback = effect
    }
    // 在每次执行方法执行之前 首先结束当前元素的动画
    window.clearInterval(curEle.timer);
    // 获得每个方向的起始值和总距离
    var begin = {},
      distance = {};
    for (var key in target) {
      // 只遍历私有属性
      if (target.hasOwnProperty(key)) {
        // key:方向:top/left
        begin[key] = utils.css(curEle, key);
        distance[key] = target[key] - begin[key];
      }
    }
    // 实现多方向运动动画
    var time = 0;
    var delay = 10;
    curEle.timer = window.setInterval(function () {
      time += delay;
      // 到了时间就停止定时器 结束动画 让盒子到目标那
      if (time >= duration) {
        // for (key in target) {
        // 	if (target.hasOwnProperty(key)) {
        // 		utils.css(curEle,key,target[key]);
        // 	}
        // }
        utils.css(curEle, target);
        clearInterval(curEle.timer);
        // 在动画结束的时候,如果用户传了回调函数,就会执行
        // 相当于动画结束之后执行的动作
        // 不仅执行还让回调函数的this变成当前要操作的元素
        typeof callback !== "undefined" && callback.call(curEle);
        return;
      }
      // 未到达目标:分别获取每个方向的当前位置,然后设置即可
      for (key in target) {
        if (target.hasOwnProperty(key)) {
          // Linear: function(start, alter, curTime, dur) {
          // return start + curTime / dur * alter; },
          // 300+1000/500*300
          var curPos = tempEffect(begin[key], distance[key], time, duration);
          utils.css(curEle, key, curPos);
        }
      }
    }, delay)
  }

  window.animate = animate;
}();
