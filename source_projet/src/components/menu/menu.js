var $ = require('jquery');

module.exports = {
	init : function(){
		$('.js-menu-Link').on('click',function(e){
			e.stopPropagation();
			e.preventDefault();
			$(this).closest('.menu-Item')
				.addClass('menu-Item--open');
		});
	}
};