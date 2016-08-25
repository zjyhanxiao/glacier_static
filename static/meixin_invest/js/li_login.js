/**
 * Created by admin on 2016/8/22.
 */
$(function () {
    $("#login").on('click',function() {
        var data = {};
        if($('#general').hasClass('active')){
            data.user_name = $('#id_telephone').val();
            data.password = $('#password').val();
            if ($('#id_telephone').val().length<6) {
                alert("请输入手机号");
                return false;
            }
            else if ($('input[type="password"]').val() == '') {
                alert("请输入密码");
                return false;
            }
            else {
                $.ajax({
                    type: 'post',
                    url: baseUrl + "/auth/login",
                    data: data,
                    success: function (res) {
                        if (res.code == 1) {
                            window.location.href = '/web/index.html';
                        } else if (res.code != 1) {
                            $("#error-place").html("<div style='text-align: center;' class='alert alert-warning'>" + res.msg +"</div>");
                        }
                    }
                })
            }
        }

        var data1 = {};
        if($('#invest').hasClass('active')){
            data1.user_name = $('#email').val();
            data1.password = $('#password').val();
            var val = $('#email').val();
            if (val.indexOf('@') <= 0) {
                alert("请输入正确的邮箱格式");
                return false;
            }
            else if ($('input[type="password"]').val() == '') {
                alert("请输入密码");
                return false;
            }
            else {
                $.ajax({
                    type: 'post',
                    url: baseUrl + "/auth/login",
                    data: data1,
                    success: function (res) {
                        if (res.code == 1) {
                            window.location.href = '/web/index.html';
                        } else if (res.code != 1) {
                            $("#error-place").html("<div style='text-align: center;' class='alert alert-warning'>" + res.msg + "</div>");
                        }
                    }
                })
            }
        }
        return false;
    });

});