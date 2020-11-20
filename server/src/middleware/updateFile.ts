import * as path from 'path'
import * as fs from 'fs'
import * as multer from 'koa-multer'

function mkdir(){
  let root = path.join(__dirname, '../public/upload/');
  return root;
}

export const update = () => {
  let storage = multer.diskStorage({
    //文件保存路径
      destination: function (req, file, cb) {
        let path = mkdir()
        cb(null, path) //注意路径必须存在
      },
      //修改文件名称
      filename: function (req, file, cb) {
        //获取后缀名
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
      }
  })
  return multer({ storage })
}