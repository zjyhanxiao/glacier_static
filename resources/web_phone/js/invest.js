$(document).ready(function() {
    init_tab("invest");
    var markup = $("#template").html();
    $.template( "prodTemplate", markup);
    var detail_url = {}

    get_investor_profile(main);

    function main(result) {
        var investor_type = result.data.investor_type;
        show(investor_type);
    }

    function show(investor_type) {
        var investor_type_tmp = investor_type;
        if (investor_type_tmp == -1) investor_type_tmp = 1;
        $.ajax({
            url: API_FUNDS,
            dataType: 'json',
            data: {id: -1, type: investor_type_tmp},
            success: function(data, status) {
                for (var i=0; i<data.funds.length; i++) {
                    data.funds[i].thumbnail_0 = data.funds[i].thumbnail[0];
                    data.funds[i].thumbnail_1 = data.funds[i].thumbnail[1];
                    data.funds[i].thumbnail_2 = data.funds[i].thumbnail[2];
                }
                $.tmpl( "prodTemplate", data.funds).appendTo( "#prod-div" );
                for (var i=0; i<data.funds.length; i++) {
                    var id = data.funds[i].id;
                    detail_url[id] = data.funds[i].detail_url;
                    if (data.funds[i].purchase_type == 1) {
                        $("#"+id).html('立即预约');
                    }
                    $("#"+id).click(function(){
                        if (investor_type == -1) {
                            window.location.href = URL_INVESTOR + '/' + this.id + '/' 
                        + detail_url[this.id] + '#0';
                        } else {
                            window.location.href = URL_PROD + '/' + this.id + '/' 
                        + detail_url[this.id];
                        }
                    });
                }
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }
});
