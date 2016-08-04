$(document).ready(function(){
	$('#popup').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var title = button.data('titlename');
		var modal = $(this);
		modal.find('.modal-title span').empty();
		modal.find('.modal-title').prepend('<span>'+title+'</span>');
	});

	$('.modal-body form').submit(function() {
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(response) {
            	$('button.btn').attr('disabled', '');
                $('.modal-body').hide();
                $('.modal-body-success').fadeIn();
            }
        });
        return false;
    });
});
(function($){
    $.getUrlParam = function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
})(jQuery);