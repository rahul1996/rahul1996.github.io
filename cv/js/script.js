$(function(){
	'use strict';
	
	var portfolio = $('.portfolio-items'),
		blog = $('.posts-grid');
	
	$('html').removeClass('no-js').addClass('js');
	
	/*=========================================================================
		Skill Bars Initialization
	=========================================================================*/
	$('.skill').each(function(){
		var $this = $(this),
			percent = $this.data('percent') + '%';
		$this.append("<div class='skill-bar' ><div class='percent' style='width:"+percent+"' ></div></div>");
	});
	
	
	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.has-popup').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	$(window).on('load', function(){
		
		$('body').addClass('loaded');
		
		
		var sect = window.location.hash;
		if ( $(sect).length == 1 ){
			$('.section.active').removeClass('active');
			$(sect).addClass('active');
		}
		
		
		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		setTimeout(function(){
			portfolio.shuffle();
			blog.shuffle();
		}, 1000);
		
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName );
		});
		
		
		/*=========================================================================
			Testimonials Slider (Owl Carousel)
		=========================================================================*/
		$('.testimonials-slider').owlCarousel({
			items: 1
		});
		
	});
	
	
	
	$(window).on('resize', function(){
		
		
		/*=========================================================================
			Update the portfolio grid when window is resized
		=========================================================================*/
		setTimeout(function(){
			portfolio.shuffle('update');
			blog.shuffle('update');
		},1000);
		
	});
	
	
	/*=========================================================================
		Menu Functions
	=========================================================================*/
	$('.menu-btn').on('click', function(e){
		e.preventDefault();
		$('body').toggleClass('show-menu');
	});
	
	$('.menu-items > ul > li > a, .section-toggle').on('click', function(e){
		
		var $this = $(this),
			section = $( '#' + $this.data('section') );
		if( section.length != 0 ){
			$('body').removeClass('show-menu');
			$('.section.active').removeClass('active');
			setTimeout(function(){
				section.addClass('active');
			}, 300);
		}
		
		setTimeout(function(){
			portfolio.shuffle();
			blog.shuffle();
		}, 1000);
		
	});
	
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {
		
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			
			e.preventDefault();
			var $this = $(this),
				
				//You can edit alerts here
				alerts = {
				
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					
					
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
					
				};
			
			$.ajax({
			
				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){
					
					if( isJSON(data) ){
						
						data = $.parseJSON(data);
						
						if(data['error'] == false){
							
							$('#contact-form-result').html(alerts.success);
							
							$('#contact-form').trigger('reset');
							
						}else{
							
							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
							
						}
						
						
					}else{
						$('#contact-form-result').html(alerts.error);
					}
					
				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
	
});