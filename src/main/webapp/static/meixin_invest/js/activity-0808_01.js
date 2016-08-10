$(function () {
    // cookie数据
    $('#sub').click(function () {
        var values = [];
        $('.mian-list').each(function () {
            var value = $(this).find(".mian-list-select input[type='radio']:checked").val();
            if (typeof (value) != 'undefined' && value != '') {
                values.push(value);
            }
        });
        var key_cookie = {};
        key_cookie['你是否有离岸银行账户(包含港澳台地区)?'] = values[0]||'';
        key_cookie['你每年出境旅游或者公差出游的次数是?'] = values[1]||'';
        key_cookie['你是否有兴趣做海外资产配置?'] = values[2]||'';
        var jsonStr = JSON.stringify(key_cookie);
        console.log(jsonStr);
        $.cookie('key_cookie', jsonStr);
        if (
            (document.getElementById('input1').checked || document.getElementById('input2').checked) &&
            (document.getElementById('input3').checked || document.getElementById('input4').checked || document.getElementById('input5').checked || document.getElementById('input6').checked)
            && (document.getElementById('input7').checked || document.getElementById('input8').checked || document.getElementById('input9').checked)
        ) {
            // alert("全都选了");
            window.location = "http://localhost:63342/glacier_static/src/main/webapp/WEB-INF/template/activity/mb_02.html";
        } else {
            alert("您尚有未选择项");
        }
    });

});