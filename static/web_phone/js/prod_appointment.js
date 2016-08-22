$(document).ready(function() {
    var purl = $.url(window.location.href);
    var base_url = purl.attr('path');
    var prod_id = purl.segment(4);

    function main(result) {
        var investor_type = result.data.investor_type;
		if (investor_type == 3){
				$($("div [name='step']")[1]).show();
		} else {
				$($("div [name='step']")[0]).show();
		}
        var entity_id = result.data.entity_id;
    }

    get_investor_profile(main);

    $("#prod-btn").html('立即预约');
    $("#prod-btn").click(function(){
        window.location.href = URL_APPOINTMENT + '/' + prod_id + '#0';
    });
    $("#btn-american-no").click(function(){
        window.location.href = URL_INVEST;
    });
});
