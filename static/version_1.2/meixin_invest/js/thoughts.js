/**
 * Created by YS on 2016/9/7.
 */
// clear cookie
$.cookie('mx_token', '', {expires: -1});
$.cookie('mx_secret', '', {expires: -1});
$(document).ready(function () {
    // display on board step 1 at page rendering
    $('.registration-form #page1').fadeIn('fast');

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
                    }
                    if (res.body.code == 2 || res.body.code == 3) {
                        $(".page1-error-div").html("<div class='alert alert-warning' style='text-align: center; height: 45px; margin-top: -18px; background-color: #fff; border: none; font-size: 12px; color: orangered'>" + '亲爱的用户，邀请码失效,活动礼品已全部派完，感谢您对美信金融的关注!' + "</div>");
                        return false;
                    }
                    if (res.body.code == 4) {
                        $(".page1-error-div").html("<div class='alert alert-warning' style='text-align: center; height: 45px; margin-top: -18px; background-color: #fff; border: none; font-size: 12px; color: orangered'>" + '亲爱的用户,您的验证码错误,请核对后填写!' + "</div>");
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
            data.is_international_investor = true;
            data.source = "jisilu";
        }
    });

    // third page back step
    $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('.page3').fadeOut(400, function () {
            $('#page1').fadeIn();
        });
    });
    // international submit
    $('#international-next-btn').on('click', function () {
        var parent_div = $(this).parents('#international_page3');
        if (!$('input[name="international-agree"]').is(':checked')) {
            $("#international-page3-error-div").html("<div class='alert alert-warning'>请同意网站的使用条款和隐私协议</div>");
        }else{
            $.ajax({
                type: 'post',
                url: baseUrl +"/auth/signup",
                data: data,
                success: function (res) {
                    if (res.code == 1) {
                        var mx = res.body;
                        $.cookie('mx_token', mx.mx_token, {expires: 30});
                        $.cookie('mx_secret', mx.mx_secret, {expires: 30});
                        parent_div.fadeOut(400, function () {
                            $('#page4').fadeIn();
                        });
                    } else if (res.code != 1) {
                        $("#international-page3-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
                        $(".page1-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
                    }
                }
            });
        }
    });

    $("#fourth-page-prev-btn").on("click", function(){
        var parent_div = $(this).closest('#page4');
        parent_div.fadeOut(400, function () {
            $('#international_page3').fadeIn();
        });
    });
    var bankData = {};
    $("#fourth-page-next-btn").on("click", function(){
        var parent_div = $(this).closest('#page4');
        var next_step = true;
        var bank_name = parent_div.find('input[name="bankname"]');
        var bank_address = parent_div.find('input[name="bankadd"]');
        var account_number = parent_div.find('input[type="bankaccountnum"]');
        var account_name = parent_div.find('input[name="bankaccountname"]');
        var swift_code = parent_div.find('input[name="bankSwiftCode"]');
        var routing_number = parent_div.find('input[name="ABA_Number"]');

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
                $("#id_bankSwiftCode").addClass('input-error');
                $('#id_ABA_Number').addClass('input-error');
                next_step = false;
                return false;
            }

            if ($.trim($('#id_ABA_Number').val()) != "" || $.trim($('#id_bankSwiftCode').val()) != ""){
                next_step = true;
                $('#id_ABA_Number').removeClass('input-error');
                $("#id_bankSwiftCode").removeClass('input-error');
                return false;
            }

        });
        if (next_step) {
            bankData.bank_name =$.trim(bank_name);
            bankData.bank_address =$.trim(bank_address);
            bankData.account_number =$.trim(account_number);
            bankData.account_name =$.trim(account_name);
            bankData.swift_code =$.trim(swift_code);
            bankData.routing_number =$.trim(routing_number);
            bankData.mx_token = $.cookie("mx_token");
            bankData.mx_secret = $.cookie("mx_secret");
            $.ajax({
                type: 'post',
                url: baseUrl +"/profile/bank/update",
                data: bankData,
                success: function (res) {
                    if (res.code == 1) {
                        var mx = res.body;
                        console.log("ok");
                        parent_div.fadeOut(400, function () {
                            $('#page5').fadeIn();
                        });
                    } else{
                        console.log("fail");
                        $("#page4-error-div").html("<div class='alert alert-warning'>" + res.msg + "</div>");
                    }
                }
            });

        }
    });

    // 上传证件图片
    $('.fa-upload-pic').find('a').click(function(){
        $(this).siblings('input').trigger('click');
    });

    // 上传证件图片
    $('.fa-upload-pic input').each(function () {
        var $this = $(this);
        $this.change(function (event) {
            var val = $this.val().toLowerCase();
            var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif|bmp)$");
            if (!(regex.test(val))) {
                $this.val('');
                alert('图片格式不正确，支持图片格式(.jpg|.jpeg|.png|.gif|.bmp)');
            } else {
                $this.siblings('img').attr('src', URL.createObjectURL(event.target.files[0]));
                file_upload($this);
            }
        });
    });

    var id_card_photo = null,
        passport_photo = null,
        identity_proof = null;
    function file_upload(id) {
        var formData = new FormData($('form')[0]);
        formData.append('file', id[0].files[0]);
        formData.append('mx_token', $.cookie("mx_token"));
        formData.append('mx_secret', $.cookie("mx_secret"));
        $.ajax({
            url: baseUrl + '/upload/user_file',
            dataType: 'json',
            type: 'post',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result, status) {
                if (result.code == 1) {
                    if (event.target.id == 'id_card_photo') {
                        id_card_photo = result.body;
                        console.log(id_card_photo);
                        id.siblings('p').html('您已上传的身份证照片');
                        id.siblings('img').attr('src',id_card_photo);
                    }
                    if (event.target.id == 'passport_photo') {
                        passport_photo = result.body;
                        id.siblings('p').html('您已上传的护照照片');
                        id.siblings('img').attr('src',passport_photo);
                    }
                    if (event.target.id == 'identity_proof') {
                        identity_proof = result.body;
                        id.siblings('p').html('您已上传的汇款证明照片');
                        id.siblings('img').attr('src',identity_proof);
                    }
                }
                if (result.code == -1) {
                    alert("上传失败,请重新上传");
                }
            }
        });
    }

    $("#fifth-page-prev-btn").on("click",function(){
        var $parent_div = $(this).closest('#page5');
        $parent_div.fadeOut(400, function () {
            $parent_div.prev().fadeIn();
        });
    });

    $("#fifth-page-next-btn").on("click",function(){
        var $parent_div = $(this).closest('#page5');
        var $user_form = $("#user_form");
        console.log()
        var boolid_card_photo = $("#id_card_photo_pic").attr("data-src") == $("#id_card_photo_pic").attr("src") ?true:false;
        var boolpassport_photo = $("#passport_photo_pic").attr("data-src") == $("#passport_photo_pic").attr("src") ?true:false;
        var boolidentity_proof = $("#identity_proof_pic").attr("data-src") == $("#identity_proof_pic").attr("src") ?true:false;
        console.log(boolid_card_photo);
        console.log(boolpassport_photo);
        console.log(boolidentity_proof);
        var boolPhoto = !boolid_card_photo && !boolpassport_photo && !boolidentity_proof;
        if( boolPhoto ){
            $user_form.fadeOut(400, function () {
                $(".register-ok").fadeIn();
            });
        }
    });
});