(function($){
	$.fn.loaderImages = function(options){
		var defaults = {
			efect: 'fadeIn',
			url_loader: 'ajax-loader.gif',
		};
		var opts = $.extend(defaults, options);
		return this.each(function(){
			var obj = $(this),
				efect = opts.efect,
				loader = opts.url_loader;

			var images = {
				start: function(){
					var img_array = [];
					img_array = obj.find('img');
					for (var i = 0; i < img_array.length; i++) {
						$(img_array[i]).hide()
								.attr('id','image_loader_'+i);
						$(img_array[i]).parent()
								.addClass('parent_image_loader')
								.append($("<img src='"+loader+"' class='loader_waiting'></img>"));
					};
					$(window).load(function () {
					  setTimeout(function() {
						images.list_images(img_array);
						}, 1200);
					});
				},
				list_images: function(array){
					//console.dir(array);
					for (var i = 0; i < array.length; i++) {
						var id_element = $(array[i]).attr('id');
						$("img#"+id_element)
							.parent('.parent_image_loader')
							.find('img.loader_waiting')
							.delay(500 * i)
							.remove();
						$("img#"+id_element).delay(500 * i).fadeIn();
					};
				}
			};
			images.start();
		});
	}
})(jQuery);