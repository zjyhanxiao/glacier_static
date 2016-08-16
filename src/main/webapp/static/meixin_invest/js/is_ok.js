/**
 * Created by zhangjingyu on 16/8/5.
 */

var is_new = true,           //新建订单
    is_old = false,          //已有订单,链接来源-mycount
    order_number,            //订单order_number;
    is_changed = false,      //是否上传图片,默认否
    cookie_tooken = {},      //登录cookie
    id_card_photo='',        //上传身份证,返回的身份证链接
    passport_photo = '',     //上传护照,返回的护照链接
    address_proof = '',      //上传地址证明,返回的地址证明链接
    default_address_proof=true,//地址证明为默认图片
    default_passport_photo=true,//护照为默认图片
    default_id_card_photo=true,//身份证为默认图片
    //可上传两个证件
    id_card_is_changed=false,//身份证是否上传,默认否
    passport_photo_is_changed=false;//护照是否上传,默认否


var token1 = $.cookie('mx_token');
var token2 = $.cookie('mx_secret');
if (!token1 && token2) {
    window.location = 'https://www.meixinfinance.com';
}

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
            console.log(options.url + ": " + JSON.stringify(data));
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


    // 取cookie
    var mx_token = $.cookie('mx_token'),
        mx_secret = $.cookie('mx_secret');
    cookie_tooken = {mx_token: mx_token, mx_secret: mx_secret};


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
        $('.navbar ul li:nth-last-child(2)').html('<a class="btn btn-min-width-sm" href="/logout">退出</a>');
        $('.ajax_wait p,.ajax_wait').hide();

        // 获取profile信息
        var get_profile_data = {
            "fields": "id_card_photo,passport_photo"
        };
        get_profile_data = $.extend({}, get_profile_data, cookie_tooken);
        Ajax_Data({
            "url": baseUrl + "/profile/get",
            "data": get_profile_data,
            "fn": get_profile
        });

        // 上传证件图片
        $('.fa-upload-pic input').each(function () {
            var $this=$(this);
            $this.change(function (event) {
                var val = $this.val().toLowerCase();
                var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif|bmp)$");
                if (!(regex.test(val))) {
                    $this.val('');
                    alert('图片格式不正确，支持图片格式(.jpg|.jpeg|.png|.gif|.bmp)');

                } else {
                    file_upload($this);
                    $this.siblings('img').attr('src', URL.createObjectURL(event.target.files[0]));
                }
            });
        });
        $('#submit_step_three').on('click', function () {
            var default_passport_photo = "/meixin_invest/img/upload_id_placeholder_518x348.png";
            var img_src = $('#identity-proof').siblings('img').attr('src');
            if (img_src != default_passport_photo) {
                $('#identity-proof').prop("required", false);
            }
            if ($('.fa-steps').parsley().validate()) {
                $('.ajax_wait').show();
                setTimeout(function () {
                    $('.ajax_wait p').show();
                }, 3e3);
                order_number = getUrlParam("order_number");


                //上传profile信息
                var update_profile_data = {};
                if (is_changed) {
                    update_profile_data.passport_photo = passport_photo;
                } else {
                    update_profile_data.passport_photo = img_src;
                }
                update_profile_data = $.extend({}, update_profile_data, cookie_tooken);
                Ajax_Data({
                    "type": "post",
                    "url": baseUrl + "/profile/update",
                    "data": update_profile_data,
                    "fn": update_profile,
                    "fail_fn": update_profile_fail
                });
                return false;
            }
        })
    }

    //获取profile信息
    function get_profile(d) {
        if (d.passport_photo != "" && d.passport_photo != null) {
            $('.fa-upload-id-pic').find('img').attr('src', d.passport_photo);
            $('#identity-proof').prop("required", false);
        }
    }

    //更新profile信息
    function update_profile(res) {
        $('.ajax_wait p,.ajax_wait').hide();
        window.location.href = "/fa_invest/invest_yellowstone_step_4.html?order_number=" + order_number;
    }


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
                    if(event.target.id=='id_card_photo'){
                        id_card_photo=result.body;
                        id_card_is_changed = true;
                    }
                    if(event.target.id=='passport_photo'){
                        passport_photo=result.body;
                        passport_photo_is_changed = true;
                    }
                }
                if (result.code == -1) {
                    alert("上传失败,请重新上传");
                }
            }
        });
    }
});
