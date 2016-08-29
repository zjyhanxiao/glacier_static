// detail page scrolling fix effect

function addListenerMulti(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
    }
}
var rightColumn = $('#rightPanel'),
    originalRightColumnTop = rightColumn.offset().top;

addListenerMulti(window, 'resize scroll', function(){
    if ($(window).width() >= 768) {
        var originalFooterTop = $('#footer').offset().top, // footer original top position
            fixWidthPercentage = ((rightColumn.width()) / ($(window).width()) * 100).toFixed(2) + "%",
            stickyNavbarHeight = $('.navbar').height();
            currentScrollTop = $(window).scrollTop() + stickyNavbarHeight,
            distanceToTop = (originalFooterTop - currentScrollTop) + stickyNavbarHeight - rightColumn.height(); // distance between right column top and browser top when right column hit bottom
        if (currentScrollTop >= originalRightColumnTop) {
            rightColumn.css({
                position: 'fixed',
                top: stickyNavbarHeight,
                width: fixWidthPercentage
            });
        } else {
            rightColumn.css({
                position: 'static',
                width: '100%'
            });
        }
        if ((originalFooterTop - currentScrollTop) < rightColumn.height()) {
            rightColumn.css({
                position: 'fixed',
                width: fixWidthPercentage,
                top: distanceToTop
            });
        }
    }
});