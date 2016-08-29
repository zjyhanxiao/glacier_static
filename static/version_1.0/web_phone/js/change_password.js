$(document).ready(function() {
    init_tab("myself");
    
    get_investor_profile(main);
    function main(result){}
    
    function check() {
        $("#change-hint").text("");
        $("#change-btn").attr("disabled", false);
        if (!isPassword($("#change-input").val())) {
            $("#change-hint").text("密码必须为6~20个字符，不能全数字");
            $("#change-btn").attr("disabled", true);
            return ;
        }
        if ($("#change-input").val() != $("#change-input-check").val()) {
            $("#change-hint").text("两次输入的密码不一致");
            $("#change-btn").attr("disabled", true);
        }
    }
    $("#change-input").change(function(){check();});
    $("#change-input-check").change(function(){check();});

    $("#change-btn").click(function(){
        if ($("#change-input").val().length == 0) {
            $("#change-hint").text("请输入密码");
            return ;
        }

        $.ajax({
            url: API_PROFILE,
            dataType: 'json',
            method: 'post', 
            data: {'password': $("#change-input").val()},
            success: function(data, status) {
                if (data.status == 200) {
                    window.location.href = URL_SETTING;
                } else {
                    $("#change-hint").html("修改失败");
                }
            },
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token')); 
            } 
        });
    });
});
