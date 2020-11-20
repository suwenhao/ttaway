var fs = require('fs')
var data = [
  {
    description: "苦了累了，来点甜的",
    icon_url: "",
    id: 1,
    cid: 8,
    image_url: "/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",
    is_in_serving: true,
    title: "甜品饮品",
    title_color: "",
  },
  {
    description: "足不出户，便利回家",
    icon_url: "",
    id: 2,
    cid: 6,
    image_url: "/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg",
    is_in_serving: true,
    title: "商店超市",
    title_color: "",
  },
  {
    description: "足不出户，便利回家",
    icon_url: "",
    id: 2,
    cid: 6,
    image_url: "/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg",
    is_in_serving: true,
    title: "商店超市",
    title_color: "",
  },
]

var index = 1;
var json = ''
for (let i = 0; i < data.length; i++) {
  json += `{"id":${index},"icon_color":"${data[i].icon_color}","icon_name":"${data[i].icon_name}","name": "${data[i].name}"}\n`
  index++;
}
fs.writeFileSync('./catentrys.json', json);