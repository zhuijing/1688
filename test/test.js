var request = require('request');
var cheerio = require('cheerio');
request('https://www.amazon.com/Samsung-MicroSD-Adapter-MB-ME128GA-AM/dp/B06XWZWYVP/ref=sr_1_1?fst=as%3Aoff&pf_rd_i=16225007011&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=74069509-93ef-4a3c-8dca-a9e3fa773a64&pf_rd_r=MSM5D7SRK8NJXTFBQTSM&pf_rd_s=merchandised-search-4&pf_rd_t=101&qid=1560564274&rnid=16225007011&s=computers-intl-ship&sr=1-1',function(err,res,body) {
console.log(err,'err')  
var $1 = cheerio.load(body);
var reg = /\._.*_/g
  var ztImgs = $1('#altImages .a-unordered-list').find('.item img');
  [].slice.call(ztImgs).forEach(v => {
    console.log('主图： ' + v && v.attribs && v.attribs.src.replace(reg,''))
  })
  var xqImgs = $1('#aplus img');
  [].slice.call(xqImgs).forEach(v => {
    console.log('详情: ' + v && v.attribs && v.attribs.src.replace(reg,''))
  })
})