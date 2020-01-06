(function(window){
  const fs = require('fs');
  function Load(container,page) {
    this.container = document.querySelector(container);
    this.pageConfig = page;
  }
  Load.prototype = {
    _loadPage() {
      this.container.innerHTML = fs.readFileSync(this.pageConfig.html);
    },
    _loadCss() {
      var oFragmeng = document.createDocumentFragment();
      const { css } = this.pageConfig;
      if(!css.length) return;
      css.forEach(v => {
        var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = v;
            oFragmeng.appendChild(link);
      })
      // 在index.html里面加上一个link标签引入样式
      document.head.appendChild(oFragmeng);
    },
    _loadJs() {
      var oFragmeng = document.createDocumentFragment();
      const { js } = this.pageConfig;
      if(!js.length) return;
      js.forEach(v => {
        var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = v;
            oFragmeng.appendChild(script);
      })
      // 在index.html里面加上一个link标签引入样式
      document.head.appendChild(oFragmeng);
    },
    _init() {
      this._loadPage();
      this._loadCss();
      this._loadJs();
      document.title = this.pageConfig.title;
    }
  }
  window.Load = Load;
})(window)