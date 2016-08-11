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
});