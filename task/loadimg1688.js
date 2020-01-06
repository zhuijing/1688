var request = require('request');
var cheerio = require('cheerio');
var gm = require('gm');//一定要加imageMagick: true，否则会报错
var fs = require('fs');
var iconv = require('iconv-lite')
var options = {
    url:'',
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.6726.400 QQBrowser/10.2.2265.400',
        'upgrade-insecure-requests':1,
        'cache-control': 'max-age=0',
        'accept': 'text/html',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
    },
    encoding:null
}

function loadimg(params) {
  var arr = params.imgsInfo;
  var taskInfo = params.taskInfo;
  if(arr instanceof Array) {
    arr.forEach(v=>{
      options.url = v.url;
      var dirname = '../' + v.dirname;
      if(!fs.existsSync(dirname)){
          fs.mkdirSync(dirname)
      }
      if(!options.url) return;
      request.get(options,function (error, response, body) {
        var html=iconv.decode(body,'gb2312');
          if(error){
              return;
          }
          const $1 = cheerio.load(html, {
            normalizeWhitespace: false,
            xmlMode: false,
            decodeEntities: true
          });
          fs.writeFile(dirname +'/信息.txt',`
            产品地址：${options.url} \r
            标题：${$1('#mod-detail-title .d-title').text() }
          `,function(err) {
            console.log(err)
          })
          if(taskInfo.indexOf('zhutu') > -1 || taskInfo.length == 0) {
            // 获取主图
            var imgs1 = [];
            var html = $1('.nav-tabs').find('li');
            Array.from(html).map(v=>{
                var str = v && v.attribs && v.attribs['data-imgs'] || JSON.stringify({original:''});
                var original = JSON.parse(str).original
                if(original){
                  imgs1.push( original)
                }
            })
            imgs1.forEach((v,index)=>{
                var lastindex = v.lastIndexOf('/');
                var filename = v.slice(lastindex+1);
                var targetFile = `${dirname}/zt-${index + 1}-${filename}`;
                // request(v).pipe(fs.createWriteStream(targetFile))

                try {
                   gm(request(v))
                  .resize(1001, 1001)
                  .write(targetFile, function (err) {
                      if(err) {
                        console.log(err,'err')
                      }
                      if (!err) console.log('图片修改完成');
                  });
                } catch(e) {
                  request(v).pipe(fs.createWriteStream(targetFile))
                }
            })
          }
          if(taskInfo.indexOf('xiangqing') > -1) {
            //获取详情图['data-tfs-url']
            var imgs2 = []
            var xiangUrls = $1('#desc-lazyload-container')[0].attribs['data-tfs-url'];
            request(xiangUrls,function(err,res,body) {
              eval(body);
              var $xiangqingImgs = cheerio.load(offer_details.content);
              var imgUrls = $xiangqingImgs('img');
              Array.from(imgUrls).forEach(v=>{
                  var original = v && v.attribs && v.attribs.src;
                  if(original){
                      imgs2.push( original)
                  }
              })
              imgs2.forEach((v,index)=>{
                var lastindex = v.lastIndexOf('/');
                var filename = v.slice(lastindex+1);
                var targetFile = `${dirname}/xqt-${index + 1}-${filename}`;
                request(v).pipe(fs.createWriteStream(targetFile))
              })
            })
          }
        });
  })
  }
}
module.exports = loadimg

