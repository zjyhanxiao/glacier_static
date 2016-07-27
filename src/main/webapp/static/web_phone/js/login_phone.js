$(document).ready(function() {
    $("#register").attr('href', URL_REGISTER);
		$("#phone").attr('href', URL_LOGIN);
		$("#forget").attr('href', URL_FORGET);
    function check() {
        $("#hint").text("");
        $("#btn-submit").attr("disabled", false);
        if (!isPhone($("#input").val())) {
            $("#hint").text("手机号码格式不正确");
            $("#btn-submit").attr("disabled", true);
        }
        if (!isPassword($("#input-password").val())) {
            $("#hint").text("密码格式不正确")
            $("#btn-submit").attr("disabled", true);
        }
    }

    function submit(form, t) {
        t.attr('disabled', true);
        $.ajax({
            url: API_LOGIN,
            dataType: 'json',
            method: 'POST',
            data: form,
            success: function(data) {
                if (data.status == 200) {
                    $.cookie('access_token', data['access_token'], {expires:7, path: '/'});
                    window.location.href = URL_ADV;
                } else if (data.status == 201) {
                    $("#hint").text("密码或手机号不正确，请重新输入");
                } else {
                    $("#hint").text("密码或手机号不正确");
                }
                t.attr('disabled', false);
            },
            error: function(){
                $("#hint").text("密码或手机号不正确");
                t.attr('disabled', false);
            },
            beforeSend: function(xhr, settings) {
                var csrftoken = $.cookie('csrftoken');
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        });
    }

    $("#input").change(function(){check();});
    $("#input-password").change(function(){check();});

    $("#btn-submit").click(function(){
        var data = {'grant_type':'password'};
        data['username'] = $("#input").val();
        if (data['username'].length == 0) {
            $("#hint").text("请输入手机号码");
            return ;
        }
				data['username'] = $("#s_region option:selected").val() + data['username']
        data['password'] = $("#input-password").val();
        if (data['password'].length == 0) {
            $("#hint").text("请输入密码");
            return ;
        }
        submit(data, $(this));
    });
})
