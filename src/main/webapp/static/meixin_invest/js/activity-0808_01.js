$(function(){
    // cookie数据
    $('#sub').click(function () {
        var keys=[], values=[];
        $('.mian-list').each(function () {
            var value=$(this).find(".mian-list-select input[type='radio']:checked").val();
            if(typeof (value)!='undefined'&&value!=''){
                var key=$(this).find('.mian-list-style p').html();
            }
            if(typeof (value)!='undefined'&&value!=''){
                values.push(value);
            }else{

            }
            if(typeof (key)!='undefined'&&key!=''){
                keys.push(key);
            }
        });
        $.cookie('key_cookie',keys);
        $.cookie('val_cookie',values);
        if(
            (document.getElementById('input1').checked ||document.getElementById('input2').checked)&&
            (document.getElementById('input3').checked||document.getElementById('input4').checked|| document.getElementById('input5').checked|| document.getElementById('input6').checked)
            &&(document.getElementById('input7').checked|| document.getElementById('input8').checked|| document.getElementById('input9').checked)
        ){
            // alert("全都选了");
            window.location = "http://localhost:63342/glacier_static/src/main/webapp/WEB-INF/template/activity/mb_02.html";
        }else{
            alert("您尚有未选择项");
        }
    });

});