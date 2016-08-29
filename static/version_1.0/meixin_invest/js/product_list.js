(function ($) {
    $('.product-list').find('li a').click(function () {
        var value = $(this).attr('data-title'),
            liElm = $('.tab-content > div > ul > li');
        if (value === 'all'){
            liElm.show();
        }else{
            liElm.hide();
            liElm.filter(function () {
                return $(this).attr('data-title') === value;
            }).show();
        }
    });
    var buttonValue = $('.tab-content').find('.btn-info');
    buttonValue.filter(function () {
        return $(this).text() === '销售完成';
    }).css('background-color', '#c00');
    buttonValue.filter(function () {
        return $(this).text() === '即将上线';
    }).css('background-color', '#aaa');
}(jQuery));