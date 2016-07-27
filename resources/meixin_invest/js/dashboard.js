$(document).ready(function(){
    var name = $('#real_name').val(),
        idcode = $('#id_card_code').val(),
        birthdate = $('#date_of_birth').val();

	$('.dashboard_setup .dashboard_upload_image').hover(function(){
		$(this).find('.dashboard_mask').toggle();
	});

	$('.dashboard_mask').find('a').click(function(){
    	$(this).siblings('input').trigger('click');
	});

	$('.dashboard_mask').find('input[type=file]').change(function (event) {
    	$(this).parent().siblings('img').attr('src',URL.createObjectURL(event.target.files[0]));
	});

	var times = 0;

	function resetField(){
		resetTimes();
		var cancel = $('.edit-icon-cancel');
		cancel.parent().css({"background-color":"#fff", "z-index":"0", "position":"initial"});
        $('.edit-icon-cancel').parent().find("input").css("width","100%");
        cancel.siblings(".edit-icon-approved").remove();
		cancel.remove();
		$('div.editing-mask').remove();
	}

    function resetValueBack(input, field){
        if(field == 'real_name'){
            input.val(name);
        }else if(field == 'id_card_code'){
            input.val(idcode);
        }else if(field == 'date_of_birth'){
            input.val(birthdate);
        }
    }

    function saveAndSet(field, value){
        if(field == 'real_name'){
            name = value;
        }else if(field == 'id_card_code'){
            idcode = value;
        }else if(field == 'date_of_birth'){
            birthdate = value;
        }
    }

	function changeFieldStyle(input){
		input.removeAttr("readonly","");
		input.parent().css({"background-color":"#f8f8f8", "z-index":"999", "position":"relative"});
		input.css("width","92%");
	}

	function appendButtons(input, times){
		if(times == 1){
			input.parent().append('<a class="edit-icon-common edit-icon-approved"></a>');
			input.parent().append('<a class="edit-icon-common edit-icon-cancel"></a>');
			$("body").append('<div class="editing-mask"></div>');
		}
	}

	function resetTimes(){
		times = 0;
	}

    function inputvalidate(field, value){
        var status = false;
        var name_rex = new RegExp("^[A-Za-z\s]{1,}[\. ]{0,1}[A-Za-z\s]{0,}$"),
            code_rex = new RegExp("[A-Za-z0-9]"),
            birth_rex = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
        if(field == 'real_name'){
            status = name_rex.test(value);
        }else if(field == 'id_card_code'){
            status = code_rex.test(value);
        }else if(field == 'date_of_birth'){
            status = birth_rex.test(value);
        }
        return status;
    }

	$('.dashboard_info input').on("click", function(){
		var thisInput = $(this);
		times++;
		changeFieldStyle(thisInput);
		appendButtons(thisInput, times);
		$('.edit-icon-cancel').bind("click", function(){
            $('#popup-error-info').remove();
			resetField();
            resetValueBack(thisInput, thisInput.attr('id'));
  		});
        $('.edit-icon-approved').bind("click", function(){
            if (inputvalidate(thisInput.attr('id'), thisInput.val()) == true){
                $('#popup-error-info').remove();
                resetField();
                inputValueChange(thisInput.attr('id'), thisInput.val());
                saveAndSet(thisInput.attr('id'), thisInput.val());
            }else{
                $(this).parent().parent().after('<div id="popup-error-info">输入的格式有误！</div>');
            }
        });
    });

    var dateFormat = "yyyy-mm-dd";
    var match = new RegExp(dateFormat.replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*").replace(/m|d|y/g, "\\d"));
    var replace = "$1/$2/$3$4".replace(/\//g, dateFormat.match(/\W/));

    function doFormat(target) {
        target.value = target.value.replace(/(^|\W)(?=\d\W)/g, "$10").replace(match, replace).replace(/(\W)+/g, "$1"); 
    }
    $("#date_of_birth").keyup(function(e) {
       if(!e.ctrlKey && !e.metaKey && (e.keyCode == 32 || e.keyCode > 46))
          doFormat(e.target)
    });


    //更改密码校验一致性

    $('#password-update-submit').submit(function (e) {
        var pass=$('#id_password').val();
        var passconfirm=$('#id_password_confirm').val();
        if(pass!=passconfirm){
            e.preventDefault();
            $('.error_mes').html('您两次输入的密码不一致');
        }
    });
});
