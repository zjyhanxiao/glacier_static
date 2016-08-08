/**
 * Created by zhangjingyu on 16/8/5.
 */
var ajax_ok = false;
var token = $.cookie('mx_sid');

if (!token) {
    window.location = 'https://www.meixinfinance.com';
}

//设置遮罩层高度
function setHeight() {
    $('.ajax_wait').height($(window).height());
}

$(function () {
    //页面加载完成,get请求
    var getAjaxData = function (url, type) {
        $.ajax({
            type: 'get',
            url: url,
            data: null,
            timeout: 5e3,
            success: function (data) {
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
    var getAjaxData = function (url, data, type) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            timeout: 5e3,
            success: function (data) {
                if (data && data.code && data.code == -1) {
                    //window.location = 'https://www.meixinfinance.com/login';
                    login();
                    console.log(is_login);
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
        var is_login = true;
    }
});
