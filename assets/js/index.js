$(function () {
    getUserInfo();
    // 实现退出功能
    // 点击退出标签 使用layui弹出确认框 
    // 为什么要清空token呢？--暂时理解为用户退出 那么他就需要退出吧
    var layer=layui.layer;
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
           localStorage.removeItem('token');
           location.href='/login.html'
            
            layer.close(index);
          });
    })
    // 跳转到登录页面
})
    // 获取用户基本信息信息 怎么获取用户的基本信息呢
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    //     // 那么直接返回失败  使用弹窗
                    //     return res.message
                    return layui.layer.msg(res.message);
                }
                renderAvatar(res.data);

            }
        })
    }
    // 渲染用户头像 用户名称
    function renderAvatar(data){
        var name=data.nickname||data.username;
        $('.welcome').html('欢迎 &nbsp;&nbsp;'+name);
        // 先判断图片头像是否存在 
        // 存在渲染页面 隐藏文字头像
        // 不存在则渲染文字头像 隐藏图片头像
        // 使用username的首字母大写渲染
        // ------隐藏不占位置？？？迷惑点--多复习一下之前的知识！！
        if(data.user_pic!==null){
            $('.text-avatar').hide();
            $('.layui-nav-img').attr('src',data.user_pic).show();
        }else{
            $('.layui-nav-img').hide();
            var first=name[0].toUpperCase();
            $('.text-avatar').html(first).show();
            
        }
    }