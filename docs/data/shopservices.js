var fs = require('fs')
var data = [
  {
    "name": "蜂鸟配送",
    "img_url": "https://cube.elemecdn.com/b/9b/45d2f6ff0dbeef3a78ef0e4e90abapng.png",
  },
]

var index = 1;
var json = ''
for (let i = 0; i < data.length; i++) {
  json += `{"id":${index},"icon_color":"${data[i].icon_color}","icon_name":"${data[i].icon_name}","name": "${data[i].name}"}\n`
  index++;
}
fs.writeFileSync('./shopservices.json', json);