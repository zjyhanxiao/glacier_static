/**
 * Created by zhangjingyu on 16/8/5.
 */
var baseUrl='http://101.201.112.171:8082/apiv2';
var is_success = false, b_is_login=false;
var token = $.cookie('mx_sid');

if (!token) {
    window.location = 'https://www.meixinfinance.com';
}

//设置遮罩层高度
function setHeight() {
    $('.ajax_wait').height($(window).height());
}

$(function () {
    setTimeout(function () {
        $('.ajax_wait p').show();
    }, 3e3);
    //页面加载完成,get请求
    var getAjaxData = function (options) {
        $.ajax({
            type: 'get',
            url: options.url,
            data: options.data,
            timeout: 5e3,
            success: function (data) {
                console.log(JSON.stringify(data));
                if (data && data.code && data.code == -1) {
                    //window.location = 'https://www.meixinfinance.com/login';
                    options.fn;
                }

                if (data && data.code && data.code == 0) {
                    // 提示网络问题
                    $('.ajax_wait_gif img').attr('url', '/dist/meixin_invest/img/net_lazy.png');
                }

                if (data && data.code && data.code == 1) {
                    var d = data.body;
                    options.fn;
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
    var postAjaxData = function (url, data, type) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
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

    // 调取 登录接口
    getAjaxData({
        "url":baseUrl+"/auth/is_login",
        "data":'',
        "fn":is_login()
    });

    //is_login  调取登录接口
    function is_login() {
        $('.navbar ul li:last-child').html('<a class="btn btn-min-width" href="/investor/dashboard">我的账户</a>');
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm" href="/logout">退出</a>');
        b_is_login = true;
        $('.ajax_wait').hide();
    }



    //get_profile 调取获取信息接口
    function get_profile(d) {
        $('#lastname')[0].value = d.real_name || '';
        $('#firstname')[0].value = d.first_name || '';
        $('#birth-date')[0].value = d.date_of_birth || '';
        $('#birth-countries-states')[0].value = d.country_of_birth || '';
        $('#citizenship-countries-states')[0].value = d.nationality || '';
        $('#occupation')[0].value = d.occupation || '';/*
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';
        $('#lastname')[0].value = d.last_name || '';*/
    }
});
