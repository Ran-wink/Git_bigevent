$(function(){
    // 先获取
    var form=layui.form;
    var layer=layui.layer;
    //使用layui 自定义验证
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 获取用户基本信息
    // 1直接使用ajax获取渲染到form页面
    // 2点击提交修改 再使用ajax发送到服务器
    // 3首页中用户的信息也要局部更新渲染
    initUserInfo();
    function initUserInfo(){
        $.ajax({
            method:'get',
            // 记得调用baseAPI
            url:'/my/userinfo',
            success:function(res){
                // console.log(res);
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                // // 渲染到页面
                // $('[name=username]').val(res.data.username);
                // $('[name=nickname]').val(res.data.nickname);
                // $('[name=email]').val(res.data.email);
                // $('[name=id]').val(res.data.id);
                form.val('formuserinfo',res.data)
            }
        })
    }
   
    // 重置
    $('#btnreset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    })
    // 提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面的方法 重新渲染
                window.parent.getUserInfo()
            }
        })
    })
})
