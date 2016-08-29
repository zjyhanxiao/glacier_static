$(document).ready(function() {
    init_tab("invest");
    var purl = $.url(window.location.href);
    var prod_id = purl.segment(4);
    var base_url = purl.attr('path');
    var step = window.location.href.substring(window.location.href.indexOf('#')+1);
    get_investor_profile(main);
    function main(result){
        $.ajax({
            url: API_APPOINTMENT,
            dataType: 'json',
            method: 'get',
            data: {'prod_id': prod_id},
            success: function(data, status) {
                if (data.status == 200) {
                    if (data.appointment) {
                        $("#email-input").val(data.appointment.mail);
                        $("#name-input").val(data.appointment.name);
                        var phone = data.appointment.phone;
                        if (phone.substring(0, 2) == '+1') {
                            phone = phone.substring(2);
                            $("#region-input")[0].selectedIndex = 2;
                        } else {
                            phone = phone.substring(3);
                            $("#region-input")[0].selectedIndex = 1;
                        }
                        $("#phone-input").val(phone);
                        $("#amount-input").val(data.appointment.amount);
                        if (data.appointment.zone == 0) {
                            $("#zone-input")[0].selectedIndex = 1;
                        } else {
                            $("#zone-input")[0].selectedIndex = 2;
                        }
												$("#change-btn").attr({"disabled":"disabled"});
												$("#change-btn").html("您已预约");
                    }
                } else {
                    $("#change-hint").html("修改失败");
                }
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });

    }

    $(window).bind('hashchange', function() {
        $("div [name='step']").hide();
        var step = window.location.href.substring(window.location.href.indexOf('#'));
        for (var i=0; i<2; i++) {
            if (step == '#'+i) $($("div [name='step']")[i]).show();
        }
    });

    $("#change-btn").click(function(){
        if ($("#name-input").val().length == 0) {
            $("#hint").text("请输入姓名");
            return ;
        }
        if ($("#email-input").val().length == 0) {
            $("#hint").text("请输入邮箱");
            return ;
        }
        if (!isMail($("#email-input").val())) {
            $("#hint").text("邮箱格式不正确");
            return;
        }
        if ($("#region-input")[0].selectedIndex == 0) {
            $("#hint").text("请选择区号");
            return ;
        }
        if ($("#phone-input").val().length == 0) {
            $("#hint").text("请输入手机号码");
            return ;
        }
        if (!isPhone($("#phone-input").val())) {
            $("#hint").text("手机号码格式不正确");
            return;
        }
        if ($("#amount-input").val().length == 0) {
            $("#hint").text("请输入金额");
            return ;
        }
        if ($("#zone-input")[0].selectedIndex == 0) {
            $("#hint").text("请选择时区");
            return ;
        }

        $.ajax({
            url: API_APPOINTMENT,
            dataType: 'json',
            method: 'post',
            data: {'product': prod_id,
                    'name': $("#name-input").val(),
                    'phone': $("#region-input option:selected").val() + $("#phone-input").val(),
					'mail': $("#email-input").val(),
                    'amount': $("#amount-input").val(),
                    'zone': $("#zone-input option:selected").val()
            },
            success: function(data, status) {
                if (data.status == 200) {
                    window.location.href = base_url + '#1';
                } else {
                    $("#change-hint").html("修改失败");
                }
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    });
    $("#btn-finished").click(function(){
        window.location.href = URL_INVEST;
    });
});
