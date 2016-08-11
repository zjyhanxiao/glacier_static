/**
 * Created by zhangjingyu on 16/8/5.
 */

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}


var is_new = true, is_old = false;

var is_success = false, cookie_tooken = {}, order_id = '', passport_photo = '';
var token = $.cookie('mx_sid');
if (!token) {
    window.location = 'https://www.meixinfinance.com';
}

//设置遮罩层高度
function setHeight() {
    $('.ajax_wait').height($(window).height());
}

//页面加载完成,get请求
var Ajax_Data = function (options) {
    $.ajax({
        type: options.type || 'get',
        url: options.url,
        data: options.data,
        timeout: 5e3,
        success: function (data) {
            console.log(options.url + ": " + JSON.stringify(data));
            var res = data.body || null;
            if (data && data.code && data.code == -1) {
                options.fail_fn&&options.fail_fn(res);
            }

            if (data && data.code && data.code == 0) {
                // 提示网络问题
                $('.ajax_wait_gif img').attr('url', '/dist/meixin_invest/img/net_lazy.png');
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


var baseUrl = 'http://bj.meixinfinance.com/:8081/apiv2';

$(function () {
    setTimeout(function () {
        $('.ajax_wait p').show();
    }, 3e3);


    // 调取 登录接口
    /*Ajax_Data({
     "url": baseUrl + "/auth/login",
     "type": "post",
     "data": {"user_name": "+86 18810797876", "password": "111111"},
     "fn": login
     });


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

     //取cookie
     var mx_token = $.cookie('mx_token'),
     mx_secret = $.cookie('mx_secret');

     cookie_tooken = {mx_token: mx_token, mx_secret: mx_secret};

     // 验证是否登录
     Ajax_Data({
     "url": baseUrl + "/auth/is_login",
     "data": cookie_tooken,
     "fn": is_login
     });
     }*/
});
