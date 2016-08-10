var countdown = 6;
var yzm = $("#yzm");
yzm.click(function () {
    var stop;
    var countdown = 6;

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
            console.log(countdown);
            myVal.prop("disabled", true);
            myVal.val("" + countdown + 's' + "");
        }
    }

    stop = setInterval(function () {
        setTime(yzm);
    }, 1000)
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
            "verifyCode": $("#id_verify").val(),
            "password": $("#pwd").val(),
            "email": $("#email").val(),
            "questions": jsonStr
        };
        $.ajax({
            type: 'post',
            url: "http://101.201.112.171/simple_signup",
            data: data,
            success: function (res) {
                if (res.code == 1) {
                    console.log(res.msg);
                } else {

                }
            }
        })
    })
});