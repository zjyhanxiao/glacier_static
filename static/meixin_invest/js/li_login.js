/**
 * Created by admin on 2016/8/22.
 */
// 取cookie
var mx_token = $.cookie('mx_token'),
    mx_secret = $.cookie('mx_secret');
cookie_tooken = {mx_token: mx_token, mx_secret: mx_secret};
//设置遮罩层高度
function setHeight() {
    $('.ajax_wait').height($(window).height());
}

$(function () {
    $("#login").on('click',function() {
        var data = {};
        if($('#general').hasClass('active')){
            data.user_name = $('#id_telephone').val();
            data.password = $('#password').val();
            if ($('#id_telephone').val().length<6) {
                alert("请输入手机号");
                return false;
            }
            else if ($('input[type="password"]').val() == '') {
                alert("请输入密码");
                return false;
            }
            else {
                $.ajax({
                    type: 'post',
                    url: "http://101.201.112.171:8082/web/auth/login",
                    data: data,
                    success: function (res) {
                        if (res.code == 1) {
                            alert(res.msg);
                        } else if (res.code == -1) {
                            alert(res.msg);
                        }
                    },
                    complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            // ajaxTimeoutTest.abort();
                            console.log('超时');
                            //提示网络问题
                            $('.ajax_wait_gif img').attr('url', '/dist/meixin_invest/img/net_lazy.png');
                        }
                    }
                })
            }
        }

        var data1 = {};
        if($('#invest').hasClass('active')){
            data1.user_name = $('#email').val();
            data1.password = $('#password').val();
            var emailEle = document.getElementById("email");
            var reg = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z0-9\.]{2,6})$/;
            if (!reg.test(emailEle.value)) {
                alert("请输入正确的邮箱格式");
                return false;
            }
            else if ($('input[type="password"]').val() == '') {
                alert("请输入密码");
                return false;
            }
            else {
                $.ajax({
                    type: 'post',
                    url: "http://101.201.112.171:8082/web/auth/login",
                    data: data1,
                    success: function (res) {
                        if (res.code == 1) {
                            alert(res.msg);
                        } else if (res.code == -1) {
                            alert(res.msg);
                        }
                    },
                    complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            // ajaxTimeoutTest.abort();
                            console.log('超时');
                            //提示网络问题
                            $('.ajax_wait_gif img').attr('url', '/dist/meixin_invest/img/net_lazy.png');
                        }
                    }
                })
            }
        }
        return false;
    });

});