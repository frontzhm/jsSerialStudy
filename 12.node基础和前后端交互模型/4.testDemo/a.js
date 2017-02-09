function sum() {
  var arr = Array.prototype.slice.call(arguments);
  return arr.reduce(function(prev, cur, index, array) {
      return prev + cur;
    })
    // return eval(arr.join("+"))
}
console.log(sum(9, 7))
