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
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repass:(function(value){
            var pass=$('#pwd').val();
            if(pass!==value){
                return "两次输入的密码不一致"
            }
          })
    })
})