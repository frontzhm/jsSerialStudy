## 1.回调函数:forEach,map  试着写下   ie不支持forEach map bind
## 2.珂理化函数思想:  利用函数执行形成一个不销毁的私有作用域,把需要预先处理的内容都存在这个不销毁的作用域中,并且返回一个小函数,以后我们执行的都是小函数,在小函数中把之前预先存储的内容执行 13:21
试着写下bind
```
我们想要a执行的时候this的值是准备好的,那么b执行的时候相当于a执行,如果不放回函数的话 那么a将直接执行
function a(){
    console.log(this)
}

function b(){
    return function(){
        a.apply(window);
    }
}
// 类似于这样
window.setTimeout(a.bind(window),200)


```
## 3.事件:浏览器天生赋予其行为
## 4.事件对象 e (鼠标的信息) e.target e.preventDefault e.stopPropagation
## 5.事件的传播机制:捕获->目标->冒泡
## 6.鼠标跟随 拖拽 京东的放大的练习
## 7.dom2 (绑定多个事件,可以控制阶段,按顺序,事件池,兼容) ,DOMContentLoaded ...