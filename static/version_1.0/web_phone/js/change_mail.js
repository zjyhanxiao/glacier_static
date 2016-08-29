$(document).ready(function() {
    init_tab("myself");
    get_investor_profile(main);
    function main(result){}
    
    function check() {
        $("#change-hint").text("");
        $("#change-btn").attr("disabled", false);
        if (!isMail($("#change-input").val())) {
            $("#change-hint").text("邮箱格式不正确");
            $("#change-btn").attr("disabled", true);
        }
    }
    $("#change-input").change(function(){check();});

    $("#change-btn").click(function(){
        if ($("#change-input").val().length == 0) {
            $("#change-hint").text("请输入邮箱");
            return ;
        }
        
        $.ajax({
            url: API_PROFILE,
            dataType: 'json',
            method: 'post', 
            data: {'mail': $("#change-input").val()},
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
