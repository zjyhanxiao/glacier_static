$('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    center:true,
    URLhashListener:true,
    autoplayHoverPause:true,
    startPosition: 'URLHash',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

var totalNumber = $(".newhelp-five-steps").find(".nav_bullets").size();
$('.nav_bullets').on('click', function(){
    var currentPosition = $(this).index();
    for(i = 0; i < totalNumber; i++){
        if(i <= currentPosition)
            $('.nav_bullets').eq(i).find('span').css('background-color','#029de0');
        else
            $('.nav_bullets').eq(i).find('span').css('background-color','#c8d6e0');
    }
});