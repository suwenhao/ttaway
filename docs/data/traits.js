var fs = require('fs')
var data = [
  { id:1, "description": "品牌保证", "icon_color": "3FBDE6", "icon_name": "品", "name": "品牌保证"}, 
  { id:2, "description": "已加入“外卖保”计划，食品安全有保障", "icon_color": "999999", "icon_name": "保", "name": "外卖保" }, 
  { id:3, "description": "准时必达，超时秒赔", "icon_color": "57A9FF", "icon_name": "准", "name": "准时达"}, 
  { id:4, "description": "新店", "icon_color": "E8842D", "icon_name": "新", "name": "新开餐馆"}, 
  { id:5, "description": "可使用支付宝、微信、手机QQ进行在线支付", "icon_color": "FF4E00", "icon_name": "付", "name": "在线支付"},
  { id:6, "description": "该餐馆由蜂鸟配送", "icon_color": "FF4E00", "icon_name": "送", "name": "蜂鸟配送" }, 
  { id:7, "description": "该商家支持开发票，请在下单时填写好发票抬头", "icon_color": "999999", "icon_name": "票", "name": "开发票"}
]

var index = 1;
var json = ''
for (let i = 0; i < data.length; i++) {
  json += `{"id":${index},"description":"${data[i].description}","icon_color":"${data[i].icon_color}","icon_name":"${data[i].icon_name}","name": "${data[i].name}", "ranking_weight": ${data[i].ranking_weight}}\n`
  index++;
}
fs.writeFileSync('./activities.json', json);