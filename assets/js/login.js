$(function(){
    $('#link_reg').on('click',function(){
       $('.login-box').hide();
       $('.reg-box').show(); 
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 自定义验证
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repass:(function(value){
            var pass=$('.reg-box #pwd').val();
            if(pass!==value){
                return '两次输入的密码不一致'
            }
          })
    })
    // 注册  表单提交事件
    $('#login_reg').on('submit',function(e){
        // 阻止提交
        e.preventDefault();
        var username=$('#login_reg [name=username]').val();
        var password=$('#login_reg [name=password]').val()
        $.post('/api/reguser',{
            username:username,
            password:password
        },function(res){
            if(res.status!==0){
                // 弹窗
               return layer.msg(res.message);
            }
            layer.msg(res.message);
            $
        })
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        var data=$(this).serialize();
        $.post('/api/login',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // console.log(res.token);
            // 本地存储
            localStorage.setItem('token',res.token);
            location.href='./index.html'
            $('#link_login').click();
        })
    })
})