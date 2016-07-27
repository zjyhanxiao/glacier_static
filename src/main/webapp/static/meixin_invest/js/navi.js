$(document).ready(function() {
     setNavigation();

});

function setNavigation() {
     var url = window.location.pathname;
     $("#wrapper.customer nav .navbar .navbar-collapse .navbar-nav>li>a").each(function() {
         var href = $(this).attr('href');
         if (url == href) {
             $(this).css('border-bottom','3px solid #4bb7e8');
         }              
     });
}