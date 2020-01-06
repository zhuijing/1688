(function() {
  function Operate(id) {
    this.dom = document.querySelector(id);
    this.downbtn = this.dom.getElementById('downbtn'); // 下载
    this.addInput = this.dom.getElementById('addInput');// 添加一行
    this.resetBtn = this.dom.getElementById('reset'); //重置
    this.clearInput = this.dom.getElementById('clearInput'); //重置
    this.oUl = this.dom.getElementById('ul');
    this.isContinue = true;
  }
  Operate.prototype = {
    addLi() {
      var li = document.createElement('li');
      li.className = 'li-item';
      var labledir = document.createElement('lable');
      var lableurl = document.createElement('lable');
      var textdir = document.createTextNode('图片保存至');
      var texturl = document.createTextNode('产品地址');
      var inputdir = document.createElement('input');
      var inputurl = document.createElement('input');
      var delbtn = document.createElement('button');
      delbtn.innerHTML ='删除'
      labledir.appendChild(textdir);
      labledir.appendChild(inputdir);
      lableurl.appendChild(texturl)
      lableurl.appendChild(inputurl);
      li.appendChild(labledir);
      li.appendChild(lableurl);
      li.appendChild(delbtn);
      this.oUl.appendChild(li) ;
    }
  }
  
  window.Operate = Operate;
})

// // 提示保存目录
// var dir = process.cwd();
// var selectDir = document.querySelector('#selectDir');
// var osavedir = document.querySelector('.savedir span');
// osavedir.innerHTML = `保存至：${dir}`;
// selectDir.onchange = function(e) {
//  osavedir.innerHTML = `保存至：${e.target.value}`;
// }