$(document).ready(function() {
    var purl = $.url(window.location.href);
    var base_url = purl.attr('path');
    var prod_id = purl.segment(4);
    var detail_url = purl.segment(5);

    function main(result) {
        $($("div [name='step']")[0]).show();
    }

    get_investor_profile(main);

    $(window).bind('hashchange', function() {
        $("div [name='step']").hide();
        var step = window.location.href.substring(window.location.href.indexOf('#'));
        for (var i=0; i<4; i++) {
            if (step == '#'+i) $($("div [name='step']")[i]).show();
        }
    });

    function bind_select(name, number) {
        for (var i=1; i<=number; i++) {
            $("#"+name+"-"+i).click(function(){
                $("div [name='"+$(this).attr('name')+"']").removeClass("selected");
                $(this).addClass("selected");
            });
        }
    }
    function get_select(name, number) {
        for (var i=1; i<=number; i++) {
            if ($("#"+name+"-"+i).hasClass("selected")) {
                return i;
            }
        }
        return 0;
    }
    bind_select('investor', 2);
    bind_select('american', 3);

    function update_investor(type) {
        $.ajax({
            url: API_CLIENT_PROFILE,
            dataType: 'json',
            method: 'post',
            data: {'investor_type': type},
            success: function(data, status) {
            },
            error: function(result, status) {
            },

            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
            }
        });
    }

    $("#btn-investor").click(function(){
        var investor = get_select("investor", 2);
        $("#hint-investor").html("");
        if (investor == 0) {
            $("#hint-investor").html("请选择您的投资人信息");
            return ;
        }
        if (investor == 1) {
            window.location.href = base_url + '#1';
        } else {
            window.location.href = base_url + '#2';
        }
    });
    $("#btn-international").click(function() {
        update_investor(1);
        window.location.href = URL_PROD + '/' + prod_id + '/' + detail_url;
    });
    $("#btn-american").click(function() {
        $("#hint-american").html("");
        var american = get_select("american", 3);
        if (american == 0) {
            $("#hint-american").html("请选择您满足哪类条件");
            return ;
        }
        if (american == 1) {
            update_investor(2);
            window.location.href = URL_PROD + '/' + prod_id + '/' + detail_url;
        } else if (american == 2) {
            update_investor(2);
            window.location.href = URL_PROD + '/' + prod_id + '/' + detail_url;
        } else {
            window.location.href = base_url + '#3';
        }
    });
    $("#btn-american-no").click(function(){
        update_investor(3);
        window.location.href = URL_INVEST;
    });
});
