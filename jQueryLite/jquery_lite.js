( function () {

  if (typeof window.root === "undefined") {
    var root = window.root = {};
  }

  var DOMNodeCollection = function (htmlements) {
    this.htmlements = htmlements;
  };

  root.$l = function (arg) {
    if (arg instanceof Function) {
      document.addEventListener("DOMContentLoaded", arg );
    } else if (arg instanceof HTMLElement) {
      var elementList = document.getElementsByTagName(arg);
      var elementArray = [].slice.call(elementList);
      return new DOMNodeCollection(elementArray);
    } else {
      var elementList = document.querySelectorAll(arg);
      var elementArray = [].slice.call(elementList);
      return new DOMNodeCollection(elementArray);
    }
  };

  root.$l.extend = function() {
    var objs = [].slice.call(arguments);
    var blankObj = {};
    for (var i = 0; i < objs.length; i++) {
      for (var attrname in objs[i]) { blankObj[attrname] = objs[i][attrname]; }
    }
    return blankObj;
  };

  // root.$l.ajax = function (request) {
  //   var defaults = {
  //     success:
  //     error:
  //     url:
  //     method:
  //     data:
  //     contentType:
  //   }
  //
  //   var xmlhttp = new XMLHttpRequest();
  //
  //   xmlhttp.onreadystatechange = function() {
  //       if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
  //          if(xmlhttp.status === 200){
  //             console.log("status 200");
  //          }
  //          else if(xmlhttp.status === 400) {
  //             alert('There was an error 400');
  //          }
  //          else {
  //             alert('something else other than 200 was returned');
  //          }
  //       }
  //   };
  //
  //   xmlhttp.open(request[type], request[url], true);
  //   xmlhttp.send();
  // };

  DOMNodeCollection.prototype.html = function (str) {
    if (typeof str === "undefined") {
      return this.htmlements[0].innerHTML;
    } else {
      for(var i = 0; i < this.htmlements.length; i++) {
        this.htmlements[i].innerHTML = str;
      }
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    for(var i = 0; i < this.htmlements.length; i++) {
      this.htmlements[i].innerHTML = "";
    }
  };

  DOMNodeCollection.prototype.append = function (items) {
    if (items instanceof DOMNodeCollection) {
      for(var i = 0; i < this.htmlements.length; i++) {
        for (var j = 0; j < items.htmlements.length; j++) {
          this.htmlements[i].innerHTML += items.htmlements[j].outerHTML;
        }
      }
    } else if (items instanceof HTMLElement) {
      for(var i = 0; i < this.htmlements.length; i++) {
        this.htmlements[i].innerHTML += items.outerHTML;
      }
    } else {
      for(var i = 0; i < this.htmlements.length; i++) {
        this.htmlements[i].innerHTML += items;
      }
    }
  };

  DOMNodeCollection.prototype.children = function () {
    var arr = [];
    for(var i = 0; i < this.htmlements.length; i++) {
      var childs = this.htmlements[i].children;
      for (var j = 0; j < childs.length; j++) {
        arr.push(childs[j]);
      }
    }
    return new DOMNodeCollection (arr);
  };

  DOMNodeCollection.prototype.parent = function () {
    var arr = [];
    for(var i = 0; i < this.htmlements.length; i++) {
      arr.push(this.htmlements[i].parentElement);
    }
    return new DOMNodeCollection (arr);
  };

  DOMNodeCollection.prototype.find = function (selectors) {
    var arr = [];
    for(var i = 0; i < this.htmlements.length; i++) {
      var matches = this.htmlements[i].querySelectorAll(selectors);
      for (var j = 0; j < matches.length; j++) {
        arr.push(matches[j]);
      }
    }

    return new DOMNodeCollection (arr);
  };

  DOMNodeCollection.prototype.remove = function () {
    for(var i = 0; i < this.htmlements.length; i++) {
      // debugger
      var parent = this.htmlements[i].parentElement;
      parent.removeChild(this.htmlements[i]);
      // debugger
    }

    this.htmlements = [];
  };

  DOMNodeCollection.prototype.on = function (type, listener) {
    for(var i = 0; i < this.htmlements.length; i++) {
      this.htmlements[i].addEventListener(type, listener);
    }
  };

  DOMNodeCollection.prototype.off = function (type, listener) {
    for(var i = 0; i < this.htmlements.length; i++) {
      this.htmlements[i].removeEventListener(type, listener);
    }
  };

  DOMNodeCollection.prototype.methodName = function () {

  };

})();
