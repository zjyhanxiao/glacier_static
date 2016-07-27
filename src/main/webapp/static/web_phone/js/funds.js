$(document).ready(function() {
    init_tab("myself");
    get_investor_profile(main);
        
    function main(result) {
        show();
    }
    
    function show() {
        var markup = $("#template").html();
        $.template( "fundTemplate", markup);
        $.ajax({
            url: API_ORDERS,
            dataType: 'json',
            data: {id: -1, type: 1},
            success: function(data, status) {
                for (var i=0; i<data.order_list.length; i++) {
                    data.order_list[i].raw = number_format(''+data.order_list[i].raw);
                    data.order_list[i].total = number_format(''+data.order_list[i].total);
                }
                $.tmpl( "fundTemplate", data.order_list).appendTo( "#fund-div" );
            },
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token')); 
            } 
        });
    }
});
