/**
 * Created by admin on 2016/8/22.
 */
$(function () {
    //手机号登录
    if ($('#reset_type_phone').hasClass('active')){
        $('#login').click(function () {
            var data = {};
            data.user_name = $('#id_telephone').val();
            data.password = $('#password').val();
            console.log(data);
            $.ajax({
                type: 'post',
                url: "http://101.201.112.171:8082/web/auth/login",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        alert(res.msg);
                    } else if (res.code = -1) {
                        alert(res.msg);
                    }
                }
            })
        });
    }
    if($('#reset_type_email').hasClass('active')){
        $('#login').click(function () {
            alert($('#email').val());
            var data = {};
            data.user_name = $('#email').val();
            data.password = $('#password').val();
            console.log(data);
            $.ajax({
                type: 'post',
                url: "http://101.201.112.171:8082/web/auth/login",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        alert(res.msg);
                    } else if (res.code = -1) {
                        alert(res.msg);
                    }
                }
            })
        });
    }




});