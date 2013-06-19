(function($){
	$.fn.mouseoverBox = function (options) {
		var defaults = {
		    btn: '.follow_btn',
		    box: '#share-box',
		    hideTime: 1000,
		    event: 'mouseover',
		    hoverTime: 300,
		};
		var opts = $.extend(defaults, options);

		return this.each(function(){
			var obj = $(this),
			btn = $(opts.btn,obj),
			box = $(opts.box,obj);

			var control = {
				timer: 0,
				hover: false,
				init: function(){
					this.handler();
				},
				handler: function(){

					btn.on(opts.event, function(){
						control.hover = true;
						control.showTimer(true);
					});

					box.on(opts.event, function(){
					  	control.showBox();
					});

					btn.add(box).mouseleave(function(){
						control.hover = false;
						box.removeClass('active');
						control.timer = setTimeout(control.hideBox,opts.hideTime);
					});


				},
				showTimer: function(send){
					if (typeof send != 'undefined') {
						if (control.hover) {
							control.timer = setTimeout(control.showTimer,opts.hoverTime);
						};
					}else{
						if (control.hover) {
							control.showBox();
						};
					}
				},
				hideBox: function(){
					box.filter(':not(.active)').fadeTo(opts.hideTime, 0,function(){
						$(this).hide();
					});
				},
				showBox: function(){
					box.addClass('active');
					box.stop().fadeTo('slow',1);
					clearTimeout(control.timer);
				}
			};


			control.init();

		});
	}
})(jQuery);