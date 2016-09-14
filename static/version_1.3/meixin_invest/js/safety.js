function safetyJs(){
    // 项目保障area高度和宽度比例保持一致
    var w = $('.safety_bullets').find('h2').width();
    var container_w = $('.container').width();
    var window_w = $(window).width();
    var left = (window_w - container_w) / 2
    $('.safety_bullets').find('h2').css({'height':w+'px'});
    if($(window).width() > 768){
        $('.safety_bg_blue').css({'left':-left+'px', 'paddingLeft':left+'px', 'paddingRight':left+'px'});
    }
}
safetyJs();
$( window ).resize(function() {
    safetyJs();
});