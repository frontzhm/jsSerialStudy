/**
 * Created by Administrator on 2017/2/6.
 */
var less = require("less");
var fs = require("fs");
less.render(fs.readFileSync("./test.less", "utf-8"), { compress: true }, function(error, output) {
    fs.writeFileSync("./test.css", output.css, "utf-8")
  })
  // console.log(1)
  // function sum() {
  //   console.log(2)
  // }
  // sum()
