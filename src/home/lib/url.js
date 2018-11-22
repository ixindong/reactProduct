/**
 * url帮助类
 */
class urlUtil {

 /**
  * 获取对应的url
  * @return {[type]} [description]
  */
 static getUrl = () => {
   return decodeURI(window.location.pathname + window.location.search +
     window.location.hash);
 }

 /**
  * 获取浏览器hash
  * @return {[type]} [description]
  */
 static getHash = () => {
   return window.location.hash;
 }

 /**
  * 获取对应下标的hash值
  * @param  {[type]} index [description]
  * @return {[type]}       [description]
  */
 static getHashParts = (index) => {
   var hash = urlUtil.getHash().split("/");
   hash.shift();
   return index !== undefined ? hash[index] : hash;
 }

 /**
  * 设置hash
  * @param  {[type]} hashList [description]
  * @return {[type]}          [description]
  */
 static setHash = (hashList) => {
     hashList.unshift(config.baseHash);
     window.location.hash = hashList.join('/');
   }
   /**
    * 获取浏览器中可能会传递过来带有?的页面地址,获取url参数
    */
 static getFromUrl = (param = url) => {
     let param1 = urlUtil.getSearch(param);
     let url = urlUtil.getUrl();
     let param2;
     if (url.split("?").length == 3) {
       param2 = url.split("?")[2];
       return param1 + '?' + param2;
     } else if (url.split("?").length == 2) {
       return param1;
     } else {
       return '';
     }

   }
   /**
    * 根据option获取对应的值
    */
 static getSearch = (option) => {
   var paraStr, paras,
     url = urlUtil.getUrl();
   if (url) {
     paraStr = url.split("?")[1];
     if (paraStr) {
       paras = {};
       paraStr = paraStr.split("&");
       for (var n in paraStr) {
         var name = paraStr[n].split("=")[0];
         var value = paraStr[n].split("=")[1];
         paras[name] = value;
       }
     } else {
       return '';
     }
     if (!option) {
       return paras;
     } else {
       return paras[option] ? paras[option] : "";
     }
   }
 }


 /**
  * 重设url参数取值，若无此参数则进行创建,若参数赋值为null则进行删除
  */
 static setSearch = (option) => {
   let paras = urlUtil.getSearch();
   var i, name, val;
   if (arguments.length == 2) {
     name = arguments[0];
     val = arguments[1];
     option = {
       name: val
     };
   }
   if ("string" === typeof option) {
     paras[option] = "";
   } else if ("object" === typeof option) {
     for (i in option) {
       if (option[i] === null) {
         delete paras[i];
       } else {
         paras[i] = option[i];
       }
     }
   } else {

   }
   return urlUtil.build(paras);
 }

 /**
  * 删除url中指定参数返回新url
  */
 static removeSearch = (option) => {
   let paras = urlUtil.getSearch();
   var i;
   if ("string" === typeof option) {
     option = option.split(",");
     for (i in option) {
       delete paras[option[i]]
     }

   }
   return urlUtil.build(paras);
 }


 /**
  * 根据url和处理过的paras重新构件url
  * @return {[type]} [description]
  */
 static build = (paras) => {
   let url = urlUtil.getUrl();
   let str = url.split("?");
   let pathname = str.length > 0 ? str[0] : '';
   var i,
     newUrl = pathname + "?";

   for (i in paras) {
     newUrl += (i + "=" + paras[i] + "&");
   }

   return newUrl.substr(0, newUrl.length - 1);
 }

}
export urlUtil;
