
$(document).ready(function() {
    $("#login").attr('href', URL_LOGIN);
    $('#contract').iCheck({
            cursor : true,
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%',
    });

    $("#terms").click(function(){
        window.location.href = URL_TERMS;
    })
    $("#privacy").click(function(){
        window.location.href = URL_PRIVACY;
    })

    function check() {
        $("#hint").text("");
        $("#btn-submit").attr("disabled", false);
        if (!isPhone($("#input-phone").val())) {
            $("#hint").text("手机号码格式不正确");
            $("#btn-submit").attr("disabled", true);
            return ;
        }
        if (!isMail($("#input-mail").val())) {
            $("#hint").text("邮箱格式不正确");
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
        if ($("#input-password").val() != $("#input-password-check").val()) {
            $("#hint").text("两次输入的密码不一致");
            $("#btn-submit").attr("disabled", true);
            return ;
        }
        if (!$("#contract").is(':checked')) {
            $("#hint").text("请同意美信协议及隐私条款");
            $("#btn-submit").attr("disabled", true);
            return ;
        }
    }

    function send(s, t) {
        t.attr('disabled', true);
        $.get(API_GET_VERIFY_CODE, {type:0, phone: escape(s), mail: s, scenario: 'register'}, function(data){
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
            url: API_REGISTER,
            dataType: 'json',
            method: 'POST',
            data: form,
            success: function(data) {
                if (data.status == 200) {
                    $.cookie('access_token', data['access_token'], {expires:7, path: '/'});
                    window.location.href = URL_ADV;
                } else if (data.status == 1002) {
                    $("#hint").text("该邮箱或手机号码已被使用");
                } else if (data.status == 1001) {
                    $("#hint").text("该手机号码已被使用");
                } else if (data.status == 1000) {
                    $("#hint").text("该邮箱已被使用");
                } else if (data.status == 2001) {
                    $("#hint").text("手机验证码错误");
                } else if (data.status == 2000) {
                    $("#hint").text("邮箱验证码错误");
                } else {
                    $("#hint").text("注册失败");
                }
                t.attr('disabled', false);
            },
            fail: function(){
                $("#hint").text("注册失败");
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
    $("#input-mail").change(function(){check();});
    $("#input-code").change(function(){check();});
    $("#input-password").change(function(){check();});
    $("#input-password-check").change(function(){check();});
    $("#contract").on('ifChanged', function(e){check();});

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

    $("#btn-code-mail").click(function(){
        var s = $("#input-mail").val();
        if (s.length > 0) {
            if (isMail($("#input-mail").val())) {
                send(s, $(this));
            } else {
                $("#hint").text("邮箱格式不正确");
            }
        } else {
            $("#hint").text("请输入邮箱");
        }
    });

    $("#btn-submit").click(function(){
        var data = {type:0};
        data['password'] = $("#input-password").val();
        if (data['password'].length == 0) {
            $("#hint").text("请输入密码");
        }
        data['code'] = $("#input-code").val();
        if (data['code'].length == 0) {
            $("#hint").text("请输入验证码");
        }
        data['phone'] = $("#input-phone").val();
        if (data['phone'].length == 0) {
            $("#hint").text("请输入手机号码");
            return ;
        }
        data['phone'] = $("#s_region option:selected").val() + data['phone']
        data['mail'] = $("#input-mail").val();
        if (data['mail'].length == 0) {
            $("#hint").text("请输入邮箱");
            return ;
        }
        submit(data, $(this));
    });
})
