/**
 * Created by zhangjingyu on 16/8/5.
 */
var is_success = false, b_is_login = false;
var token = $.cookie('mx_sid');

if (!token) {
    window.location = 'https://www.meixinfinance.com';
}

//设置遮罩层高度
function setHeight() {
    $('.ajax_wait').height($(window).height());
}

//页面加载完成,get请求
var getAjaxData = function (options) {
    $.ajax({
        type: options.type || 'get',
        // type: 'get',
        url: options.url,
        data: options.data,
        timeout: 5e3,
        success: function (data) {
            // console.log(JSON.stringify(data));
            var res = data.body || null;
            if (data && data.code && data.code == -1) {
                //window.location = 'https://www.meixinfinance.com/login';
                // options.fn && options.fn(res);
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


var baseUrl = 'http://101.201.112.171:8082/apiv2';

$(function () {
    setTimeout(function () {
        $('.ajax_wait p').show();
    }, 3e3);

    // 调取 登录接口
    getAjaxData({
        "url": baseUrl + "/auth/login",
        "type": "post",
        "data": {"user_name": "+86 18810797876", "password": "111111"},
        "fn": is_login
    });
    // 验证是否登录
    getAjaxData({
        "url": baseUrl + "/auth/is_login",
        "data": "",
        "fn": is_login
    });

    //is_login  调取登录接口
    function is_login(res) {
        $('.navbar ul li:last-child').html('<a class="btn btn-min-width" href="/investor/dashboard">我的账户</a>');
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm" href="/logout">退出</a>');
        $('.ajax_wait').hide();
        b_is_login = true;
    }

    if (b_is_login && token) {
        getAjaxData({
            "url": baseUrl + "/profile/get",
            "data": '',
            "fn": get_profile
        });
    }

    function get_profile(d) {
        $('#lastname')[0].value = d.real_name || '';
        $('#firstname')[0].value = d.first_name || '';
        $('#birth-date')[0].value = d.date_of_birth || '';
        $('#birth-countries-states')[0].value = d.country_of_birth || '';
        $('#citizenship-countries-states')[0].value = d.nationality || '';
        $('#occupation')[0].value = d.occupation || '';
    }
});
