/**
 * Created by admin on 2016/8/22.
 */
// clear cookie
$.cookie('mx_token', '', {expires: -1});
$.cookie('mx_secret', '', {expires: -1});
$(function () {
    $("#login").on('click',function() {
        var data = {};
        if($('#general').hasClass('active')){
            data.user_name = $('#id_telephone').val();
            data.password = $('#password').val();
            if ($('#id_telephone').val().length<6) {
                $("#id_telephone").css("border-color","#ff0000");
                return false;
            }
            if ($('input[type="password"]').val() == '') {
                $("#password").css("border-color","#ff0000");
                return false;
            }
            else {
                $("#login").prop('disabled',true);
                $.ajax({
                    type: 'post',
                    url: baseUrl + "/auth/login",
                    data: data,
                    success: function (res) {
                        if (res.code == 1) {
                            $("#login").prop('disabled',false);
                            var mx = res.body;
                            $.cookie('mx_token', mx.mx_token, {expires: 30});
                            $.cookie('mx_secret', mx.mx_secret, {expires: 30});
                            window.location.href = '/';
                        } else if (res.code != 1) {
                            $("#login").prop('disabled',false);
                            $("#error-place").html("<div style='text-align: center;' class='alert alert-warning'>" + res.msg +"</div>");
                        }
                    }
                })
            }
        }

        var data1 = {};
        if($('#invest').hasClass('active')){
            var emailData = $.trim($("#email").val());
            data1.user_name=emailData;
            data1.password = $('#password').val();
            var val = $('#email').val();
            if (val.indexOf('@') == -1) {
                $("#email").css("border-color","#ff0000");
                return false;
            }
            if ($('input[type="password"]').val() == '') {
                $("#password").css("border-color","#ff0000");
                return false;
            }
            else {
                $("#login").prop('disabled',true);
                $.ajax({
                    type: 'post',
                    url: baseUrl + "/auth/login",
                    data: data1,
                    success: function (res) {
                        if (res.code == 1) {
                            $("#login").prop('disabled',false);
                            var mx = res.body;
                            $.cookie('mx_token', mx.mx_token, {expires: 30});
                            $.cookie('mx_secret', mx.mx_secret, {expires: 30});
                            window.location.href = '/';
                        } else if (res.code != 1) {
                            $("#login").prop('disabled',false);
                            $("#error-place").html("<div style='text-align: center;' class='alert alert-warning'>" + res.msg + "</div>");
                        }
                    }
                })
            }
        }
        return false;
    });

});