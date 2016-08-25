$(document).ready(function () {
    /*var name = $('#real_name').val(),
        idcode = $('#id_card_code').val(),
        birthdate = $('#id_birth_date').val();

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
    });*/

    var dateFormat = "yyyy-mm-dd";
    var match = new RegExp(dateFormat.replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*").replace(/m|d|y/g, "\\d"));
    var replace = "$1/$2/$3$4".replace(/\//g, dateFormat.match(/\W/));

    function doFormat(target) {
        target.value = target.value.replace(/(^|\W)(?=\d\W)/g, "$10").replace(match, replace).replace(/(\W)+/g, "$1");
    }

    $("#id_birth_date").keyup(function (e) {
        if (!e.ctrlKey && !e.metaKey && (e.keyCode == 32 || e.keyCode > 46))
            doFormat(e.target)
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
        //获取profile信息
        var get_profile_data = {
            "fields": "investor_type,real_name,mailing_address_country,mailing_address_region,mailing_address_city,mailing_address_street,mailing_address_door,mailing_address_apartment,phone,email,id_card_code,id_card_photo,passport_code,passport_photo"
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
        });
        //获取投资订单
        $('.closefund').on('click', function () {
            Ajax_Data({
                "url": baseUrl + "/order/list/closefund",
                "data": cookie_tooken,
                "fn": closefundFn
            });
        });

        //修改用户信息
        $('#change_btn').on('click', function () {
            $('#id_real_name,#id_investor_type,#id_card,#passport_code,#id_birth_date').prop('disabled', false).removeAttr('style');
            $('.dashboard_id_image').append('<div class="dashboard_mask" style="display:none"><a>选择图片</a> <input id="id_identification_card_photo" name="identification_card_photo" type="file"></div>');
            $('.dashboard_passport_image').append('<div class="dashboard_mask" style="display:none"><a>选择图片</a> <input id="id_passport_photo" name="passport_photo" type="file"></div>');
        });

        $('.dashboard_upload_image').hover(function () {
            $(this).find('.dashboard_mask').toggle();
        });

        $('body').on('click', '.dashboard_mask a', function () {
            $(this).siblings('input').trigger('click');
        });
        $('.dashboard_upload_image').on('change', 'input[type=file]', function (event) {
            var $this = $(this);
            var val = $this.val().toLowerCase();
            var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif|bmp)$");
            if (!(regex.test(val))) {
                $this.val('');
                alert('图片格式不正确，支持图片格式(.jpg|.jpeg|.png|.gif|.bmp)');

            } else {
                file_upload($this);
                $this.parent().siblings('img').attr('src', URL.createObjectURL(event.target.files[0]));
            }
        });

        //上传用户信息
        order_number = getUrlParam("order_number");
        var img_src = $('.dashboard_id_image').find('img').attr('src');
        var passport_photo_img = $('.dashboard_passport_image').find('img').attr('src');
        //上传profile信息
        $('#save_submit').on('click', function () {
            console.log(default_id_card_photo);
            console.log(default_passport_photo);
            console.log(id_card_photo);
            console.log(passport_photo);
            var $this = $(this);
            $this.prop('disabled', true);
            var update_profile_data = {};
            update_profile_data.real_name = $('#id_real_name').val();
            update_profile_data.investor_type = $('#id_investor_type').val();
            update_profile_data.id_card_code = $('#id_card').val();
            update_profile_data.passport_code = $('#passport_code').val();
            update_profile_data.date_of_birth = $('#id_birth_date').val();
            if (!default_id_card_photo) {
                update_profile_data.id_card_photo = id_card_photo;
            } else {
                update_profile_data.id_card_photo = img_src;
            }
            if (!default_passport_photo) {
                update_profile_data.passport_photo = passport_photo;
            } else {
                update_profile_data.passport_photo = passport_photo_img;
            }
            update_profile_data = $.extend({}, update_profile_data, cookie_tooken);
            console.log(update_profile_data);
            Ajax_Data({
                "type": "post",
                "url": baseUrl + "/profile/update",
                "data": update_profile_data,
                "fn": update_user_profile,
                "fail_fn": user_information_profile_fail
            });
            function update_user_profile(d) {
                alert('更新资料成功');
                $('#id_real_name,#id_card,#passport_code,#id_birth_date').prop('disabled', true).attr('style','border: none;background: none;box-shadow: none;');
                $('#id_investor_type').prop('disabled', true);
                $('.dashboard_id_image,.dashboard_passport_image').remove('.dashboard_mask');
                $this.prop('disabled', false);
            }

            function user_information_profile_fail(d) {
                alert(d);
                $this.prop('disabled', false);
            }
        });

        //重置密码
        $('#pwd_reset').on('click', function () {
            var $this = $(this);
            $this.prop('disabled', true);
            $('.pws_reset').find('span').remove();
            pws_reset($this);
            return false;
        });
        $('.pws_reset input').change(function () {
            $('#pwd_reset').prop('disabled', false);
        });
    }

    //获取投资人信息
    function get_profile(d) {
        if (d) {
            investor_type = d.investor_type;
            $('#full_name').val(d.real_name);
            var country = "US";
            if (d.mailing_address_country != '' && d.mailing_address_country != null) {
                country = d.mailing_address_country;
            }
            var mailing_address = country + ' ' + d.mailing_address_region + ' ' + d.mailing_address_city + ' ' + d.mailing_address_street + ' ' + d.mailing_address_door + ' ' + d.mailing_address_apartment;
            $('#residence-address').val(mailing_address);

            //写入用户信息
            if (d.real_name != '' && d.real_name != null) {
                $('#id_real_name').val(d.real_name);
            }
            if (d.investor_type != '' && d.investor_type != null) {
                $('#id_investor_type').val(investor_type);
            }
            if (d.phone != '' && d.phone != null) {
                $('#id_phone').val(d.phone);
            }
            if (d.email != '' && d.email != null) {
                $('#id_email').val(d.email);
            }
            if (d.id_card_code != '' && d.id_card_code != null) {
                $('#id_card').val(d.id_card_code);
            }
            if (d.passport_code != '' && d.passport_code != null) {
                $('#passport_code').val(d.passport_code);
            }
            if (d.date_of_birth != '' && d.date_of_birth != null) {
                $('#id_birth_date').val(d.date_of_birth);
            }
            if (d.id_card_photo != '' && d.id_card_photo != null) {
                $('.dashboard_id_image img').attr('src', d.id_card_photo);
                default_id_card_photo = false;
            }
            if (d.passport_photo != '' && d.passport_photo != null) {
                $('.dashboard_passport_image img').attr('src', d.passport_photo);
                default_passport_photo = false;
            }
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
        if (d && d.length >= 1) {
            $.each(d, function (i) {
                var promotion = '', total_amount = '$0', total_income = '$0', invest_amount = '$0', received_amount = '$0', received_balance = '$0', withdraw_able_amount = '$0', invest_income = '$0', promotion_income = '$0';
                if (d[i].total_amount != '' && d[i].total_amount != null) {
                    total_amount = '$' + d[i].total_amount; //总金额
                }
                if (d[i].total_income != '' && d[i].total_income != null) {
                    total_income = '$' + d[i].total_income; //累计收益
                }
                if (d[i].invest_amount != '' && d[i].invest_amount != null) {
                    invest_amount = '$' + d[i].invest_amount; //投资总额
                }
                if (d[i].received_amount != '' && d[i].received_amount != null) {
                    received_amount = '$' + d[i].received_amount; //入金金额
                }
                if (d[i].received_balance != '' && d[i].received_balance != null) {
                    received_balance = '$' + d[i].received_balance; //入金余额
                }
                if (d[i].withdraw_able_amount != '' && d[i].withdraw_able_amount != null) {
                    withdraw_able_amount = '$' + d[i].withdraw_able_amount; //可提现金额
                }
                if (d[i].invest_income != '' && d[i].invest_income != null) {
                    invest_income = '$' + d[i].invest_income; //投资收益
                }
                if (d[i].promotion_income != '' && d[i].promotion_income != null) {
                    promotion_income = '$' + d[i].promotion_income; //权益收益
                }
                //推广活动,红包等
                if (d[i].promotion_name != '' && d[i].promotion_name != null) {
                    promotion = d[i].promotion_name + ': $' + d[i].promotion_value;
                }
                //是否可提现
                var is_disable, can_withdraw = '';
                if (d[i].withdraw_able_amount > 0) {
                    is_disable = '';
                } else {
                    is_disable = 'disabled';
                }
                if (d[i].can_withdraw) {
                    can_withdraw = '<button class="status_btn" data-toggle="modal" data-titlename=' + d[i].product_name + ' ' + d[i].product_number + ' data-target="#popup" ' + is_disable + ' data-order-number = ' + d[i].order_number + '>提现</button>';
                    if (d[i].has_withdraw_record) {
                        can_withdraw = '<button' + ' class="status_btn" data-toggle="modal" data-titlename=' + d[i].product_name + ' ' + d[i].product_number + ' data-target="#popup" ' + is_disable + ' data-order-number = ' + d[i].order_number + '>提现</button><button style="margin-left: 20px;" type="button" class="withdraw">提现记录</button>';
                    }
                }
                html += '<div class="order_list"><h4>' + d[i].product_name + ' ' + d[i].product_number + '<span' + ' class="invest_status">投资状态：' + d[i].status_desc + '</span></h4><ul class="invest_table clearfix"><li>产品类型：债权型</li><li>总金额：' + total_amount + '</li><li>累计收益：' + total_income + '</li><li>投资日期：' + d[i].created_at + '</li><li>投资周期：' + d[i].invest_term + '个月</li><li><button class="status_btn more" data-show="0">显示更多</button></li><li class="hide">投资总额： ' + invest_amount + '</li><li class="hide">入金金额：' + received_amount + '</li><li class="hide">入金余额：' + received_balance + '</li><li class="hide">可提现金额：' + withdraw_able_amount + '</li><li class="hide">投资收益：' + invest_income + '</li><li class="hide">权益收益：' + promotion_income + '</li><li class="hide">' + promotion + '</li><li class="hide"><a href=' + d[i].sub_doc_url + ' target="_blank">合同</a></li><li class="hide">' + can_withdraw + '</li></ul></div>';
            });
            $('.invest_order').html(html);
            showMore();//显示、隐藏更多
            withDraw();//提现
        }
    }


    //显示/隐藏更多
    function showMore() {
        $('.order_list .more').each(function () {
            var $this = $(this);
            $this.on('click', function () {
                var isShow = $this.attr('data-show');
                if (isShow == 0) {
                    $this.text('隐藏更多');
                    $this.attr('data-show', 1);
                    $this.parents('li').nextAll().removeClass('hide');
                } else {
                    $this.text('显示更多');
                    $this.attr('data-show', 0);
                    $this.parents('li').nextAll().addClass('hide');
                }
            })
        });
    }


    /*
     * 提现
     * */
    function withDraw() {
        //写入title,请求数据
        $('#popup').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var title = button.data('titlename');
            var modal = $(this);
            modal.find('.modal-title span').empty();
            modal.find('.modal-title').prepend('<span>' + title + '</span>');
            order_number = button.data('order-number');
            //获取订单信息
            var get_order_data = {
                "order_number": order_number
            };
            get_order_data = $.extend({}, get_order_data, cookie_tooken);
            Ajax_Data({
                "url": baseUrl + "/order/" + order_number,
                "data": get_order_data,
                "fn": get_order
            });

            //获取bank信息
            Ajax_Data({
                "url": baseUrl + "/profile/bank/get",
                "data": cookie_tooken,
                "fn": get_bank
            });
        });
        //提现显示预览
        $('body').on('click', '#get_view', function () {
            var arrDom = $('.modal-body input');
            var can_view = true;
            $.each(arrDom, function (index) {
                if (arrDom.eq(-(index + 1)).val() == '') {
                    console.log(-index);
                    $('.error_msg').html(arrDom.eq(-(index + 1)).prev('label').html().replace('：', '') + '不能为空');
                    can_view = false;
                }
            });
            if (can_view) {

                $('.modal-body').hide();
                var str = $('.modal-body-success').html();
                str = str.replace('user_name', $('#full_name').val());
                str = str.replace('address', $('#residence-address').val());
                str = str.replace('bank_name', $('#bank_name').val());
                str = str.replace('bank_address', $('#bank_address').val());
                str = str.replace('bank_account', $('#account_name').val());
                str = str.replace('swift_code', $('#swift_code').val());
                str = str.replace('aba_number', $('#routing_number').val());
                str = str.replace('invest_total', $('#invest_total').val());
                str = str.replace('withdraw_able_amount', $('#interest_amount').val());
                str = str.replace('withdraw_amount', $('#invest_value').val());
                $('.modal-body-success').html(str);
                $('.modal-body-success').show();
            }
            return false;
        });
        //返回修改提现
        $('body').on('click', '#back_prev', function () {
            $('.modal-body-success').hide();
            $('.modal-body').show();
            return false;
        });
        //提交订单提现
        $('body').on('click', '#invest_submit', function () {

            var withdraw_submit_data = {
                "order_number": order_number,
                "withdraw_amount": $('#invest_value').val(),
                "user_name": $('#full_name').val(),
                "user_address": $('#residence-address').val(),
                "bank_name": $('#bank_name').val(),
                "bank_address": $('#bank_address').val(),
                "account_number": $('#bank_address').val(),
                "swift_code": $('#bank_address').val(),
                "routing_number": $('#bank_address').val(),

            };
            withdraw_submit_data = $.extend({}, withdraw_submit_data, cookie_tooken);
            Ajax_Data({
                "url": baseUrl + "/withdraw/submit",
                "data": withdraw_submit_data,
                "fn": withdraw_submit
            });
            function withdraw_submit(d) {
                $('.modal-body-success').hide();
                $('.modal-footer').html('<p>提交成功</p>您的提现申请已提交成功，我们会尽快办理，请您保持通讯畅通，以方便与您联系。').show();
            }

            return false;
        });
        $('body').on('click', '.close', function () {
            $('.modal-body-success').hide();
            $('.modal-footer').html(' ').hide();
            $('.modal-body').show();
            return false;
        });
    }


    //重置密码
    function pws_reset(d) {
        var old_password = $('#id_old_password').val(),
            password = $('#id_password').val(),
            password_confirm = $('#id_password_confirm').val();
        var can_change = true;
        if (old_password == '') {
            $('#id_old_password').after('<span>请输入原密码</span>');
            can_change = false;
        }
        if (password == '') {
            $('#id_password').after('<span>请输入新密码</span>');
            can_change = false;
        } else if (password.length < 6) {
            $('#id_password').after('<span>密码长度不能少于6位</span>');
            can_change = false;
        }
        if (password_confirm == '') {
            $('#id_password_confirm').after('<span>请再次输入新密码</span>');
            can_change = false;
        }
        if (old_password == password && old_password != '') {
            $('#id_password').after('<span>新密码不能与原密码一致</span>');
            can_change = false;
        }
        if (password_confirm != password && password != '' && password_confirm != '') {
            $('#id_password_confirm').after('<span>您输入的两次密码不一致</span>');
            can_change = false;
        }
        if (can_change) {
            var change_password_data = {
                "old_password": old_password,
                "password": password
            };
            change_password_data = $.extend({}, change_password_data, cookie_tooken);
            Ajax_Data({
                "url": baseUrl + "/auth/change_password",
                "type": "post",
                "data": change_password_data,
                "fn": change_password,
                "fail_fn": change_password_fail
            });
            function change_password(d) {
                alert('修改成功');
                d.prop('disabled', false);
            }

            function change_password_fail(d) {
                alert(d);
                d.prop('disabled', false);
            }
        }
    }

    //投资订单,提现获取订单信息
    function get_order(d) {
        if (d) {
            if (d.product_location == 'OFF_SHORE' && d.product_type == 'NON_CROWD_FUNDING' && d.operation_mode == 'CLOSED') {
                $('#invest_value').val(d.withdraw_able_amount).attr('disabled', true);
            } else {
                $('#invest_value').val(d.withdraw_able_amount);
            }
            $('#invest_total').val(d.invest_amount);
            $('#interest_amount').val(d.withdraw_able_amount);
        }
    }

    //投资订单,提现获取银行信息
    function get_bank(d) {
        $('#bank_name').val(d.bank_name);
        $('#bank_address').val(d.bank_address);
        $('#account_name').val(d.account_name);
        $('#swift_code').val(d.swift_code);
        $('#routing_number').val(d.routing_number);
    }

    //h5  file_upload
    function file_upload(id) {
        var formData = new FormData($('form')[0]);
        formData.append('file', id[0].files[0]);
        formData.append('mx_token', mx_token);
        formData.append('mx_secret', mx_secret);
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
                    if (event.target.id == 'id_identification_card_photo') {
                        id_card_photo = result.body;
                    }
                    if (event.target.id == 'id_passport_photo') {
                        passport_photo = result.body;
                    }
                }
                if (result.code == -1) {
                    alert("上传失败,请重新上传");
                }
            }
        });
    }

});
