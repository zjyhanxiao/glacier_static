$(document).ready(function() {
    init_tab("adv");
    $("#slides").slidesjs({
        navigation: {active:false},
				pagination: {active:false},
				play: {
					active: false,
					effect: "slide",
					interval: 4000,
					auto: true,
					swap: true,
					pauseOnHover: false,
					restartDelay: 2000
				}
		});
		$("#btn-invest").click(function(){
			window.location.href = URL_INVEST;
		});
		$("#slides").click(function(){
			window.location.href = URL_INVEST;
		});
});
