$(document).ready(function() {
    init_tab("myself");
    get_investor_profile(main);
    function main(result){}
    function bind_show(div, text, icon) {
        div.click(function(){
            var src = icon.attr('src')
            if (text.is(':hidden')) {
                text.slideDown();
                icon.attr('src', src.replace('closed', 'open'));
            } else {
                text.slideUp();
                icon.attr('src', src.replace('open', 'closed'));
            }
        });
    }
    function bind_select(name, number) {
        for (var i=1; i<=number; i++) {
            $("#"+name+"-"+i).click(function(){
								for (var j=1; j<=number; j++){
										$("#opt-"+j).removeClass("img-div-gray");
								}
								$("#"+this.id).addClass("img-div-gray");
                $("div [name='box-" + name + "']").hide();
                $('#box-' + this.id + '').show();
            });
        }
    }

    bind_select('opt', 4);
    bind_show($("#opt-div-1-a"), $("#opt-text-1-a"), $("#opt-icon-1-a"));
    bind_show($("#opt-div-1-b"), $("#opt-text-1-b"), $("#opt-icon-1-b"));
    bind_show($("#opt-div-1-c"), $("#opt-text-1-c"), $("#opt-icon-1-c"));
    bind_show($("#opt-div-2-a"), $("#opt-text-2-a"), $("#opt-icon-2-a"));
    bind_show($("#opt-div-2-b"), $("#opt-text-2-b"), $("#opt-icon-2-b"));
    bind_show($("#opt-div-2-c"), $("#opt-text-2-c"), $("#opt-icon-2-c"));
    bind_show($("#opt-div-2-d"), $("#opt-text-2-d"), $("#opt-icon-2-d"));
    bind_show($("#opt-div-2-e"), $("#opt-text-2-e"), $("#opt-icon-2-e"));
    bind_show($("#opt-div-3-a"), $("#opt-text-3-a"), $("#opt-icon-3-a"));
    bind_show($("#opt-div-3-b"), $("#opt-text-3-b"), $("#opt-icon-3-b"));
    bind_show($("#opt-div-3-c"), $("#opt-text-3-c"), $("#opt-icon-3-c"));
    bind_show($("#opt-div-3-d"), $("#opt-text-3-d"), $("#opt-icon-3-d"));
    bind_show($("#opt-div-3-e"), $("#opt-text-3-e"), $("#opt-icon-3-e"));
    bind_show($("#opt-div-3-f"), $("#opt-text-3-f"), $("#opt-icon-3-f"));
    bind_show($("#opt-div-4-a"), $("#opt-text-4-a"), $("#opt-icon-4-a"));
    bind_show($("#opt-div-4-b"), $("#opt-text-4-b"), $("#opt-icon-4-b"));
    bind_show($("#opt-div-4-c"), $("#opt-text-4-c"), $("#opt-icon-4-c"));
    bind_show($("#opt-div-4-d"), $("#opt-text-4-d"), $("#opt-icon-4-d"));
    bind_show($("#opt-div-4-e"), $("#opt-text-4-e"), $("#opt-icon-4-e"));
    bind_show($("#opt-div-4-f"), $("#opt-text-4-f"), $("#opt-icon-4-f"));
    bind_show($("#opt-div-4-g"), $("#opt-text-4-g"), $("#opt-icon-4-g"));
    bind_show($("#opt-div-4-h"), $("#opt-text-4-h"), $("#opt-icon-4-h"));
});
