/**
 * Created by zhangjingyu on 16/8/5.
 */
var ajax_ok = false;
var token = $.cookie('mx_sid');
if (!token) {
    //window.location = 'https://www.meixinfinance.com';
}
function setHeight() {
    $('.ajax_wait').height($(window).height());
}
$(function () {
    var getAjaxData = function (url, type) {
        $.ajax({
            type: 'get',
            url: url,
            data: null,
            timeout: 5e3,
            success: function (data) {
                console.log(JSON.stringify(data));
                if (data && data.code && data.code == -1) {
                    //window.location = 'https://www.meixinfinance.com/login';
                }

                if (data && data.code && data.code == 0) {
                    // 提示网络问题
                }

                if (data && data.code && data.code == 1) {
                    switch (type) {
                        case "login":
                            login();
                            break;
                        default:
                            break;
                    }
                }
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    // ajaxTimeoutTest.abort();
                    //提示网络问题
                }
            }
        });
    };
    getAjaxData('http://101.201.112.171:8082/apiv2/is_login', 'login');


    //login
    function login() {
        $('.navbar ul li:last-child').html('<a class="btn btn-min-width" href="/investor/dashboard">我的账户</a>');
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm" href="/logout">退出</a>');
        $('.ajax_wait').hide();
        ajax_ok = true;
    }
});
