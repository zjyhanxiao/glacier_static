
$(document).ready(function () {
    var options = {};

    options.ui = {
        verdicts: [
            "<span class='fa fa-exclamation-triangle'></span>请设置密码复杂度更高的密码",
            "通过;不过复杂度再高一点,更安全",
            "<span class='fa fa-thumbs-up'></span>安全",
            "<span class='fa fa-thumbs-up'></span><span class='fa fa-thumbs-up'></span>很安全",
            "<span class='fa fa-thumbs-up'></span><span class='fa fa-thumbs-up'></span><span class='fa fa-thumbs-up'></span>非常安全!"],
        showPopover: true,
        popoverPlacement: 'top'
    };

    options.common = {
        onLoad: function () {
            $('#messages').text('Start typing password');
        },
        onKeyUp: function (evt, data) {
            if (data.verdictLevel < 1) {
                var signupButton = $('#next_button');

                signupButton.attr('disabled', 'disabled');
            } else {
                var signupButton = $('#next_button');

                signupButton.removeAttr('disabled');
            }
        }
    };

    $(':password').pwstrength(options);
});

$(document).ready(function () {
    // display on board step 1 at page rendering
    $('.registration-form .div-group:first').fadeIn('slow');

    // onfocus effect
    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    //  获取手机验证码
    var first_next_step = true;
    $('#get_verify').click(function () {
        var $that = $(this);
        $(this).prop('disabled', true);
        var tel = $('#id_telephone').val();
        var country = $('#countries_phone').val();
        var timer = null, i = 60;
        timer = setInterval(function () {
            $('#get_verify').html(i + '秒后重发');
            i--;
            if (i == 0) {
                clearInterval(timer);
                $that.prop('disabled', false);
                $that.html('重新发送');
                i = 60;
            }
        }, 1000);
        if ((country != 'China' && tel.length > 6) || (country == 'China' && tel.length >= 15)) {
            $.ajax({
                type: 'post',
                url: baseUrl + '/verify_code/send',
                data: {"phone": tel},
                dataType:"json",
                success: function (res) {
                    if (res == true) {
                        first_next_step = true;
                    }
                    if(res == false){
                        alert('验证码获取失败');
                    }
                }
            });
        }

        return false;
    });

    //data
    var data={};
    // first step
    $('.registration-form #first-page-next-btn').on('click', function () {
        var parent_div = $(this).parents('.div-group');
        var next_step = true;
        var phone = parent_div.find('input[name="phone"]');
        var verify = parent_div.find('input[name="verifyCode"]');
        var password = parent_div.find('input[type="password"]');
        var email = parent_div.find('input[name="email"]');

        parent_div.find('input[name="phone"], input[name="verifyCode"], input[type="password"], input[name="email"]').each(function () {

            if ($('#countries_phone').val() == 'China' && $('input[name="phone"]').val().length < 15) {
                $(this).addClass('input-error');
                next_step = false;
                return false;
            }
            if ($('#countries_phone').val() != 'China' && $('input[name="phone"]').val().length < 6) {
                $(this).addClass('input-error');
                next_step = false;
                return false;
            }
            if ($('input[name="verifyCode"]').val().length < 6) {
                $('#id_verify').addClass('input-error');
                next_step = false;
                return false;
            }
            if ($('#id_password').val() == "") {
                $('#id_password').addClass('input-error');
                next_step = false;
                return false;
            }
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                next_step = false;
                return false;
            }
            var emailStr = $('#id_email').val();
            if (emailStr.indexOf('@') == -1 ||emailStr.indexOf('.') == -1) {
                $('#id_email').addClass('input-error');
                next_step = false;
                return false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        if(!first_next_step){
            alert("请获取手机验证码!");
       }else if (next_step) {
            parent_div.fadeOut(400, function () {
                $('#page1').next().fadeIn();
            });

            var emailData = $.trim($("#id_email").val());
            data.email=emailData;
            data.password=$("#id_password").val();
            data.phone=$("#id_telephone").val();
            data.country=$("#countries_phone").val();
            data.verify_code=$("#id_verify").val();
            data.referral_code=$("#id_referral_code").val();
        }
    });
    // second page back step
    $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('#page2').fadeOut(400, function () {
            $(this).prev().fadeIn();
        });
    });

    // second step
    $('.registration-form #investor-type-next-btn').on('click', function () {
        var parent_div = $(this).parents('#page2');
        var next_step = true;
        var is_international_investor = $('input[name=is_international_investor]:checked').val();

        parent_div.find('input[name="is_international_investor"]').each(function () {
            if ($('input[name="is_international_investor"]').is(':checked')) {
                $(this).removeClass('input-error');
            }

            else {
                $(this).addClass('input-error');
                next_step = false;
                $(".error-div").html("<div class='alert alert-warning'>请选择您的投资者类型</div>");
            }
        });

        if (next_step) {
            console.log(is_international_investor);
            data.is_international_investor=$(".form-group").find("input[type='radio']:checked").val();
            if (is_international_investor == 'True') {
                parent_div.fadeOut(400, function () {
                    $('#international_page3').fadeIn();
                });
            }
            else {
                parent_div.fadeOut(400, function () {
                    $('#american_page3').fadeIn();
                });
            }
        }
    });


    // american submit
    $('#american-submit').on('click', function () {
        if (!$('input[name="questionaire_answer"]').is(':checked')) {
            $("#page3-error-div").html("<div class='alert alert-warning'>请选择您的投资者条件</div>");
        }
        else if (!$('input[name="american-agree"]').is(':checked')) {
        $("#page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
        }
        else {
            $.ajax({
                type: 'post',
                url: baseUrl + "/auth/signup",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        $.cookie('mx_token', res.mx_token, {expires: 30});
                        $.cookie('mx_secret', res.mx_secret, {expires: 30});
                        window.location.href = '/';
                    } else if (res.code != 1) {
                        $("#page3-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
                    }
                }
            });
        }
        return false;
    });
    
    // international submit
    $('#international-submit').on('click', function () {
        if (!$('input[name="international-agree"]').is(':checked')) {
            $("#international-page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
        }
        else if($('input[name="international-agree"]').is(':checked')){
            $.ajax({
                type: 'post',
                url: baseUrl + "/auth/signup",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        $.cookie('mx_token', res.mx_token, {expires: 30});
                        $.cookie('mx_secret', res.mx_secret, {expires: 30});
                        window.location.href = '/';
                    } else if (res.code != 1) {
                        $("#page3-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
                    }
                }
            });
        }
        return false;
    });
});