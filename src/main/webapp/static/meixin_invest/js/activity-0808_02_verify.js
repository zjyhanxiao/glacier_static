window.onload = function () {
//给<form>设置提交监听
    var formEle = document.forms[0];
    formEle.onsubmit = function () {
        return checkPhone() && checkPwd() && checkPwd2() && checkEmail();
        // window.location="www.baidu.html";
    };

//位手机号码11
    function checkPhone () {
        var phoneEle = document.getElementById("phone");
        var reg = /\d{11}/;
        if(!reg.test(phoneEle.value)) {
            $("#phone").after("<p style='text-align: center; color: #900'>请输入正确的手机号码</P>");
            $("#phone").focus(function () {
                $("#phone").next('p').remove();
            });
            // alert("请输入正确的手机号码");
            return false;
        }
        return true;
    }
//密码: 至少包含 6 个字符
    function checkPwd () {
        var pwdEle = document.getElementById("pwd");
        if(pwdEle.value.length<6) {
            $("#pwd").after("<p style='text-align: center; color: #900'>密码长度不能小于6位</P>");
            $("#pwd").focus(function () {
                $("#pwd").next('p').remove();
            });
            return false;
        } else {
            return true;
        }
    }

//电子邮箱: 必须满足邮箱格式
    function checkEmail () {
        var emailEle = document.getElementById("email");
        var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if(!reg.test(emailEle.value)) {
            $("#pwd").after("<p style='text-align: center; color: #900'>邮箱格式不正确</P>");
            $("#pwd").focus(function () {
                $("#pwd").next('p').remove();
            });
            return false;
        }
        return true;
    }

};