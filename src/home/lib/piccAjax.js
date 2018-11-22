//import $ from 'jquery';
// 参数为地址，参数，回调，遮罩，消息，同步 ----- 其中回调为数组时，第一个为成功，第二个为完成，错误采用统一方法
window.piccAjax = (url,para,callback,value,method,mask,msg,sync)=>{
    let param={...para},
        pUrl='http://jkejt.picchealth.com:20000',
        baseUrl='http://jkejt.picchealth.com:20000';
    if(url.indexOf('http')!=0){
        if(value == 'P'){
            url=pUrl+url
        }else{
            url=baseUrl+url
        }
    }
    $.ajax({
        contentType: 'application/json',
        dataType:'json',
        async:!sync,
        type: method || 'POST' ,
        url:url,
        cache:false,
        data:JSON.stringify(param),
        beforeSend(){
            if(mask) popalert.waitstart();
        },
        success(data){
            if(msg) console.log(data);
            if(typeof callback == 'function') callback(data);
            else if(typeof callback == 'object') callback[0](data);
        },
        error(err){
            console.log(err,'err');
            if(typeof callback == 'object' && typeof callback[2] == 'function') callback[2]();
        },
        complete(){
            if(typeof callback == 'object' && typeof callback[1] == 'function') callback[1]();
        }
    });
};

