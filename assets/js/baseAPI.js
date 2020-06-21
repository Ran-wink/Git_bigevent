// jq封装好的函数 之间可以用来调用
// 每次调用get,post,ajax的时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    options.url='http://ajax.frontend.itheima.net'+options.url;
})