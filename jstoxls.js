var jtoxls=require('json2xls');
fs = require('fs')
fs.readFile('output/Orders.json',function (err,data) {
  if (err) {
    return console.log(err);
  }
  
var pjson=JSON.parse(data);
var xls=jtoxls(pjson);
fs.writeFileSync('output.xls',xls,'binary');
});

