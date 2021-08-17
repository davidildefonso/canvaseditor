$(document).ready(function(){
	var altura = $('.menu_fijo').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura ){
			$('.menu_fijo').addClass('mf');
		} else {
			$('.menu_fijo').removeClass('mf');
		}
	});

});