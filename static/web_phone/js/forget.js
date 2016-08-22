
$(document).ready(function() {
    $("#login").attr('href', URL_LOGIN);
    $('#contract').iCheck({
            cursor : true,
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%',
    });

    function check() {
        $("#hint").text("");
        $("#btn-submit").attr("disabled", false);
        if (!isPhone($("#input-phone").val())) {
            $("#hint").text("手机号码格式不正确");
            $("#btn-submit").attr("disabled", true);
            return ;
        }
        if (!isCode($("#input-code").val())) {
            $("#hint").text("验证码格式不正确");
            $("#btn-submit").attr("disabled", true);
            return ;
        }
        if (!isPassword($("#input-password").val())) {
            $("#hint").text("密码必须为6~20个字符，不能全数字")
            $("#btn-submit").attr("disabled", true);
            return ;
        }
    }

    function send(s, t) {
        t.attr('disabled', true);
        $.get(API_GET_VERIFY_CODE, {type:0, phone: escape(s), mail: s, scenario: 'reset password'}, function(data){
            if (data.status == 200) {
                function time(clock) {
                    if (clock > 0) {
                        setTimeout(function(){time(clock-1)}, 1000);
                        t.text(clock+'s');
                    } else {
                        t.text("获取验证码");
                        t.attr('disabled', false);
                    }
                }
                time(30);
            } else {
                $("#hint").text("获取验证码失败");
                t.attr('disabled', false);
            }
        }, 'json').fail(function(){
            $("#hint").text("获取验证码失败");
            t.attr('disabled', false);
        });
    }

    function submit(form, t) {
        t.attr('disabled', true);
        $.ajax({
            url: API_FORGET,
            dataType: 'json',
            method: 'POST',
            data: form,
            success: function(data) {
                if (data.status == 200) {
                    $("#hint").text("修改成功");
                    window.location.href = URL_LOGIN;
                } else if (data.status == 2001) {
                    $("#hint").text("手机验证码错误");
                }
                t.attr('disabled', false);
            },
            fail: function(){
                $("#hint").text("验证失败");
                t.attr('disabled', false);
            },
            beforeSend: function(xhr, settings) {
                var csrftoken = $.cookie('csrftoken');
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        });
    }

    $("#input-phone").change(function(){check();});
    $("#input-code").change(function(){check();});
    $("#input-password").change(function(){check();});

    $("#btn-code-phone").click(function(){
        var s = $("#input-phone").val();
				var region = $("#s_region option:selected").val()
        if (s.length > 0) {
            if (isPhone($("#input-phone").val())) {
                send(region+s, $(this));
            } else {
                $("#hint").text("手机号码格式不正确");
            }
        } else {
            $("#hint").text("请输入手机号码");
        }
    });

    $("#btn-submit").click(function(){
        var data = {type:0};
        data['password'] = $("#input-password").val();
        if (data['password'].length == 0) {
            $("#hint").text("请输入密码");
        }
				data['new_pwd'] = data['password']
        data['code'] = $("#input-code").val();
        if (data['code'].length == 0) {
            $("#hint").text("请输入验证码");
        }
        data['phone'] = $("#input-phone").val();
        if (data['phone'].length == 0) {
            $("#hint").text("请输入手机号码");
            return ;
        }
				data['phone'] = $("#s_region option:selected").val() + data['phone'];
        submit(data, $(this));
    });
})
