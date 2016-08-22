/**
 * Created by admin on 2016/8/22.
 */
$(function () {
    //调用登陆接口
    $('#login').click(function () {
        var data = {
            "phone": $('#id_telephone').val(),
            "email":$("#email").val(),
            "password":$("#password").val()
        };
        if(data.length>0){
            $.ajax({
                type: 'post',
                url: "/auth/login",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        alert('登陆成功');
                    } else if (res.code = -1) {
                        alert('登录失败');
                    }
                }
            })
        }


    });


});