var b_checkPhone = false, b_checkPwd = false, b_checkEmail = false, b_verify_code = false;

//console.log(b_checkPhone);

$(function () {
    $('#yzm').click(function () {
        var data = {"phone": "+86 " + $('#phone').val()};
        checkPhone();
        if (b_checkPhone) {
            var stop;
            var countdown = 60;

            function setTime(myVal) {
                if (countdown == 0) {
                    myVal.prop("disabled", false);
                    myVal.val("获取验证码");
                    clearInterval(stop);
                    myVal.css('border', '1px solid #0d2a78');
                    countdown = 60;
                } else {
                    myVal.css('border', ' 0px');
                    --countdown;
                    myVal.prop("disabled", true);
                    myVal.val("" + countdown + 's' + "");
                }
                // console.log(countdown);
            }

            stop = setInterval(function () {
                setTime($('#yzm'));
            }, 1000);
            if (countdown == 0) {
                clearInterval(stop);
            }
            $.ajax({
                type: "post",
                url: baseUrl + "/verify_code/send",
                data: data,
                success: function (result) {
                }
            });
        }
        return false;
    });

    $('#signUp').click(function () {
        $('p').remove();
        checkPhone() && checkPwd() && checkEmail();
        var jsonStr = $.cookie("key_cookie");
        var source = $.cookie("source");
        console.log(jsonStr);
        var data = {
            "phone": "+86 " + $('#phone').val(),
            "verify_code": $("#id_verify").val(),
            "password": $("#pwd").val(),
            "email": $("#email").val(),
            "questions": jsonStr,
            "source":source
        };
        if ($("#id_verify").val().length >= 6) {
            b_verify_code = true;
        }
        if (b_checkPhone && b_checkPwd && b_checkEmail && b_verify_code) {
            $.ajax({
                type: 'post',
                url: baseUrl + "/auth/signup",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        window.location.href = '/';
                    } else if (res.code = -1) {
                        $('#infor').html(res.msg);
                    }
                }
            })
        }
        return false;
    });

//位手机号码11
    function checkPhone() {
        var phoneEle = document.getElementById("phone");
        var reg = /\d{11}/;
        if (!reg.test(phoneEle.value)) {
            $("#phone").after("<p style='text-align: center; color: #900'>请输入正确的手机号码</P>");
            $("#phone").focus(function () {
                $("#phone").next('p').remove();
            });
            return false;
        }
        else {
            b_checkPhone = true;
        }
        return true;
    }

//密码: 至少包含 6 个字符
    function checkPwd() {
        var pwdEle = document.getElementById("pwd");
        if (pwdEle.value.length < 6) {
            $("#pwd").after("<p style='text-align: center; color: #900'>密码长度不能小于6位</P>");
            $("#pwd").focus(function () {
                $("#pwd").next('p').remove();
            });
            return false;
        } else {
            b_checkPwd = true;
            return true;
        }
    }


//电子邮箱: 必须满足邮箱格式
    function checkEmail() {
        var val = $('#email').val();
        if (val.indexOf('@') <= 0) {
            $("#email").after("<p style='text-align: center; color: #900'>邮箱格式不正确</P>");
            $("#email").focus(function () {
                $("#email").next('p').remove();
            });
            return false;
        } else {
            b_checkEmail = true;
        }
        return true;
    }

});