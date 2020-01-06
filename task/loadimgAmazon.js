var request = require('request');
var cheerio = require('cheerio');
const fs = require('fs');
function loadimg(params) {
  console.log('params :', params);
  var imgsInfo = params.imgsInfo;
  var taskInfo = params.taskInfo;
  if(imgsInfo instanceof Array) {
    imgsInfo.forEach(imginfo=>{
      var dirname = '../' + imginfo.dirname;
      if(!fs.existsSync(dirname)){
          fs.mkdirSync(dirname)
      }
      if(!imginfo.url ) return;
      request(imginfo.url,function(err,res,body) {
        var $1 = cheerio.load(body);
        var reg = /\._.*_/g;
        var htmlImgs = []
        if(taskInfo.indexOf('zhutu') > -1 || taskInfo.length == 0) {
          var ztImgs = $1('#altImages .a-unordered-list').find('.item img');
          [].slice.call(ztImgs).forEach((imgobj,index) => {
            const imgurl = imgobj && imgobj.attribs && imgobj.attribs.src.replace(reg,'')
            var lastindex = imgurl.lastIndexOf('/');
            var filename = imgurl.slice(lastindex + 1);
            var targetFile = `${dirname}/zt-${index + 1}-${filename}`;
            // console.log('targetFile :', targetFile);
            request(imgurl).pipe(fs.createWriteStream(targetFile))
          })

          var zt2Img = $1('#variation_color_name .a-unordered-list').find('li img');
          [].slice.call(zt2Img).forEach((imgobj,index) => {
            const imgurl = imgobj && imgobj.attribs && imgobj.attribs.src.replace(reg,'')
            var lastindex = imgurl.lastIndexOf('/');
            var filename = imgurl.slice(lastindex + 1);
            var targetFile = `${dirname}/zt-${index + 1}-${filename}`;
            // console.log('targetFile :', targetFile);
            request(imgurl).pipe(fs.createWriteStream(targetFile))
          })
        }

        if(taskInfo.indexOf('xiangqing') > -1) {
          var xqImgs = $1('#aplus img');
          [].slice.call(xqImgs).forEach((imgobj,index) => {
            const imgurl = imgobj && imgobj.attribs && imgobj.attribs.src.replace(reg,'')
            var lastindex = imgurl.lastIndexOf('/');
            var filename = imgurl.slice(lastindex + 1);
            var targetFile = `${dirname}/xq-${index + 1}-${filename}`;
            // console.log('targetFile :', targetFile);
            request(imgurl).pipe(fs.createWriteStream(targetFile))
          })
        }
        })
    
    })
  }
  
}
module.exports = loadimg
