function init_tab(s) {
    var src = $("#img-"+s).attr('src')
    $("#img-"+s).attr('src', src.replace('.png', '-select.png'));
    $("#text-"+s).addClass("section-text-select");
    $("#section-adv").click(function(){
        window.location.href = URL_ADV;
    });
    $("#section-news").click(function(){
        window.location.href = URL_NEWS;
    });
    $("#section-invest").click(function(){
        window.location.href = URL_INVEST;
    });
    $("#section-myself").click(function(){
        window.location.href = URL_MYSELF;
    });
}
