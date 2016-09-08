/**
 * Created by YS on 2016/9/7.
 */
// clear cookie
$.cookie('mx_token', '', {expires: -1});
$.cookie('mx_secret', '', {expires: -1});
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
    var data = {};
    $('#id_referral_code').on('blur', function () {
        var referral = $.trim($("#id_referral_code").val());
        data.referral_code = referral;
        if (referral != '') {
            $.ajax({
                type: 'get',
                url: baseUrl + "/referral_code/verify",
                data: data,
                success: function (res) {
                    if (res.body.code == 1) {
                        $(".page1-error-div").html("<div class='alert alert-warning' style='text-align:center; height: 45px; margin-top: -18px; background-color: #fff; border: none; font-size: 12px; color: orangered'>" + '邀请码有效  注册成功后礼品卡将发送至您的邮箱!' + "</div>");
                        $(".page2-error-div").html("<div class='alert alert-warning' style='text-align: center; font-size: 12px; color: orangered'>" + '邀请码有效  注册成功后礼品卡将发送至您的邮箱!' + "</div>");
                    }
                    if (res.body.code == 2 || res.body.code == 3) {
                        $(".page1-error-div").html("<div class='alert alert-warning' style='text-align: center; height: 45px; margin-top: -18px; background-color: #fff; border: none; font-size: 12px; color: orangered'>" + '亲爱的用户，邀请码失效,活动礼品已全部派完，感谢您对美信金融的关注!' + "</div>");
                        $(".page2-error-div").html("<div class='alert alert-warning' style='text-align: center; font-size: 12px; color: orangered'>" + '亲爱的用户，邀请码失效,活动礼品已全部派完，感谢您对美信金融的关注!' + "</div>");
                        return false;
                    }
                    if (res.body.code == 4) {
                        $(".page1-error-div").html("<div class='alert alert-warning' style='text-align: center; height: 45px; margin-top: -18px; background-color: #fff; border: none; font-size: 12px; color: orangered'>" + '亲爱的用户,您的验证码错误,请核对后填写!' + "</div>");
                        $(".page2-error-div").html("<div class='alert alert-warning' style='text-align: center; font-size: 12px; color: orangered'>" + '亲爱的用户,您的验证码错误,请核对后填写!' + "</div>");
                        return false;
                    }
                }
            });
        }
        return false;
    });
    $("#id_referral_code").on('focus', function () {
        $(".alert").remove();
    });

    // first step
    $('.registration-form #first-page-next-btn').on('click', function () {
        var parent_div = $(this).parents('.div-group');
        var next_step = true;
        var phone = parent_div.find('input[name="phone"]');
        var verify = parent_div.find('input[name="verifyCode"]');
        var password = parent_div.find('input[type="password"]');
        var email = parent_div.find('input[name="email"]');

        parent_div.find('.input-error').removeClass('input-error');
        parent_div.find('input[name="phone"], input[name="verifyCode"], input[type="password"], input[name="email"]').each(function () {

            if ($('#countries_phone').val() == 'China' && $('input[name="phone"]').val().length < 15) {
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
            var emailStr = $('#id_email').val();
            if (emailStr.indexOf('@') == -1) {
                $('#id_email').addClass('input-error');
                next_step = false;
                return false;
            }
            if (emailStr.indexOf('.') == -1) {
                $('#id_email').addClass('input-error');
                next_step = false;
                return false;
            }
            else {
                $(this).removeClass('input-error');
            }

        });
        if (next_step) {
            parent_div.fadeOut(400, function () {
                $('#page1').next().fadeIn();
            });

            var emailData = $.trim($("#id_email").val());
            data.email=emailData;
            data.password=$("#id_password").val();
            data.phone=$.trim($("#id_telephone").val());
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
            }else {
                $(this).addClass('input-error');
                next_step = false;
                $(".page2-error-div").html("<div class='alert alert-warning'>请选择您的投资者类型</div>");
            }
        });

        if (next_step) {
            data.is_international_investor=$("#page2 .form-group").find("input[type='radio']:checked").val();
            if (is_international_investor == 'True') {
                parent_div.fadeOut(400, function () {
                    $('#international_page3').fadeIn();
                });
            }else {
                parent_div.fadeOut(400, function () {
                    $('#american_page3').fadeIn();
                });
            }
        }
    });

    // third page back step
    $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('.page3').fadeOut(400, function () {
            $('#page2').fadeIn();
        });
    });
    $('#american-next-btn').click( function () {
        var parent_div = $(this).parents('#american_page3');
        var next_step = true;
        var questionaire_answer = $('input[name=questionaire_answer]:checked').val();
        console.log(questionaire_answer);
        parent_div.find('input[name="questionaire_answer"]').each(function () {
            if ($('input[name="questionaire_answer"]').is(':checked')) {
                $(this).removeClass('input-error');
            }else {
                $(this).addClass('input-error');
                next_step = false;
                $(".page3-error-div").html("<div class='alert alert-warning'>请选择您的投资者条件</div>");
            }
        });
        if (!$('input[name="american-agree"]').is(':checked')) {
            $(".page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
            next_step = false;
        }else{
            $(".page3-error-div").html("");
        }
        if (next_step) {
            data.questionaire_answer=$(".form-group").find("input[type='radio']:checked").val();
            parent_div.fadeOut(400, function () {
                $('#page4').fadeIn();
            });
        }
    });

    // american submit
    //$('#american-submit').on('click', function () {
    //    if (!$('input[name="international-agree"]').is(':checked')) {
    //        $("#international-page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
    //    }
    //    data.questionaire_answer = $("#american_page3").find("input[type='radio']:checked").val();
    //    if (!$('input[name="questionaire_answer"]').is(':checked')) {
    //        $(".page3-error-div").html("<div class='alert alert-warning'>请选择您的投资者条件</div>");
    //    }
    //    else if (!$('input[name="american-agree"]').is(':checked')) {
    //    $(".page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
    //    }
    //    else {
    //        $.ajax({
    //            type: 'post',
    //            url:  baseUrl + "/auth/signup",
    //            data: data,
    //            success: function (res) {
    //                if (res.code == 1) {
    //                    var mx = res.body;
    //                    $.cookie('mx_token', mx.mx_token, {expires: 30});
    //                    $.cookie('mx_secret', mx.mx_secret, {expires: 30});
    //                    window.location.href = '/';
    //                } else if (res.code != 1) {
    //                    $(".page3-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
    //                    $(".page2-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
    //                    $(".page1-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
    //
    //                }
    //            }
    //        });
    //    }
    //    return false;
    //});

    // international submit
    $('#international-next-btn').on('click', function () {
        var parent_div = $(this).parents('#international_page3');
        var next_step = true;
        if (!$('input[name="international-agree"]').is(':checked')) {
            $("#international-page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
            next_step = false;
        }else{
            $("#international-page3-error-div").html("");
        }
        if (next_step) {
            parent_div.fadeOut(400, function () {
                $('#page4').fadeIn();
            });
        }
        //else if($('input[name="international-agree"]').is(':checked')){
        //    $.ajax({
        //        type: 'post',
        //        url: baseUrl +"/auth/signup",
        //        data: data,
        //        success: function (res) {
        //            if (res.code == 1) {
        //                var mx = res.body;
        //                $.cookie('mx_token', mx.mx_token, {expires: 30});
        //                $.cookie('mx_secret', mx.mx_secret, {expires: 30});
        //                window.location.href = '/';
        //            } else if (res.code != 1) {
        //                $("#international-page3-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
        //                $(".page2-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
        //                $(".page1-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
        //            }
        //        }
        //    });
        //}
        //return false;
    });

    $("#fourth-page-prev-btn").on("click", function(){
        var parent_div = $(this).closest('#page4');
        is_international_investor=$("#page2 .form-group").find("input[type='radio']:checked").val();
        if (is_international_investor == 'True') {
            parent_div.fadeOut(400, function () {
                $('#international_page3').fadeIn();
            });
        }else {
            parent_div.fadeOut(400, function () {
                $('#american_page3').fadeIn();
            });
        }
    });

    $("#fourth-page-next-btn").on("click", function(){
        var parent_div = $(this).closest('#page4');
        var next_step = true;
        var bankname = parent_div.find('input[name="bankname"]');
        var bankadd = parent_div.find('input[name="bankadd"]');
        var bankaccountnum = parent_div.find('input[type="bankaccountnum"]');
        var bankaccountname = parent_div.find('input[name="bankaccountname"]');
        var bankSwiftCode = parent_div.find('input[name="bankSwiftCode"]');
        var ABA_Number = parent_div.find('input[name="ABA_Number"]');

        parent_div.find('input[name="bankname"], input[name="bankadd"], input[type="bankaccountnum"], input[name="bankaccountname"], input[name="bankSwiftCode"], input[name="ABA_Number"]').each(function () {

            if ($.trim($('#id_bankname').val()) == "") {
                $("#id_bankname").addClass('input-error');
                next_step = false;
                return false;
            }
            if ($.trim($('#id_bankadd').val()) == "") {
                $('#id_bankadd').addClass('input-error');
                next_step = false;
                return false;
            }

            if ($.trim($('#id_bankaccountnum').val().length) == 0) {
                $("#id_bankaccountnum").addClass('input-error');
                next_step = false;
                return false;
            }else{
                $("#id_bankaccountnum").removeClass('input-error');
            }
            if ($.trim($('#id_bankaccountname').val()) == "") {
                $("#id_bankaccountname").addClass('input-error');
                next_step = false;
                return false;
            }

            if($.trim($('#id_ABA_Number').val()) == "" && $.trim($('#id_bankSwiftCode').val()) == ""){
                if ($.trim($('#id_bankSwiftCode').val()) == "") {
                    $("#id_bankSwiftCode").addClass('input-error');
                    next_step = false;
                    return false;
                }
                if ($.trim($('#id_ABA_Number').val()) == "") {
                    $('#id_ABA_Number').addClass('input-error');
                    next_step = false;
                    return false;
                }
            }

            if ($.trim($('#id_ABA_Number').val()) != "" || $.trim($('#id_bankSwiftCode').val()) != ""){
                next_step = true;
                $('#id_ABA_Number').removeClass('input-error');
                $("#id_bankSwiftCode").removeClass('input-error');
                return false;
            }

        });
        if (next_step) {
            parent_div.fadeOut(400, function () {
                $('#page5').fadeIn();
            });
            data.bankname =$.trim(bankname);
            data.bankadd =$.trim(bankadd);
            data.bankaccountnum =$.trim(bankaccountnum);
            data.bankaccountname =$.trim(bankaccountname);
            data.bankSwiftCode =$.trim(bankSwiftCode);
            data.ABA_Number =$.trim(ABA_Number);
            parent_div.fadeOut(400, function () {
                $('#page5').fadeIn();
            });
        }
    });
});