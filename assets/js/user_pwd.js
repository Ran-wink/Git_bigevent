$(function(){
    // 为密码框定义校验规则
    var form=layui.form;
    var layer=layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return layer.msg('新旧密码不能相同！')

            };
        },
        rePwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return layer.msg("两次密码不一致")
            }
        }
    })
    // 发起请求实现重置密码的功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'post', 
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新密码失败！')
                }
                 layer.msg('成功更新密码！')
                 $('.layui-form')[0].reset();
            }
        })
    })
    
})