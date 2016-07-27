$(document).ready(function() {
    init_tab("myself");
    
    get_investor_profile(main);
    function main(result) {
        $("#realname").html(result.data.realname);
        $("#id-code").html(result.data.id_code);
        $("#type").html(funder_type(result.data.investor_type));
        $("#login-phone").html(result.data.login_phone);
        $("#contact-phone").html(result.data.contact_phone);
        $("#mail").html(result.data.mail);
    }
    
    $("#btn-logout").click(function(){
        $.cookie('access_token', 'nouser', {expires:7, path: '/'});
        window.location.href = URL_LOGIN_PHONE;
    });

    //$("#change-login-phone").click(function(){
    //    window.location.href = URL_CHANGE_LOGIN_PHONE;
    //});
    $("#change-contact-phone").click(function(){
        window.location.href = URL_CHANGE_CONTACT_PHONE;
    });
    $("#change-mail").click(function(){
        window.location.href = URL_CHANGE_MAIL;
    });
    $("#change-password").click(function(){
        window.location.href = URL_CHANGE_PASSWORD;
    });
});
