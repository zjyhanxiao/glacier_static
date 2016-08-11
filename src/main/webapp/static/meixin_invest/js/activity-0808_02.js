<<<<<<< HEAD
var countdown = 6;
var yzm = $("#yzm");
yzm.click(function () {
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
    }

    stop = setInterval(function () {
        setTime(yzm);
    }, 1000);
    if( countdown==0){
        clearInterval(stop);
    }
});

$(function () {
    $('#yzm').click(function () {
        var data = {"phone": "+86 " + $('#phone').val()};
        $.ajax({
            type: "get",
            url: "http://101.201.112.171/sendVerifyCode",
            data: data,
            success: function (result) {
                $('#yzm').val(result.vertify_code);
            }
        });
    });

    $('#signUp').click(function () {
        var jsonStr = $.cookie("key_cookie");
        var data = {
            "phone": "+86 " + $('#phone').val(),
            "verify_code": $("#id_verify").val(),
            "password": $("#pwd").val(),
            "email": $("#email").val(),
            "questions": jsonStr
        };
        $.ajax({
            type: 'post',
            url: "http://101.201.112.171/simple_signup",
            data: data,
            success: function (res) {
                console.log(JSON.stringify(res));
                if (res.code == 1) {
                    $("form").remove();
                    $("div").remove(".bg-logo");
                    $('.mian').append("<p style='font-size: 18px; color: #0d2a78; letter-spacing: 1px; text-align: center; padding-top: 230px;'>"+ '恭喜您' + res.msg + "<br>" + '您的抽奖码:' + res.no + "</p>"
                        + "<p style='font-size: 15px;color: #666; line-height: 20px; text-align: center; padding: 0 50px;'>" + '请您将此页面展示给我们的工作人员,即可抽取美元奖励!'+"</p>");
                } else if(res.code = -1){
                    $('.mian').append("<p style='font-size: 15px;color: #666; line-height: 20px;" +
                        "text-align: center; padding: 0 50px'>" + res.msg + "</p>");
                }
            }
        })
    })
=======
var countdown = 6, b_checkPhone = false, b_checkPwd = false, b_checkEmail = false, b_verify_code = false;

console.log(b_checkPhone);
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
                console.log(countdown);
            }

            stop = setInterval(function () {
                setTime($('#yzm'));
            }, 1000);
            if (countdown == 0) {
                clearInterval(stop);
            }
            $.ajax({
                type: "get",
                url: "http://101.201.112.171//sendVerifyCode",
                data: data,
                success: function (result) {
                    $('#signUp').click(function () {
                        checkPhone() && checkPwd() && checkEmail();
                        var jsonStr = $.cookie("key_cookie");
                        var data = {
                            "phone": "+86 " + $('#phone').val(),
                            "verify_code": $("#id_verify").val(),
                            "password": $("#pwd").val(),
                            "email": $("#email").val(),
                            "questions": jsonStr
                        };
                        if ($("#id_verify").val().length >= 6) {
                            b_verify_code = true;
                        }
                        if (b_checkPhone && b_checkPwd && b_checkEmail && b_verify_code) {
                            $.ajax({
                                type: 'post',
                                url: "http://101.201.112.171/simple_signup",
                                data: data,
                                success: function (res) {
                                    console.log(JSON.stringify(res));
                                    if (res.code == 1) {
                                        $("form").remove();
                                        $("div").remove(".bg-logo");
                                        $('.mian').append("<p style='font-size: 18px; color: #0d2a78; letter-spacing: 1px; text-align: center; margin: 0 auto; padding-top: 230px; line-height: 2em;'>" + '恭喜您' + res.msg + "<br>" + '您的抽奖码:' + res.no + "</p>"
                                            + "<p style='font-size: 15px;color: #666; margin: 0 auto; line-height: 20px; text-align: center; padding: 0 50px;'>" + '请您将此页面展示给我们的工作人员,即可抽取美元奖励!' + "</p>");
                                    } else if (res.code = -1) {
                                       /* $('.mian').append("<p style='font-size: 15px;color: #666; line-height: 20px;" +
                                            "text-align: center; padding: 0 50px'>" + res.msg + "</p>");*/
                                       $('#infor').html(res.msg);
                                    }
                                }
                            })
                        }
                        return false;
                    })
                }
            });
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
            // alert("请输入正确的手机号码");
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
        var emailEle = document.getElementById("email");
        var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!reg.test(emailEle.value)) {
            $("#pwd").after("<p style='text-align: center; color: #900'>邮箱格式不正确</P>");
            $("#pwd").focus(function () {
                $("#pwd").next('p').remove();
            });
            return false;
        } else {
            b_checkEmail = true;
        }
        return true;
    }

>>>>>>> c47294a9ff283526e01c9874bda3f94927c2fe14
});