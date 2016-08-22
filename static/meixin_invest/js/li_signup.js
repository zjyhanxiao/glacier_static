/**
 * Created by admin on 2016/8/22.
 */
$(document).ready(function () {
    //获取验证码
    $('#get_verify').click(function () {
        var data = {"phone": $('#id_telephone').val()};
        if (d_phone) {
            $.ajax({
                type: "get",
                url: "http://101.201.112.171:8082/sendVerifyCode",
                data: data,
                success: function (result) {
                    
                }
            });
        }
        return false;
    });

    //第一步
    var d_phone,d_verify,d_password,d_email;
    $("#first-page-next-btn").click(function () {
        var data = {
            "phone":$("#countries_phone").val() + $("#id_telephone").val(),
            "verify":$("#id_verify").val(),
            "password":$("#id_password").val(),
            "email":$("#id_email").val(),
            "referral_code":$("#id_referral_code").val()
        };
        if($('#id_telephone').val()!='' || $('#id_telephone').val()!= null){
            d_phone = true;
        }
        if($('#id_verify').val()!='' || $('#id_verify').val()!= null){
            d_verify = true;
        }
        if($("#password").val()!= '' || $("#password").val()!= null){
            d_password = true;
        }
        if($("#email").val()!= '' || $("#email").val()!=null){
            d_email = true;
        }
        if(d_phone &&d_verify && d_password && d_email){
            $.ajax({
                type: 'post',
                url: "auth/signup",
                data: data,
                success: function (res) {
                    if (res.code == 1) {

                    } else if (res.code = -1) {

                    }
                }
            })
        }
    });
});