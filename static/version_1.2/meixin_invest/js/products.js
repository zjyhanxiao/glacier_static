$(document).ready(function(){
    $('#popup').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var title = button.data('titlename');
        var modal = $(this);
        modal.find('.modal-title span').empty();
        modal.find('.modal-title').prepend('<span>'+title+'</span>');
    });

    $('.modal-body form').submit(function() {
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(response) {
                $('button.btn').attr('disabled', '');
                $('.modal-body').hide();
                $('.modal-body-success').fadeIn();
            }
        });
        return false;
    });
});

/*
$(function () {

    //获取红包活动接口
    Ajax_Data({
        "url": baseUrl + "/promotion/redpacket",
        "data": null,
        "fn": get_redpacket
    });
    function get_redpacket(d) {
        if (d && d.name != '' && d.name != null) {
            $('.activity_message p.text').html(d.title);
            $('.coupon').show();
        }
    }

    var investment_process = '';
    //验证登录
    Ajax_Data({
        "url": baseUrl + "/auth/authentication",
        "data": cookie_tooken,
        "fn": is_login,
        "no_login": no_login
    });
    function no_login() {
        window.location = '/login.html';
    }

    //is_login  调取登录接口
    function is_login(res) {
        $('.navbar ul li:last-child').html('<a class="btn btn-min-width" href="/investor/dashboard.html">我的账户</a>');
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm logout" href="javascript:;">退出</a>');
        $('.ajax_wait p,.ajax_wait').hide();

        //获取产品投资流程方式
        var invest_flow_data = {"product_id": product_id};
        invest_flow_data = $.extend({}, invest_flow_data, cookie_tooken);
        Ajax_Data({
            "url": baseUrl + "/invest_flow",
            "data": invest_flow_data,
            "fn": invest_flow
        });
        function invest_flow(d) {
            if (d) {
                investment_process = d;
            }
        }
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
        //获取产品信息
        var get_product_data = {"product_id": product_id};
        Ajax_Data({
            "url": baseUrl + "/product/" + product_id,
            "data": get_product_data,
            "fn": get_product
        });

        //获取产品详情描述
        var product_desc_data = {"product_id": product_id};
        Ajax_Data({
            "url": baseUrl + "/product/desc/" + product_id,
            "data": product_desc_data,
            "fn": get_product_desc
        });
        function get_product_desc(d) {
            if (d) {
                $('.product_mid_section').remove();
                $('.product_bot_section_new').remove();
                $('.product_top_section').after(d);
            }
        }
    }

    //获取投资人类型
    function get_profile(d) {
        if (d) {
            investor_type = d.investor_type || 0;
        }
    }

    //获取产品信息
    function get_product(d) {
        if (d) {
            $(document).attr('title', '美信金融|' + d.name + ' ' + d.number);
            $('.product_top_section').find('h2').text(d.name + ' ' + d.number);
            var str = $('.product_top_section').html();
            var temp = d.invest_par_value,
                minimum = d.minimum_invest_amount;
            if (minimum >= 10000) {
                minimum = minimum / 10000 + '万';
            }
            if (temp >= 10000) {
                temp = temp / 10000 + '万';
            }
            var term = d.invest_term;
            if (d.operation_mode == 'OPEN') {
                term = term + '个月起';
            } else {
                term = term + '个月';
            }
            str = str.replace('rate_value', d.return_rate);
            str = str.replace('term_value', term);
            str = str.replace('par_value', temp);
            str = str.replace('max_amount_value', d.max_amount);
            str = str.replace('minimum_value', minimum);
            $('.product_top_section').html(str);
            $('#invest-number').val(d.minimum_invest_amount);

            if (d.product_location == 'ON_SHORE' && d.product_type == 'NON_CROWD_FUNDING' && d.operation_mode == 'OPEN') {
                $('.two-colum-list').html('<li>起投金额<br><span>' + minimum + '美元</span></li><li>最低赎回金额<span id="tips" style="position:relative; cursor: pointer;"><span style="font-size: 20px;line-height: 1; margin: -6px 0 0 3px" class="glyphicon glyphicon-question-sign" aria-hidden="true"></span><div style="z-index: 99;position: absolute;display: table;width: 0;height: 0;right: -8px;top: 2px;border-bottom: 5px solid transparent;border-top: 5px solid transparent;border-right: 8px solid #019ddf; display:none;"></div><div style="position:absolute; right:-158px; top:-5px;width: 150px; padding: 5px; border-radius: 6px; background: #019ddf; color: #fff; text-align: left; display: none;">剩余投资金额不得低于5000美金</div></span><br><span>1万美元</span></li>');
            }
            $('#tips').on('mouseover', function () {
                $(this).find('div').css('display', 'block');
            });
            //投资状态
            switch (d.status) {
                case "FOR_INVEST": //在售
                    if (investor_type == 1) {
                        if (d.international == 1) {
                            if (investment_process == 'crowd_international') {
                                $('.product_top_section .row').append('<a id="invest-button" type="button" class="btn btn-primary" data-titlename="' + d.name + ' ' + d.number + ' " style="padding:6px 60px" href="/fa_invest/international/form_step_1.html?product_id=' + product_id+'">立 即 投 资</a>');
                            }
                            if (investment_process == 'non_crowd') {
                                $('.product_top_section .row').append('<a id="invest-button" type="button" class="btn btn-primary" data-titlename="' + d.name + ' ' + d.number + ' " style="padding:6px 60px" href="/fa_invest/invest_yellowstone_step_1.html?product_id=' + product_id + '">立 即 投 资</a>');
                            }
                        } else {
                            window.location.href = '/blocker3.html';
                        }
                    }
                    if (investor_type == 2) {
                        if (d.american == 1) {
                            if (investment_process == 'crowd_america') {
                                $('.product_top_section .row').append('<a id="invest-button" type="button" class="btn btn-primary" data-titlename="' + d.name + ' ' + d.number + ' " style="padding:6px 60px" href="/fa_invest/american/form_usa_step_1.html?product_id=' + product_id + '">立 即 投 资</a>');
                            }
                            if (investment_process == 'non_crowd') {
                                $('.product_top_section .row').append('<a id="invest-button" type="button" class="btn btn-primary" data-titlename="' + d.name + ' ' + d.number + ' " style="padding:6px 60px" href="/fa_invest/invest_yellowstone_step_1.html?product_id=' + product_id + '">立 即 投 资</a>');
                            }
                        } else {
                            window.location.href = '/blocker2.html';
                        }
                    }
                    if (investor_type == 3) {
                        window.location.href = '/blocker.html';
                    }

                    break;
                case "FOR_APPOINTMENT": //预约

                    if (is_book) {
                        $('.product_top_section .row').append('<a id="invest-button" type="button" class="btn btn-primary" data-toggle="modal" data-titlename="' + d.name + ' ' + d.number + ' " style="padding:6px 60px" data-target="#popup">立 即 预 约</a>');
                    } else {
                        $('.product_top_section .row').append('<a id="invest-button" type="button" class="btn btn-primary" data-toggle="modal" data-titlename="' + d.name + ' ' + d.number + ' " style="padding:6px 60px" data-target="#popup">立 即 预 约</a>');
                        //提交预约
                        $('#book_submit').on('click', function () {
                            //获取投资人类型
                            var book_submit_data = {
                                "interested_amount": $('#id_interested_amount').val(),
                                "product_id": product_id,
                                "user_contact_name": $('#id_user_contact_name').val(),
                                "phone": $('#recipient-phone').val(),
                                "city": $('#id_city').val(),
                                "question": $('#id_question').val()
                            };
                            book_submit_data = $.extend({}, book_submit_data, cookie_tooken);
                            Ajax_Data({
                                "url": baseUrl + "/appointment/create",
                                "data": book_submit_data,
                                "fn": book_submit,
                                "fail_fn": fail_book_submit
                            });
                        });
                    }
                    break;
            }
            $('body').on('click','#invest-button',function () {
                var invest_value = $('#invest-number').val();
                var str=$(this).attr('href');
                $(this).attr('href',str+'&product_invest_amount=' + invest_value);
//                    return false;
            })
        }

        if (d.status == 'FOR_APPOINTMENT') {
            //获取是否预约过
            var is_book_data = {"product_id": product_id};
            is_book_data = $.extend({}, is_book_data, cookie_tooken);
            Ajax_Data({
                "url": baseUrl + "/appointment/check",
                "data": is_book_data,
                "fn": for_book,
            });
            function for_book(d) {
                if (d == true) {
                    is_book = true;
                    $('#popup').find('.modal-body').hide();
                    $('#popup').find('.is_book').show();
                }
            }
        }
    }

    function book_submit() {
        $('#popup').find('.modal-body').hide().end().find('modal-body-success').show();
    }

    function fail_book_submit(d) {
        alert(d);
    }



    // 金额加减
    $('body').on('mouseleave','#tips', function () {
        $(this).find('div').css('display', 'none');
    });
    $('body').on('focus',"#invest-number",function () {
        $(this).val('');
    });
    var bool = true;
    $('body').on('blur',"#invest-number",function () {
        bool == true;
        var val = $(this).val();
        if (val.length <= 0) {
            bool = false;
            alert('数值不能为空!');
        } else if ((val - d.minimum_invest_amount) / d.invest_par_value != 0 || val == 0) {
            bool = false;
            alert('请输入' + d.invest_par_value + '的整数倍');
        }

        if (val <= d.minimum_invest_amount) {
            $('#invest-sub').addClass('btn-default').prop('disabled', true);
        }
        if (val >= (d.minimum_invest_amount + d.invest_par_value)) {
            $('#invest-sub').removeClass('btn-default').prop('disabled', false);
        }
    });

    $('body').on('click','#invest-sub', function () {
        var val = parseInt($("#invest-number").val());
        val -= d.invest_par_value;
        $("#invest-number").val(val);
        if (val <= d.minimum_invest_amount) {
            $('#invest-sub').addClass('btn-default').prop('disabled', true);
        }
    });

    $('body').on('click','#invest-add', function () {
        var val = parseInt($("#invest-number").val());
        val += d.invest_par_value;
        $("#invest-number").val(val);
        if (val >= (d.minimum_invest_amount + d.invest_par_value)) {
            $('#invest-sub').removeClass('btn-default').prop('disabled', false);
        }
    });

});*/
