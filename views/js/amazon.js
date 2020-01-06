// 页面js模块
var dom = document.querySelector('#amazon')
  var downbtn = dom.querySelector('#downbtn'); // 下载
  var addInput = dom.querySelector('#addInput');// 添加一行
  var resetBtn = dom.querySelector('#reset'); //重置
  var clearInput = dom.querySelector('#clearInput'); //重置
  var oUl = dom.querySelector('ul');
  var isContinue = true;
  function addLi () {
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
      oUl.appendChild(li) ;
  }
  function download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:application/json,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  }
  addInput.onclick =function(){
    var aInputs = dom.querySelectorAll('.ul-list input');
    if(aInputs.length > 20) {
      var myNotification = new Notification('提示', {
        body: '为了保障效率,一次不能大于10条'
      })
    } else {
      addLi()
    }
  }
  // 给删除按钮添加时间，利用事件代理
  oUl.onclick = function(ev) {
    var target = ev.target;
    if (target.innerHTML === '删除') {
      oUl.removeChild(target.parentNode)
    }
  }
  function handleAddress() {
    var aInputs = dom.querySelectorAll('.ul-list input');
    const aInputsLen = aInputs.length;
    var arr = [];
    for(var i = 0; i < aInputsLen; i ++) {
      if(!aInputs[i].value) {
          aInputs[i].style.border ='1px solid red';
          isContinue = false;
          break;
        }
        aInputs[i].style.border ='1px solid #ccc';
        var obj = {};
        if(i % 2 == 0) {
            obj.dirname = aInputs[i].value; 
            arr.push(obj)
        } else {
            arr[arr.length-1].url = aInputs[i].value;
        }
    }
    return arr;
  }
  function handleCheckbox() {
    var aInputs = dom.querySelectorAll('.btn-group input:checked');
    var taskInfo = [];
    aInputs.forEach(v => {
      taskInfo.push(v.name)
    })
    return taskInfo
  }
  downbtn.onclick = function (e) {
    var imgsInfo = handleAddress()
    var taskInfo = handleCheckbox()
    if(imgsInfo.length > 0 && isContinue) {
      var myNotification = new Notification('提示', {
        body: '开始下载'
      })
      ipcRenderer.send('loadimgAmazon',{
        imgsInfo,
        taskInfo
      })
    }
    // download('需要爬取的商品地址',JSON.stringify(arr))
  }
  resetBtn.onclick = function(){
    window.location.reload()
  }
  clearInput.onclick = function(){
    var aInputs = dom.querySelectorAll('.ul-list input');
    aInputs.forEach(v => {
      v.value = ''
    })
  }