/**
 * Created by zhangjingyu on 16/8/5.
 */

var is_new = true,           //新建订单
    is_old = false,          //已有订单,链接来源-mycount
    order_number,            //订单order_number;
    is_changed = false,      //是否上传图片,默认否
    cookie_tooken = {},      //登录cookie
    id_card_photo = '',        //上传身份证,返回的身份证链接
    passport_photo = '',     //上传护照,返回的护照链接
    address_proof = '',      //上传地址证明,返回的地址证明链接
    default_address_proof = true,//地址证明为默认图片
    default_passport_photo = true,//护照为默认图片
    default_id_card_photo = true;//身份证为默认图片


var token1 = $.cookie('mx_token');
var token2 = $.cookie('mx_secret');
if (!token1 && token2) {
    window.location = 'https://www.meixinfinance.com';
}

// 取cookie
var mx_token = $.cookie('mx_token'),
    mx_secret = $.cookie('mx_secret');
cookie_tooken = {mx_token: mx_token, mx_secret: mx_secret};
//设置遮罩层高度
function setHeight() {
    $('.ajax_wait').height($(window).height());
}

//页面加载完成,发送ajax请求
var Ajax_Data = function (options) {
    $.ajax({
        type: options.type || 'get',
        url: options.url,
        data: options.data,
        timeout: 5e3,
        async: options.async,
        success: function (data) {
            // console.log(options.url + ": " + JSON.stringify(data));
            var res = data.body || null;
            var login_fail_data = data.msg || null;
            if (data.code == -1) {
                options.no_login && options.no_login(res);
            }

            if (data.code == 0) {
                // 提示网络问题
                options.fail_fn && options.fail_fn(login_fail_data);
            }

            if (data && data.code && data.code == 1) {
                options.fn && options.fn(res);
            }
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                // ajaxTimeoutTest.abort();
                //提示网络问题
                $('.ajax_wait_gif img').attr('url', '/dist/meixin_invest/img/net_lazy.png');
            }
        }
    });
};
//创建订单失败执行
function create_order_fail(d) {
    $('.ajax_wait p,.ajax_wait').hide();
    alert(d);
}

//更新profile信息失败执行
function update_profile_fail(d) {
    $('.ajax_wait p,.ajax_wait').hide();
    alert(d);
}
//提交订单失败执行
function commit_order_fail(d) {
    $('.ajax_wait p,.ajax_wait').hide();
    alert(d);
}
//更新bank信息失败执行
function update_bank_fail(d) {
    $('.ajax_wait p,.ajax_wait').hide();
    alert(d);
}
//替换中文标点
function ReplaceDot(id) {
    var Obj = document.getElementById(id);
    while (Obj.value.indexOf("。") != -1 || Obj.value.indexOf("，") != -1) {
        Obj.value = Obj.value.replace("。", ".");
        Obj.value = Obj.value.replace("，", ",");
    }
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}


var baseUrl = 'http://192.168.1.100:8081/web';
// var baseUrl = 'http://101.201.112.171:8082/web';

$(function () {
    setTimeout(function () {
        $('.ajax_wait p').show();
    }, 3e3);
    $('section input').each(function (index) {
        $('section input').eq(index).attr('data-parsley-group', 'block-' + index);
    });
    $('.previous').on('click',function(){
       window.history.go(-1);
    });
    // 调取 登录接口
/*    Ajax_Data({
        "url": baseUrl + "/auth/login",
        "type": "post",
        "data": {"user_name": "+86 15001393659", "password": "123456789"},
        // "data": {"user_name": "+86 18810797876", "password": "111111"},
        "fn": login,
        "fail_fn": login_fail
    });

    function login_fail(d) {
        $('.ajax_wait p,.ajax_wait').hide();
        alert(d);
    }

    function login(res) {
        $('.navbar ul li:last-child').html('<a class="btn btn-min-width" href="/investor/dashboard">我的账户</a>');
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm" href="/logout">退出</a>');
        $('.ajax_wait p,.ajax_wait').hide();

        //清楚cookie
        $.cookie('mx_token', '', {expires: -1});
        $.cookie('mx_secret', '', {expires: -1});
        // 设置cookie
        $.cookie('mx_token', res.mx_token, {expires: 10});
        $.cookie('mx_secret', res.mx_secret, {expires: 10});
    }*/
});
