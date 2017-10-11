var express = require('express');
var path = require('path');
var app = express();

//重新定义root path
var rootPath = path.resolve(__dirname, '../dist');

//配置静态文件目录, root目录相对与express.js的根目录
app.use(express.static('../dist'));

//配置路由
app.get('/', function(req, res){
  res.sendFile('index.html', { root: rootPath });
});

app.listen(8081);
console.log('Express started on port 8081');
