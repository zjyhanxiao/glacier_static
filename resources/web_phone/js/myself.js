$(document).ready(function() {
    init_tab("myself");
    
    get_investor_profile(main);

    function main(result) {
        $("#name-text").html(result.data.mail);
        $("#name-label").html(funder_type(result.data.investor_type));
        show_order();
    }

    function show_order() {
        $.ajax({
            url: API_ORDERS,
            dataType: 'json',
            data: {'type': 0, 'id': -1},
            success: function(data, status) {
                $("#total").html('$ ' + number_format(''+data.data.total));
                $("#revenue").html('$ ' + number_format(''+data.data.revenue));
            },
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token')); 
            } 
        });
    }
    $("#funds").click(function(){
        window.location.href = URL_FUNDS;
    });
    $("#contact").click(function(){
        window.location.href = URL_CONTACT;
    });
    $("#about-us").click(function(){
        window.location.href = URL_ABOUT_US;
    });
    $("#suggest").click(function(){
        window.location.href = URL_SUGGEST;
    });
    $("#support").click(function(){
        window.location.href = URL_SUPPORT;
    });
    $("#invite").click(function(){
        window.location.href = URL_INVITE;
    });
    $("#setting").click(function(){
        window.location.href = URL_SETTING;
    });
});
