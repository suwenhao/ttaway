var fs = require('fs')
var data = [{
  "pinyin": "shanghai",
  "is_map": true,
  "longitude": 121.473701,
  "latitude": 31.23037,
  "sort": 1,
  "area_code": "021",
  "abbr": "SH",
  "name": "上海",
  "id": 1
}, {
  "pinyin": "haerbin",
  "is_map": true,
  "longitude": 126.535797,
  "latitude": 45.802158,
  "sort": 4,
  "area_code": "0451",
  "abbr": "HEB",
  "name": "哈尔滨",
  "id": 10
}, {
  "pinyin": "nanjing",
  "is_map": true,
  "longitude": 118.504669,
  "latitude": 31.84178,
  "sort": 5,
  "area_code": "025",
  "abbr": "NJ",
  "name": "南京",
  "id": 6
}, {
  "pinyin": "guangzhou",
  "is_map": true,
  "longitude": 113.264359,
  "latitude": 23.12908,
  "sort": 6,
  "area_code": "020",
  "abbr": "GZ",
  "name": "广州",
  "id": 4
}, {
  "pinyin": "xiamen",
  "is_map": true,
  "longitude": 118.089478,
  "latitude": 24.479509,
  "sort": 7,
  "area_code": "0592",
  "abbr": "XM",
  "name": "厦门",
  "id": 13
}, {
  "pinyin": "hangzhou",
  "is_map": true,
  "longitude": 120.155151,
  "latitude": 30.274151,
  "sort": 8,
  "area_code": "0571",
  "abbr": "HZ",
  "name": "杭州",
  "id": 2
}, {
  "pinyin": "tianjin",
  "is_map": true,
  "longitude": 117.199371,
  "latitude": 39.085098,
  "sort": 14,
  "area_code": "022",
  "abbr": "TJ",
  "name": "天津",
  "id": 5
}, {
  "pinyin": "qingdao",
  "is_map": true,
  "longitude": 120.382988,
  "latitude": 36.066231,
  "sort": 15,
  "area_code": "0532",
  "abbr": "QD",
  "name": "青岛",
  "id": 28
}]
var index = 1;
var json = ''
for (let i = 0; i < data.length; i++) {
  json += `{"id":${index},"name":"${data[i].name}","abbr":"${data[i].abbr}","area_code":"${data[i].area_code}","pinyin": "${data[i].pinyin}", "is_map": ${data[i].is_map}, "longitude": ${data[i].longitude}, "latitude": ${data[i].latitude},"sort": ${data[i].sort}}\n`
  index++;
}
fs.writeFileSync('./hotcitys.json', json);