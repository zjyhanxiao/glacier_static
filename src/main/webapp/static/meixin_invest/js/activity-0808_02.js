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
            // console.log(countdown);
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
            url: "http://124.65.197.114:8080/sendVerifyCode",
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
            url: "http://124.65.197.114:8080/simple_signup",
            data: data,
            success: function (res) {
                console.log(JSON.stringify(res));
                if (res.code == 1) {
                    $("form").remove();
                    $("div").remove(".bg-logo");
                    // $('body').html(res.msg + res.no);
                    $('.mian').html(res.msg + res.no);
                } else if(res.code = -1){
                    // $('body').html(res.msg);
                    $('.mian').html(res.msg);
                }
            }
        })
    })
});