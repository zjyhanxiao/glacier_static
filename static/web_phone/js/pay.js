$(document).ready(function() {
    waitingInit();
    var purl = $.url(window.location.href);
    var base_url = purl.attr('path');
    var prod_id = purl.segment(4);
    var step = window.location.href.substring(window.location.href.indexOf('#')+1);
    var data = {};

    get_investor_profile(main);

    function main(result) {
        data['user_id'] = result.data['user_id'];
        data['phone'] = result.data.contact_phone;
        data['email'] = result.data.mail;
        data['investor_type'] = result.data.investor_type;
        data['ip_address'] = result.data.ip_address;
        data['user_agent'] = result.data.user_agent.substring(0, 500);
        data['entity_id'] = result.data.entity_id;
        if (data['investor_type'] == 1) {
            $("#pay-title-text").html("投资流程 4/4: 投资确认");
        } else {
            $("#pay-title-text").html("投资流程 5/5: 投资确认");
        }
        $("#ach").click(function(){
            window.location.href = URL_ACH;
        })
        $("#agree").click(function(){
            window.location.href = URL_AGREE + '/' + data['investor_type'];
        })

        get_offering_id();
        if (data['entity_id'].length > 0) {
            get_entity_details();
        }
        $($("div [name='step']")[step]).show();
    }

    $(window).bind('hashchange', function() {
        $("div [name='step']").hide();
        var step = window.location.href.substring(window.location.href.indexOf('#'));
        for (var i=0; i<9; i++) {
            if (step == '#'+i) $($("div [name='step']")[i]).show();
        }
    });

    function pay_error(result) {
        var now = jQuery.parseJSON(result);
        if (now['errors']) {
            for (var key in now['errors']) {
                return '提交失败：' + key + '. ' +  now['errors'][key];
            }
        }
        return '提交失败';
    }

    $(document).ajaxError(function(result, status) {
        waitingHide();
        if (status.status == 500) {
            $("#hint-submit").html("服务器未响应");
            return ;
        }
        if (status.status == 422) {
            $("#hint-submit").html(pay_error(status.responseText));
            return ;
        }
        $("#hint-submit").html("投资失败");
    });

    function waitingInit() {
        $("#waiting")[0].style.overflow = "visible";
        $("#waiting").dialog({modal:true, width: 170, height: 50});
        $(".ui-dialog-titlebar").hide();
        $("#waiting").dialog("close");
    }

    function waitingShow() {
        $("#waiting").dialog("open");
    }

    function waitingHide() {
        $("#waiting").dialog("close");
    }

    function bind_select(name, number) {
        for (var i=1; i<=number; i++) {
            $("#"+name+"-"+i).click(function(){
                $("div [name='"+$(this).attr('name')+"']").removeClass("selected");
                $(this).addClass("selected");
            });
        }
    }

    function get_select(name, number) {
        for (var i=1; i<=number; i++) {
            if ($("#"+name+"-"+i).hasClass("selected")) {
                return i;
            }
        }
        return 0;
    }

    $("#pay-title-1").click(function(){
        $("#pay-2").hide();
        $("#pay-1").slideDown();
        $("#ach-agreement").show();
    });
    $("#pay-title-2").click(function(){
        $("#pay-1").hide();
        $("#pay-2").slideDown();
        $("#ach-agreement").hide();
    });
    $("#pay-title-3").click(function(){
        $("#pay-1").hide();
        $("#pay-2").hide();
        $("#ach-agreement").hide();
    });
    $("#assert-1").click(function(){
        $("#assert-details").slideDown();
    });
    $("#assert-2").click(function(){
        $("#assert-details").slideUp();
    });
    $("#assert-details").hide();

    $("div [name='choose']").hide();
    for (var i=1; i<=7; i++) {
        $("#choose-title-"+i).click(function(){
            $("div [name='choose']").hide();
            $('#choose-' + this.id.substring(13, 14)).slideDown();
        });
    }
    bind_select('pay-title', 3);
    bind_select('account', 2);
    bind_select('check', 2);
    bind_select('assert', 2);
    bind_select('details', 2);
    bind_select('choose-title', 7);
    bind_select('citizen', 2);
    bind_select('withholding', 2);


    function readURL(input, img) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                img.attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#img-div-1").click(function(){
        $("#input-photo-1")[0].click();
    });

    $("#img-div-2").click(function(){
        $("#input-photo-2")[0].click();
    });

    $('#agreement-ach').iCheck({
            cursor : true,
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%',
    });
    $('#agreement-final').iCheck({
            cursor : true,
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%',
    });

    $("#input-photo-1").change(function(){
        readURL(this, $("#img-photo-1"));
        data['photo-1'] = 1;
    });
    $("#input-photo-2").change(function(){
        readURL(this, $("#img-photo-2"));
        data['photo-2'] = 1;
    });

    function pop(arr) {
        var res = [];
        for (var i=1; i<arr.length; i++) {
            res.push(arr[i]);
        }
        return res;
    }

    function get_entity_details() {
        $.ajax({
            url: API_ENTITY + '/' + data['entity_id'],
            dataType: 'json',
            method: 'GET',
            data: {
            },
            success: function(result, status) {
                data['country'] = result['country'];
                data['region'] = result['region'];
                data['city'] = result['city'];
                data['street_address_1'] = result['street_address_1'];
                data['postal_code'] = result['postal_code'];
                data['name'] = result['name'];
                data['date_of_birth'] = result['date_of_birth'];
                data['tax_id_number'] = result['tax_id_number'];
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    function get_offering_id() {
        $.ajax({
            url: API_FUNDS,
            dataType: 'json',
            method: 'GET',
            data: {
                type: data['investor_type'],
                id: prod_id,
            },
            success: function(result, status) {
                data['offering_id'] = result.fund['external_id'];
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    $("#btn-idcard").click(function(){
        var hint = $("#hint-photo");
        hint.html('');
        if (!data['photo-1']) {
            hint.html(HINT[ERROR.PHOTO_EMPTY]);
            return ;
        }
        var form = new FormData();
        form.append('id_card_photo', $("#input-photo-1")[0].files[0]);
        if (data['photo-2']) {
            form.append('passport_photo', $("#input-photo-2")[0].files[0]);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', API_CLIENT_PROFILE);
        xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
        xhr.onload = function() {
            window.location.href = base_url + '#1';
        }
        xhr.send(form);
    });
    $("#btn-person").click(function() {
        var hint = $("#hint-person");
        hint.html('');

        var keys = ['firstname', 'lastname', 'country', 'idnumber', 'passport', 'birthday']
        var now = {};
        for (var index in keys) {
            key = keys[index];
            now[key] = $('#'+key).val();
            if (err = format_error(key, now[key])) {
                hint.html(HINT[err]);
                return ;
            }
        }
        data['name'] = now['firstname'] + ' ' + now['lastname'];
        data['country'] = now['country'];
        data['region'] = now['country'];
        data['date_of_birth'] = now['birthday'];
        data['id_card_number'] = now['idnumber'];
        data['tax_id_number'] = passport2taxid(now['passport']);
        window.location.href = base_url + '#2';
    });
    $("#btn-address").click(function(){
        var hint = $("#hint-address");
        hint.html('');

        var keys = ['province', 'city', 'address', 'room', 'postal'];
        var now = {};
        for (var index in keys) {
            key = keys[index];
            now[key] = $('#'+key).val();
            if (err = format_error(key, now[key])) {
                hint.html(HINT[err]);
                return ;
            }
        }
        data['city'] = now['city'];
        data['street_address_1'] = now['address'] + ' ' + now['room'];
        data['postal_code'] = now['postal'];
        window.location.href = base_url + '#7';
    });
    $("#btn-info").click(function(){
        var hint = $("#hint-info");
        hint.html('');
        var keys = ['ENname', 'ENssn', 'ENbirthday', 'ENaddress',
        'ENroom', 'ENstate', 'ENcity', 'ENpostal'];
        var now = {};
        for (var index in keys) {
            key = keys[index];
            now[key] = $('#'+key).val();
            if (err = format_error(key, now[key])) {
                hint.html(HINT[err]);
                return ;
            }
        }
        data['country'] = 'US';
        data['region'] = 'NY';
        data['name'] = now['ENname'];
        data['tax_id_number'] = now['ENssn'];
        data['id_card_number'] = now['ENssn'];
        data['date_of_birth'] = now['ENbirthday'];
        data['street_address_1'] = now['ENaddress'] + ' ' + now['ENroom'];
        data['city'] = now['ENcity'];
        data['postal_code'] = now['ENpostal'];
        window.location.href = base_url + '#4';
    });
    $("#btn-assert").click(function(){
        var hint = $("#hint-assert");
        hint.html('');
        if (get_select('assert', 2) == 0) {
            hint.html(HINT[ERROR.ACCREDITED_EMPTY]);
            return ;
        }
        if (get_select('assert', 2) == 2) {
            hint.html(HINT[ERROR.ACCREDITED_ERROR]);
            return ;
        }

        if (get_select('details', 2) == 0) {
            hint.html(HINT[ERROR.INCOME_EMPTY]);
            return ;
        }
        if (get_select('details', 2) == 1) {
            data['type'] = 'individual_net_worth';
        } else {
            data['type'] = 'individual_income';
        }
        window.location.href = base_url + '#5';
    });
    $("#btn-choose").click(function(){
        var hint = $("#hint-choose");
        hint.html('');
        if (get_select('choose-title', 7) == 0) {
            hint.html(HINT[ERROR.CHOOSE_EMPTY]);
            return ;
        }
        var s = ['',
        'web_search',
        'website',
        'accountant',
        'broker',
        'lawyer',
        'will_send_tax_returns',
        'will_send_proof'];
        data['confirmation_methods'] = s[get_select("choose-title", 7)];
        window.location.href = base_url + '#6';
    });
    $("#btn-check").click(function(){
        var hint = $("#hint-check");
        hint.html('');
        if (get_select('citizen', 2) == 0) {
            hint.html(HINT[ERROR.CITIZEN_EMPTY]);
            return ;
        }
        if (get_select('citizen', 2) == 1) {
            data['us_citizen_or_resident'] = 'true';
        } else {
            data['us_citizen_or_resident'] = 'false';
        }

        if (get_select('withholding', 2) == 0) {
            hint.html(HINT[ERROR.WITHHOLDING_EMPTY]);
            return ;
        }
        if (get_select('withholding', 2) == 1) {
            data['exempt_from_withholding'] = 'true';
        } else {
            data['exempt_from_withholding'] = 'false';
        }

        window.location.href = base_url + '#7';
    });

    function save(callbacks) {
        $.ajax({
            url: API_ORDER,
            dataType: 'json',
            method: 'POST',
            data: {
                'user': data['user_id'],
                'product': prod_id,
                'invest_amount': data['amount'],
                'payment_method': data['pay'],
                'external_id': data['external_id']
            },
            success: function(result, status) {
                window.location.href = base_url + '#8';
                waitingHide();
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }


    function invest(callbacks) {
        var now = {
                'offering_id': data['offering_id'],
                'amount': data['amount'],
                'entity_id': data['entity_id'],
                'subscription_agreement_id': data['agreement_id'],
                'payment_method': data['pay'],
                'review_trade': 'false'
            };
        if (data['pay'] == 'ach') {
            now['ach_authorization_id'] = data['ach_authorization_id'];
        }
        $.ajax({
            url: API_INVEST,
            dataType: 'json',
            method: 'POST',
            data: now,
            success: function(result, status) {
                data['external_id'] = result.id;
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    function ach(callbacks) {
        $.ajax({
            url: API_ACH,
            dataType: 'json',
            method: 'POST',
            data: {
                'account_number': data['accountnumber'],
                'account_type': data['account_type'],
                'address': data['street_address_1'],
                'check_type': data['check_type'],
                'city': data['city'],
                'email': data['email'],
                'entity_id': data['entity_id'],
                'ip_address': data['ip_address'],
                'literal': data['sign'],
                'name_on_account': data['accountname'],
                'routing_number': data['routingnumber'],
                'state': data['country'],
                'user_agent': data['user_agent'],
                'zip_code': data['postal_code'],
            },
            success: function(result, status) {
                data['ach_authorization_id'] = result.id;
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    function sign(callbacks) {
        $.ajax({
            url: API_SIGN+'/'+data['sign_id'],
            dataType: 'json',
            method: 'PATCH',
            data: {
                'ip_address': data['ip_address'],
                'name': data['name'],
                'email': data['email'],
                'user_agent': data['user_agent'],
                'literal': data['sign']
            },
            success: function(result, status) {
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    function agreement(callbacks) {
        $.ajax({
            url: API_AGREEMENT,
            dataType: 'json',
            method: 'POST',
            data: {
                'equity_share_count': 10,
                'offering_id': data['offering_id'],
                'vesting_amount': data['amount'],
                'vesting_as': data['sign'],
                'vesting_as_email': data['email'],
                'debt_par_value': '5000'
            },
            success: function(result, status) {
                data['agreement_id'] = result.id;
                data['agreement_url'] = result.url;
                if (result.electronic_signatures[0]['anchor_id'] == 'subscriber_signature') {
                    data['sign_id'] = result.electronic_signatures[0].id;
                } else {
                    data['sign_id'] = result.electronic_signatures[1].id;
                }
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    function accreditation(callbacks) {
        $.ajax({
            url: API_ENTITY + '/' + data['entity_id'] + '/investor_accreditation',
            dataType: 'json',
            method: 'PATCH',
            data: {
                type: data['type'],
                us_citizen_or_resident: data['us_citizen_or_resident'],
                exempt_from_withholding: data['exempt_from_withholding'],
                confirmation_methods: data['confirmation_methods'],
                annual_income: '250000.0',
                net_worth: '1000000.0',
            },
            success: function(result, status) {
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }
    function upload_entity(callbacks) {
        $.ajax({
            url: API_CLIENT_PROFILE,
            dataType: 'json',
            method: 'post',
            data: {
                'external_entity_id': data['entity_id'],
                'real_name': data['name'],
                'id_card_code': data['id_card_number'],
            },
            success: function(result, status) {
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    function entity(callbacks) {
        $.ajax({
            url: API_ENTITY,
            dataType: 'json',
            method: 'POST',
            data: {
                'country': data['country'],
                'region': data['region'],
                'city': data['city'],
                'street_address_1': data['street_address_1'],
                'postal_code': data['postal_code'],
                'email': data['email'],
                'phone': data['phone'],
                'name': data['name'],
                'date_of_birth': data['date_of_birth'],
                'tax_id_number': data['tax_id_number'],
                'type': 'person',
                'entity_type': 'person'
            },
            success: function(result, status) {
                data['entity_id'] = result.id;
                callbacks[0](pop(callbacks));
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    $("#btn-submit").click(function(){
        var hint = $("#hint-submit");
        hint.html('');
        var keys = [];

        if (get_select('pay-title', 3) == 0) {
            hint.html(HINT[ERROR.PAY_EMPTY]);
            return ;
        }
        if (get_select('pay-title', 3) == 1) {
            data['pay'] = 'ach';
            keys = ['amount', 'sign', 'accountname', 'routingnumber', 'accountnumber'];
            if (get_select('account', 2) == 0) {
                hint.html(HINT[ERROR.ACC_EMPTY]);
                return ;
            }
            if (get_select('account', 2) == 1) {
                data['account_type'] = 'checking';
            } else {
                data['account_type'] = 'checking'; //todo
            }

            if (get_select('check', 2) == 0) {
                hint.html(HINT[ERROR.CHECK_EMPTY]);
                return ;
            }
            if (get_select('check', 2) == 0) {
                data['check_type'] = 'personal';
            } else {
                data['check_type'] = 'business';
            }

            if (!$("#agreement-ach").is(':checked')) {
                hint.text(HINT[ERROR.AGREEMENT_EMPTY]);
                return ;
            }
        } else if (get_select('pay-title', 3) == 2) {
            data['pay'] = 'wire';
            keys = ['amount', 'sign'];
        } else {
						data['pay'] = 'check';
						keys = ['amount', 'sign'];
				}

        for (var index in keys) {
            key = keys[index];
            data[key] = $('#'+key).val();
            if (err = format_error(key, data[key])) {
                hint.html(HINT[err]);
                return ;
            }
        }

        if (!$("#agreement-final").is(':checked')) {
            hint.text(HINT[ERROR.AGREEMENT_EMPTY]);
            return ;
        }
        var funcs = [];
        if (data['entity_id'].length == 0) {
            funcs.push(entity);
            funcs.push(upload_entity);
            if (data['investor_type'] == 2) {
                funcs.push(accreditation);
            }
        }
        funcs.push(agreement);
        funcs.push(sign);
        if (data['pay'] == 'ach') {
            funcs.push(ach);
        }
        funcs.push(invest);
        if (data['entity_id'].length == 0) {
            funcs.push(upload_entity);
        }
        funcs.push(save)
        waitingShow();
        funcs[0](pop(funcs));
    });

    $("#btn-finished").click(function(){
        window.location.href = URL_INVEST;
    });
    //test data
    /*
    $("#ENname").val('qiaoqian');
    $("#ENssn").val('100200300');
    $("#ENbirthday").val('1992-12-29');
    $("#ENaddress").val('tsinghua university fit building');
    $("#ENroom").val('504');
    $("#ENcity").val('beijing');
    $("#ENpostal").val('100084');
    $("#ENstate").val("beijing");

    $("#firstname").val('qiao');
    $("#lastname").val('qian');
    $("#idnumber").val('120105199212295417');
    $("#passport").val('120105111');
    $("#birthday").val('1992-12-29');
    $("#province").val("beijing");
    $("#city").val("beijing");
    $("#address").val('tsinghua university fit building');
    $("#room").val('504');
    $("#postal").val('100084');
    $("#amount").val('10000');
    $("#sign").val('qiaoqian');
    $("#accountname").val('qiaoqian');
    $("#routingnumber").val('021000089');
    $("#accountnumber").val('0000123456789');
    */
    //test data end
});
