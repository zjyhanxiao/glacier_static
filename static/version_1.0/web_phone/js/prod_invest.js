$(document).ready(function() {
    var purl = $.url(window.location.href);
    var base_url = purl.attr('path');
    var prod_id = purl.segment(4);
    var fund_step = '';

    function main(result) {
        var investor_type = result.data.investor_type;
		if (investor_type == 3){
            $($("div [name='step']")[1]).show();
		} else {
            $($("div [name='step']")[0]).show();
		}
        var entity_id = result.data.entity_id;
        if (entity_id.length > 0) {
            fund_step = '#7';
        } else {
            if (investor_type == 1) {
                fund_step = '#0';
            } else {
                fund_step = '#3';
            }
        }
    }

    get_investor_profile(main);

    $("#prod-btn").html('立即投资');
    $("#prod-btn").click(function(){
        window.location.href = URL_PAY + '/' + prod_id + fund_step;
    });
    $("#btn-american-no").click(function(){
        window.location.href = URL_INVEST;
    });
});
