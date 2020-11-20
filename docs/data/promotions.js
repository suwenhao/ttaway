var fs = require('fs')
var data = [
  {
    "name": "满减优惠",
    "icon_name": "减",
    "icon_color": "F07373",
  },
  {
    "name": "首单立减",
    "icon_name": "首",
    "icon_color": "70BC46",
  },
  {
    "name": "门店新客立减",
    "icon_name": "新",
    "icon_color": "F07373",
  },
  {
    "name": "特价商品",
    "icon_name": "特",
    "icon_color": "F1884F",
  },
  {
    "name": "下单返红包",
    "icon_name": "红",
    "icon_color": "70BC46",
  },
  {
    "name": "进店领红包",
    "icon_name": "领",
    "icon_color": "70BC46",
  },
  {
    "name": "配送费优惠",
    "icon_name": "配",
    "icon_color": "999999",
  },
  {
    "name": "赠品优惠",
    "icon_name": "赠",
    "icon_color": "F1884F",
  },
  {
    "name": "支持开发票",
    "icon_name": "票",
    "icon_color": "999999",
  },
  {
    "name": "折扣商品",
    "icon_name": "折",
    "icon_color": "F07373",
  },
  {
    "name": "食品安全保护",
    "icon_name": "保",
    "icon_color": "999999",
  }
]

var index = 1;
var json = ''
for (let i = 0; i < data.length; i++) {
  json += `{"id":${index},"icon_color":"${data[i].icon_color}","icon_name":"${data[i].icon_name}","name": "${data[i].name}"}\n`
  index++;
}
fs.writeFileSync('./promotions.json', json);