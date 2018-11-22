/**
 * localStorage 帮助类
 */
class localStorageUtil {
 /**
  * localStorage前缀
  * @return {[type]} [description]
  */
 static _key = (key) => {
   return "ltn_" + key;
 };

 /**
  * 根据key获取localStorage
  * @param  {[type]} key [description]
  * @return {[type]}     [description]
  */
 static get = (key) => {
   return localStorage.getItem(localStorageUtil._key(key));
 };

 /**
  * 设置localStorage
  * @param  {[type]} key [description]
  * @param  {[type]} val [description]
  * @return {[type]}     [description]
  */
 static set = (key, val) => {
   return localStorage.setItem(localStorageUtil._key(key), val);
 };

 /**
  * 删除指定的localStorage
  * @param  {[type]} key [description]
  * @return {[type]}     [description]
  */
 static del = (key) => {
   return localStorage.removeItem(localStorageUtil._key(key));
 };

 /**
  * 清空localStorage
  * @return {[type]} [description]
  */
 static clear = () => {
   return localStorage.clear();
 }
}
export default localStorageUtil;
