$(function () {
    var sections = $('.step-section'),
        bullets = $('.fa-steps-bullets');

    function navigateTo(index) {
        sections.removeClass('current').eq(index).addClass('current');
        bullets.find('p').css("background-color", "#c8d6e0").eq(index).css("background-color", "#029DE0");
        $('.step-navigation .previous').toggle(index > 0);
        var last = index >= sections.length - 1;
        $('.step-navigation .next').toggle(!last);
        $('.step-navigation [type=fasubmit]').toggle(last);
    }

 /*   function curIndex() {
        return sections.index(sections.filter('.current'));
    }

    $('.step-navigation .previous').click(function() {
        navigateTo(curIndex() - 1);
    });

    $('.step-navigation .next').click(function() {
        if ($('.fa-steps').parsley().validate({group: 'block-' + curIndex()}))
            navigateTo(curIndex() + 1);
    });*/

    sections.each(function(index, section) {
        $(section).find(':input').attr('data-parsley-group', 'block-' + index);
    });

    navigateTo(0);

    $('.fa-upload-pic').find('a').click(function(){
        $(this).siblings('input').trigger('click');
    });
    $('.fa-upload-pic').find('input[type=file]').change(function (event) {
        var val = $(this).val().toLowerCase();
        var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif|bmp)$");
        if(!(regex.test(val))) {
            $(this).val('');
            alert('图片格式不正确，支持图片格式(.jpg|.jpeg|.png|.gif|.bmp)');
        }else{
            $(this).siblings('img').attr('src',URL.createObjectURL(event.target.files[0]));
        }
    });

    $("#ach-online, #bank-tt, #check, .investor-info-usa, #accredited-investor input, .payment-option input, #invest-amount").change(function(){
        if ($("#investor-type-yes").is(":checked")){
            $("button.next").removeAttr("disabled", "");
            $(".accredited-investor-box").show();
            $(".accredited-investor-box input").attr("required", "");
        }else if($("#investor-type-no").is(":checked")){
            $(".accredited-investor-box").hide();
            $(".accredited-investor-box input").removeAttr("required");
            $("button.next").attr("disabled", "");
        }

        if ($("#ach-online").is(":checked")){
            $('.bank-tt-box, .check-box').hide();
            $('.ach-online-box').show();
            $('.ach-online-box input').attr("required", "");
            $('.bank-tt-box input, .check-box input').removeAttr("required");
            $('#agreement-02, #agreement-03').attr('checked', false);
        }else if ($("#bank-tt").is(":checked")){
            $('.ach-online-box').hide();
            $('.check-box').hide();
            $('.bank-tt-box').show();
            $('.bank-tt-box input').attr("required", "");
            $('.ach-online-box input, .check-box input').removeAttr("required");
            $('#agreement-01, #achAgreement, #agreement-03').attr('checked', false);
        }else if ($("#check").is(":checked")){
            $('.bank-tt-box').hide();
            $('.ach-online-box').hide();
            $('.check-box').show();
            $('.check-box input').attr("required", "");
            $('.ach-online-box input, .bank-tt-box input').removeAttr("required");
            $('#agreement-01, #agreement-02').attr('checked', false);
        }

        $('.investor-info-usa:checked').siblings('.investor-info-usa-box').show();
        $('.investor-info-usa:not(:checked)').siblings('.investor-info-usa-box').hide();
    });
    var dateFormat = "yyyy-mm-dd";
    var match = new RegExp(dateFormat.replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*").replace(/m|d|y/g, "\\d"));
    var replace = "$1/$2/$3$4".replace(/\//g, dateFormat.match(/\W/));

    function doFormat(target) {
        target.value = target.value.replace(/(^|\W)(?=\d\W)/g, "$10").replace(match, replace).replace(/(\W)+/g, "$1");
    }
    $("input[name='birthdate']:first").keyup(function(e) {
        if(!e.ctrlKey && !e.metaKey && (e.keyCode == 32 || e.keyCode > 46))
            doFormat(e.target)
    });

    $('#ssn').keyup(function() {
        var val = this.value.replace(/\D/g, '');
        var newVal = '';
        if (val.length > 4) {
            this.value = val;
        }
        if ((val.length > 3) && (val.length < 6)) {
            newVal += val.substr(0, 3) + '-';
            val = val.substr(3);
        }
        if (val.length > 5) {
            newVal += val.substr(0, 3) + '-';
            newVal += val.substr(3, 2) + '-';
            val = val.substr(5);
        }
        newVal += val;
        this.value = newVal;
    });
});