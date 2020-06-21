// jq封装好的函数 之间可以用来调用
// 每次调用get,post,ajax的时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    options.url='http://ajax.frontend.itheima.net'+options.url;
    // 统一为有权限的接口 设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
            // 如果没有token就获取空 为什么获取空呢？
            // 迷惑因为没有token那么获取的是null null是很危险的 很多地方会报错
            // 避免这种情况使用空字符串来代替
            Authorization: localStorage.getItem('token')||'',
        };
        // console.log(options.headers);
    }
     // 控制用户的访问权限

        // 为什么要控制用户登录的权限
        // 因为没有登录 不能跳转到后台
        // jq里面的ajaax发送请求无论成功失败都会执行complete回调函数


        // 为什么要控制用户的访问权限呢 因为恶意攻击
        // 目的让用户必须登录才能进入项目
        // 1这时候就可以验证loken loken也可能会手写
        // 2让服务器来判断token是否正确
        options.complete=function(res){
            // console.log(res);
            if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
            // 验证token 可以理解为验证有没有网卡
            // 这个失败执行那么肯定没有网卡 强制清空
            localStorage.removeItem('token');
            // 但是token也可以手写 强制跳转登录页
            location.href='/login.html'
            }
        }
})
// 统一为有权限的接口 设置headers 请求头
// 为什么要这么做呢
// 因为一些接口需要请求头携带这个身份认证字段 才能成功访问
// 如果每次都这样写的话？会怎样？
// --因为很多地方都要写请求头会很麻烦既然每次请求都会调用那么可以封装在这
// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置