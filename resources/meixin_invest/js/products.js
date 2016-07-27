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