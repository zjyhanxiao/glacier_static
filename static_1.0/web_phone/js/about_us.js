$(document).ready(function() {
    init_tab("myself");
    get_investor_profile(main);
    function main(result){}
    $("#btn-news").click(function(){
        window.location.href = URL_NEWS;
    });
    $("#btn-support").click(function(){
        window.location.href = URL_SUPPORT;
    });
});
