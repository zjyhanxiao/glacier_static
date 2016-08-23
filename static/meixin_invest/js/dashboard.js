$(document).ready(function () {
    var name = $('#real_name').val(),
        idcode = $('#id_card_code').val(),
        birthdate = $('#date_of_birth').val();

    $('.dashboard_setup .dashboard_upload_image').hover(function () {
        $(this).find('.dashboard_mask').toggle();
    });

    $('.dashboard_mask').find('a').click(function () {
        $(this).siblings('input').trigger('click');
    });

    $('.dashboard_mask').find('input[type=file]').change(function (event) {
        $(this).parent().siblings('img').attr('src', URL.createObjectURL(event.target.files[0]));
    });

    var times = 0;

    function resetField() {
        resetTimes();
        var cancel = $('.edit-icon-cancel');
        cancel.parent().css({"background-color": "#fff", "z-index": "0", "position": "initial"});
        $('.edit-icon-cancel').parent().find("input").css("width", "100%");
        cancel.siblings(".edit-icon-approved").remove();
        cancel.remove();
        $('div.editing-mask').remove();
    }

    function resetValueBack(input, field) {
        if (field == 'real_name') {
            input.val(name);
        } else if (field == 'id_card_code') {
            input.val(idcode);
        } else if (field == 'date_of_birth') {
            input.val(birthdate);
        }
    }

    function saveAndSet(field, value) {
        if (field == 'real_name') {
            name = value;
        } else if (field == 'id_card_code') {
            idcode = value;
        } else if (field == 'date_of_birth') {
            birthdate = value;
        }
    }

    function changeFieldStyle(input) {
        input.removeAttr("readonly", "");
        input.parent().css({"background-color": "#f8f8f8", "z-index": "999", "position": "relative"});
        input.css("width", "92%");
    }

    function appendButtons(input, times) {
        if (times == 1) {
            input.parent().append('<a class="edit-icon-common edit-icon-approved"></a>');
            input.parent().append('<a class="edit-icon-common edit-icon-cancel"></a>');
            $("body").append('<div class="editing-mask"></div>');
        }
    }

    function resetTimes() {
        times = 0;
    }

    function inputvalidate(field, value) {
        var status = false;
        var name_rex = new RegExp("^[A-Za-z\s]{1,}[\. ]{0,1}[A-Za-z\s]{0,}$"),
            code_rex = new RegExp("[A-Za-z0-9]"),
            birth_rex = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
        if (field == 'real_name') {
            status = name_rex.test(value);
        } else if (field == 'id_card_code') {
            status = code_rex.test(value);
        } else if (field == 'date_of_birth') {
            status = birth_rex.test(value);
        }
        return status;
    }

    $('.dashboard_info input').on("click", function () {
        var thisInput = $(this);
        times++;
        changeFieldStyle(thisInput);
        appendButtons(thisInput, times);
        $('.edit-icon-cancel').bind("click", function () {
            $('#popup-error-info').remove();
            resetField();
            resetValueBack(thisInput, thisInput.attr('id'));
        });
        $('.edit-icon-approved').bind("click", function () {
            if (inputvalidate(thisInput.attr('id'), thisInput.val()) == true) {
                $('#popup-error-info').remove();
                resetField();
                inputValueChange(thisInput.attr('id'), thisInput.val());
                saveAndSet(thisInput.attr('id'), thisInput.val());
            } else {
                $(this).parent().parent().after('<div id="popup-error-info">输入的格式有误！</div>');
            }
        });
    });

    var dateFormat = "yyyy-mm-dd";
    var match = new RegExp(dateFormat.replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*").replace(/m|d|y/g, "\\d"));
    var replace = "$1/$2/$3$4".replace(/\//g, dateFormat.match(/\W/));

    function doFormat(target) {
        target.value = target.value.replace(/(^|\W)(?=\d\W)/g, "$10").replace(match, replace).replace(/(\W)+/g, "$1");
    }

    $("#date_of_birth").keyup(function (e) {
        if (!e.ctrlKey && !e.metaKey && (e.keyCode == 32 || e.keyCode > 46))
            doFormat(e.target)
    });


    //更改密码校验一致性

    $('#password-update-submit').submit(function (e) {
        var pass = $('#id_password').val();
        var passconfirm = $('#id_password_confirm').val();
        if (pass != passconfirm) {
            e.preventDefault();
            $('.error_mes').html('您两次输入的密码不一致');
        }
    });

    //验证登录
    Ajax_Data({
        "url": baseUrl + "/auth/authentication",
        "data": cookie_tooken,
        "fn": is_login,
        "no_login": no_login
    });
    function no_login() {
        window.location = '/login';
    }

    //is_login  调取登录接口
    function is_login(res) {
        $('.navbar ul li:last-child').html('<a class="btn btn-min-width" href="/investor/dashboard">我的账户</a>');
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm logout" href="javascript:;">退出</a>');
        $('.ajax_wait p,.ajax_wait').hide();
        //获取投资人类型
        var get_profile_data = {
            "fields": "investor_type"
        };
        get_profile_data = $.extend({}, get_profile_data, cookie_tooken);
        Ajax_Data({
            "url": baseUrl + "/profile/get",
            "data": get_profile_data,
            "fn": get_profile
        });

        //获取我的主页信息
        Ajax_Data({
            "url": baseUrl + "/order/summary",
            "data": cookie_tooken,
            "fn": get_summary
        });
        //获取预约记录
        $('.get_appointment').on('click', function () {
            Ajax_Data({
                "url": baseUrl + "/appointment/listByUser",
                "data": cookie_tooken,
                "fn": get_appointment
            });
        });

        //获取未完成订单
        $('.uncommit').on('click', function () {
            Ajax_Data({
                "url": baseUrl + "/order/list/uncommit",
                "data": cookie_tooken,
                "fn": uncommitFn
            });
        })
        //获取投资订单
        $('.closefund').on('click', function () {
            Ajax_Data({
                "url": baseUrl + "/order/list/closefund",
                "data": cookie_tooken,
                "fn": closefundFn
            });
        })
    }

    //获取投资人类型
    function get_profile(d) {
        if (d) {
            investor_type = d.investor_type || 0;
        }
    }

    /*
     * 获取我的主页信息
     * */
    function get_summary(d) {
        if (d) {
            // console.log(JSON.stringify(d));
            var str = $('.my_index').html();
            str = str.replace('invested_product_value', d.count);
            str = str.replace('invested_total_value', d.invest_amount);
            str = str.replace('invested_value', d.income_amount);
            $('.my_index').html(str);
        }
    }


    /*
     * 获取预约记录
     * */
    function get_appointment(d) {
        var html = '';
        if (d.length < 1) {
            $('.book_order').html('暂无预约记录');
        }
        if (d && d.length >= 1) {
            $.each(d, function (i) {
                var minimum_invest_amount = d[i].minimum_invest_amount;
                if (minimum_invest_amount >= 10000) {
                    minimum_invest_amount = minimum_invest_amount / 10000 + '万美元';
                } else {
                    minimum_invest_amount = '$' + minimum_invest_amount;
                }
                var interested_amount = d[i].interested_amount;
                interested_amount = '$' + interested_amount;
                html += '<div class="order_list"><h4>' + d[i].product_name + ' ' + d[i].product_number + '</h4><ul' + ' class="invest_table' + ' clearfix"><li>预计年化收益：' + d[i].return_rate + '%</li><li>投资期限：' + d[i].invest_term + '个月</li><li>起投金额：' + minimum_invest_amount + '</li><li>感兴趣金额：' + interested_amount + '</li><li>预约时间：' + d[i].appointment_date + '</li><li><button class="status_btn">' + d[i].diaplay_status + '</button></li></ul></div>';
            });
            $('.book_order').html(html);
        }
    }

    /*
     * 获取未完成订单
     * */
    function uncommitFn(d) {
        var html = '';
        if (d.length < 1) {
            $('.not_order').html('暂无未完成订单');
        }
        if (d && d.length >= 1) {
            // console.log(JSON.stringify(d));
            $.each(d, function (i) {
                var url = '';
                //安心计划,投资流程链接
                if (d[i].product_location == 'OFF_SHORE' && d[i].product_type == 'NON_CROWD_FUNDING' && d[i].operation_mode == 'CLOSED') {
                    url = '/fa_invest/invest_yellowstone_step_1.html?order_number=' + d[i].order_number + '&product_id=' + d[i].product_id;
                }
                //安心定期,国际投资人,投资流程链接
                if (d[i].product_location == 'ON_SHORE' && d[i].product_type == 'CROWD_FUNDING' && investor_type == 1) {
                    url = '/fa_invest/international/form_step_1.html?order_number=' + d[i].order_number + '&product_id=' + d[i].product_id;
                }
                //安心定期,美国投资人,投资流程链接
                if (d[i].product_location == 'ON_SHORE' && d[i].product_type == 'CROWD_FUNDING' && investor_type == 2) {
                    url = '/fa_invest/american/form_usa_step_1.html?order_number=' + d[i].order_number + '&product_id=' + d[i].product_id;
                }
                //灵活理财投资流程
                if (d[i].product_location == 'ON_SHORE' && d[i].product_type == 'NON_CROWD_FUNDING' && d[i].operation_mode == 'OPEN') {
                    url = '/fa_invest/invest_yellowstone_step_1.html?order_number=' + d[i].order_number + '&product_id=' + d[i].product_id;
                }

                var minimum_invest_amount = d[i].minimum_invest_amount;
                if (minimum_invest_amount >= 10000) {
                    minimum_invest_amount = minimum_invest_amount / 10000 + '万美元';
                } else {
                    minimum_invest_amount = '$' + minimum_invest_amount;
                }
                html += '<div class="order_list"><h4>' + d[i].product_name + ' ' + d[i].product_number + '</h4><ul' + ' class="invest_table' + ' clearfix"><li>预计年化收益：' + d[i].return_rate + '%</li><li>投资期限：' + d[i].invest_term + '个月</li><li>起投金额：' + minimum_invest_amount + '</li><li>投资状态：' + d[i].status_desc + '</li><li></li><li><a class="status_btn" href=' + url + ' target="_blank">完善流程</a></li></ul></div>'
            });
            $('.not_order').html(html);
        }
    }

    /*
     * 获取投资订单
     * */
    function closefundFn(d) {
        var html = '';
        if (d.length < 1) {
            $('.invest_order').html('暂无投资订单');
        }

        console.log(JSON.stringify(d[0]));
        if (d && d.length >= 1) {
            $.each(d, function (i) {
                var total_amount = '$' + d[i].total_amount || 0; //总金额
                var total_income = '$' + d[i].total_income || 0; //累计收益
                var invest_amount = '$' + d[i].invest_amount || 0; //投资总额
                var received_amount = '$' + d[i].received_amount || 0; //入金金额
                var received_balance = '$' + d[i].received_balance || 0; //入金余额
                var withdraw_able_amount = '$' + d[i].withdraw_able_amount || 0; //可提现金额
                var invest_income = '$' + d[i].invest_income || 0; //投资收益
                var promotion_income = '$' + d[i].promotion_income || 0; //权益收益
                //推广活动,红包等
                if (d[i].promotion_name != '' && d[i].promotion_name != null) {
                    var promotion = d[i].promotion_name + ': ' + d[i].promotion_value || '';
                }
                //是否可提现
                var is_disable,can_withdraw='';
                if(d[i].withdraw_able_amount>0){
                    is_disable='';
                }else{
                    is_disable='disabled';
                }
                if(d[i].can_withdraw){
                        can_withdraw='<button class="status_btn" data-toggle="modal" data-titlename='+d[i].product_name+ ' '+ d[i].product_number+' data-target="#popup" '+is_disable+'>提现</button>';
                    if(d[i].has_withdraw_record){
                        can_withdraw='<button type="button" class="withdraw">提现记录</button><button class="status_btn"' + ' style="margin-left: 20px;"' + ' data-toggle="modal"' + ' data-titlename='+d[i].product_name+ ' '+ d[i].product_number+' data-target="#popup" '+is_disable+'>提现</button>';
                    }
                }
                html += '<div class="order_list"><h4>'+d[i].product_name+ ' '+ d[i].product_number+'<span class="invet_status">投资状态：'+d[i].status_desc+'</span></h4><ul class="invest_table clearfix"><li>产品类型：债权型</li><li>总金额：'+total_amount+'</li><li>累计收益：'+total_income+'</li><li>投资日期：'+d[i].created_at+'</li><li>投资周期：'+d[i].invest_term+'个月</li><li><button class="status_btn more" data-show="0">显示更多</button></li><li class="hide">投资总额： '+invest_amount+'</li><li class="hide">入金金额：'+received_amount+'</li><li class="hide">入金余额：'+received_balance+'</li><li class="hide">可提现金额：'+withdraw_able_amount+'</li><li class="hide">投资收益：'+invest_income+'</li><li class="hide">权益收益：'+promotion_income+'</li><li class="hide">'+promotion+'</li><li class="hide"><a href="+d[i].sub_doc_url+" target="_blank">合同</a></li><li class="hide">'+can_withdraw+'</li></ul></div>';
            });
            $('.invest_order').html(html);
        }
    }
});



