$(function() {
	onepage();
	utils();
    // animations();
    sliders();
    fullScreenContainer();
    utils();
    sliding();
});

$(window).load(function () {
    windowWidth = $(window).width();
    $(this).alignElementsSameHeight();

    masonry();

});

/* for demo purpose only - can be deleted */

function demo() {
	$('#page').change(function() {
		if ($(this).val() !== '') {
			window.location.href = $(this).val();
		}

		return false;
	});
}

function onepage() {
	$('.main').onepage_scroll({
		sectionContainer: 'section', // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: 'ease', // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
		// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 1000, // AnimationTime let you define how long each section takes to animate
		pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
		updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		beforeMove: function(index) {}, // This option accepts a callback function. The function will be called before the page moves.
		afterMove: function(index) {}, // This option accepts a callback function. The function will be called after the page moves.
		loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		keyboard: true, // You can activate the keyboard controls
		responsiveFallback: 1000, // You can fallback to normal page scroll by defining the width of the browser in which
		// you want the responsive fallback to be triggered. For example, set this to 600 and whenever
		// the browser's width is less than 600, the fallback will kick in.
		direction: 'vertical' // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
	});
}

function utils() {
	/* tooltips */

	$('[data-toggle="tooltip"]').tooltip();

	/* click on the box activates the radio */

	$('#checkout').on('click', '.box.shipping-method, .box.payment-method', function(e) {
		var radio = $(this).find(':radio');
		radio.prop('checked', true);
	});
	/* click on the box activates the link in it */

	$('.box.clickable').on('click', function(e) {
		window.location = $(this)
			.find('a')
			.attr('href');
	});
	/* external links in new window*/

	$('.external').on('click', function(e) {
		e.preventDefault();
		window.open($(this).attr('href'));
	});
	/* animated scrolling */

	$('.scroll-to, .scroll-to-top').click(function(event) {
		var full_url = this.href;
		var parts = full_url.split('#');
		if (parts.length > 1) {
			scrollTo(full_url);
			event.preventDefault();
		}
	});
	function scrollTo(full_url) {
		var parts = full_url.split('#');
		var trgt = parts[1];
		var target_offset = $('#' + trgt).offset();
		var target_top = target_offset.top - 100;
		if (target_top < 0) {
			target_top = 0;
		}

		$('html, body').animate(
			{
				scrollTop: target_top
			},
			1000
		);
	}
}

$.fn.alignElementsSameHeight = function() {
	$('.same-height-row').each(function() {
		var maxHeight = 0;
		var children = $(this).find('.same-height');
		children.height('auto');
		if ($(window).width() > 768) {
			children.each(function() {
				if ($(this).innerHeight() > maxHeight) {
					maxHeight = $(this).innerHeight();
				}
			});
			children.innerHeight(maxHeight);
		}

		maxHeight = 0;
		children = $(this).find('.same-height-always');
		children.height('auto');
		children.each(function() {
			if ($(this).innerHeight() > maxHeight) {
				maxHeight = $(this).innerHeight();
			}
		});
		children.innerHeight(maxHeight);
	});
};

/* this function is here becase chrome renders really blurry texts with transformations used in CSS to center the section content */

$.fn.alignSections = function() {
	if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
		// $('section .content').each(function() {
		// 	var element = $(this);
		// 	var contentHeight = element.height();
		// 	var paddingTop = -contentHeight / 2;

		// 	if ($(window).width() > 1000) {
		// 		element.css('-webkit-transform', 'translate(0,0)');
		// 		element.css('-ms-transform', 'translate(0,0)');
		// 		element.css('transform', 'translate(0,0)');
		// 		element.css('margin-top', paddingTop + 'px');
		// 	} else {
		// 		element.css('margin-top', 0);
		// 	}
		// });
	}
};

$(window).load(function() {
	windowWidth = $(window).width();

	$(this).alignElementsSameHeight();
	$(this).alignSections();
});
$(window).resize(function() {
	newWindowWidth = $(window).width();

	if (windowWidth !== newWindowWidth) {
		setTimeout(function() {
			$(this).alignElementsSameHeight();
			$(this).alignSections();
		}, 100);
		windowWidth = newWindowWidth;
	}
});

// COPY FROM OTHER THEME

/* =========================================
     *  animations
     *  =======================================*/

function animations() {
	if (Modernizr.csstransitions) {
		delayTime = 0;
		$('[data-animate]').css({ opacity: '0' });
		$('[data-animate]').waypoint(
			function(direction) {
				delayTime += 150;
				$(this)
					.delay(delayTime)
					.queue(function(next) {
						$(this).toggleClass('animated');
						$(this).toggleClass($(this).data('animate'));
						delayTime = 0;
						next();
						//$(this).removeClass('animated');
						//$(this).toggleClass($(this).data('animate'));
					});
			},
			{
				offset: '95%',
				triggerOnce: true
			}
		);
		$('[data-animate-hover]').hover(
			function() {
				$(this).css({ opacity: 1 });
				$(this).addClass('animated');
				$(this).removeClass($(this).data('animate'));
				$(this).addClass($(this).data('animate-hover'));
			},
			function() {
				$(this).removeClass('animated');
				$(this).removeClass($(this).data('animate-hover'));
			}
		);
	}
}

/* =========================================
     * sliding 
     *  =======================================*/

function sliding() {
	$('.scrollTo, #navigation a').click(function(event) {
		event.preventDefault();
		var full_url = this.href;
		var parts = full_url.split('#');
		var trgt = parts[1];

		$('body').scrollTo($('#' + trgt), 800, { offset: -80 });
	});
}

/* =========================================
     * sliders 
     *  =======================================*/

function sliders() {
	if ($('.owl-carousel').length) {
		$('.customers').owlCarousel({
			items: 6,
			itemsDesktopSmall: [990, 4],
			itemsTablet: [768, 2],
			itemsMobile: [480, 1]
		});
		$('.testimonials').owlCarousel({
			items: 4,
			itemsDesktopSmall: [1170, 3],
			itemsTablet: [970, 2],
			itemsMobile: [750, 1]
		});
	}
}

/* =========================================
     * counters 
     *  =======================================*/

function counters() {
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
}

/* =========================================
     * parallax 
     *  =======================================*/

function parallax() {
	$('.text-parallax').parallax('50%', 0.1);
}

/* =========================================
     *  masonry 
     *  =======================================*/

function masonry() {
	$('#references-masonry').css({ visibility: 'visible' });

	$('#references-masonry').masonry({
		itemSelector: '.reference-item:not(.hidden)',
		isFitWidth: true,
		isResizable: true,
		isAnimated: true,
		animationOptions: {
			duration: 200,
			easing: 'linear',
			queue: true
		},
		gutter: 30
	});
	scrollSpyRefresh();
	waypointsRefresh();
}

/* =========================================
     * filter 
     *  =======================================*/

$('#filter a').click(function(e) {
	e.preventDefault();

	$('#filter li').removeClass('active');
	$(this)
		.parent('li')
		.addClass('active');

	var categoryToFilter = $(this).attr('data-filter');

	$('.reference-item').each(function() {
		if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
			$(this).removeClass('hidden');
		} else {
			$(this).addClass('hidden');
		}
	});

	if ($('#detail').hasClass('open')) {
		closeReference();
	} else {
		$('#references-masonry')
			.masonry('reloadItems')
			.masonry('layout');
	}

	scrollSpyRefresh();
	waypointsRefresh();
});

/* =========================================
     *  open reference 
     *  =======================================*/

$('.reference-item').click(function(e) {
	e.preventDefault();

	var element = $(this);
	var title = element.find('.reference-title').text();
	var description = element.find('.reference-description').html();

	images = element
		.find('.reference-description')
		.data('images')
		.split(',');

	if (images.length > 0) {
		slider = '';
		for (var i = 0; i < images.length; ++i) {
			slider = slider + '<div class="item"><img src=' + images[i] + ' alt="" class="img-responsive"></div>';
		}
	} else {
		slider = '';
	}

	$('#detail-title').text(title);
	$('#detail-content').html(description);
	$('#detail-slider').html(slider);

	openReference();
});

function openReference() {
	$('#detail').addClass('open');
	$('#references-masonry').animate({ opacity: 0 }, 300);
	$('#detail').animate({ opacity: 1 }, 300);

	setTimeout(function() {
		$('#detail').slideDown();
		$('#references-masonry').slideUp();

		if ($('#detail-slider').html() !== '') {
			$('#detail-slider').owlCarousel({
				slideSpeed: 300,
				paginationSpeed: 400,
				autoPlay: true,
				stopOnHover: true,
				singleItem: true,
				afterInit: '',
				autoWidth: true
			});
		}
	}, 300);
	
	
	
	moveUp();

	setTimeout(function() {
		$('body').scrollTo('50%', 1000, { offset: -80 });
	}, 500);
}

function closeReference() {
	$('#detail').removeClass('open');
	$('#detail').animate({ opacity: 0 }, 300);

	setTimeout(function() {
		$('#detail').slideUp();
		$('#detail-slider')
			.data('owlCarousel')
			.destroy();
		$('#references-masonry')
			.slideDown()
			.animate({ opacity: 1 }, 300)
			.masonry('reloadItems')
			.masonry();
	}, 300);

	moveDown();

	setTimeout(function() {
		$('#references-masonry')
			.masonry('reloadItems')
			.masonry();
	}, 800);
}

function moveUp() {
	$('section#page4 .content').each(function() {
		var element = $(this);
	
		element.css('margin-top', '-75px');
		// element.css('transform', 'translate(0, -60%)');
	});
}

function moveDown() {
	$('section .content').each(function() {
		var element = $(this);
	
		element.css('margin-top', '');
		// element.css('transform', 'translate(0, -60%)');
	});
}


$('#detail .close').click(function() {
	closeReference(true);
});

/* =========================================
     * full screen intro 
     *  =======================================*/

function fullScreenContainer() {
	var screenWidth = $(window).width() + 'px';
	var screenHeight = '';
	if ($(window).height() > 500) {
		screenHeight = $(window).height() + 'px';
	} else {
		screenHeight = '500px';
	}

	$('#intro, #intro .item').css({
		width: screenWidth,
		height: screenHeight
	});
}

/* =========================================
     *  map 
     *  =======================================*/

function map() {
	var styles = [
		{ featureType: 'landscape', stylers: [{ saturation: -100 }, { lightness: 65 }, { visibility: 'on' }] },
		{ featureType: 'poi', stylers: [{ saturation: -100 }, { lightness: 51 }, { visibility: 'simplified' }] },
		{ featureType: 'road.highway', stylers: [{ saturation: -100 }, { visibility: 'simplified' }] },
		{ featureType: 'road.arterial', stylers: [{ saturation: -100 }, { lightness: 30 }, { visibility: 'on' }] },
		{ featureType: 'road.local', stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }] },
		{ featureType: 'transit', stylers: [{ saturation: -100 }, { visibility: 'simplified' }] },
		{ featureType: 'administrative.province', stylers: [{ visibility: 'off' }] },
		{
			featureType: 'water',
			elementType: 'labels',
			stylers: [{ visibility: 'on' }, { lightness: -25 }, { saturation: -100 }]
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [{ hue: '#ffff00' }, { lightness: -25 }, { saturation: -97 }]
		}
	];
	map = new GMaps({
		el: '#map',
		lat: -12.043333,
		lng: -77.028333,
		zoomControl: true,
		zoomControlOpt: {
			style: 'SMALL',
			position: 'TOP_LEFT'
		},
		panControl: false,
		streetViewControl: false,
		mapTypeControl: false,
		overviewMapControl: false,
		scrollwheel: false,
		draggable: false,
		styles: styles
	});

	var image = 'img/marker.png';

	map.addMarker({
		lat: -12.043333,
		lng: -77.028333,
		icon: image /* ,
         title: '',
         infoWindow: {
         content: '<p>HTML Content</p>'
         }*/
	});
}

/* =========================================
     *  UTILS
     *  =======================================*/

function utils() {
	/* tooltips */

	$('[data-toggle="tooltip"]').tooltip();

	/* external links in new window*/

	$('.external').on('click', function(e) {
		e.preventDefault();
		window.open($(this).attr('href'));
	});
	/* animated scrolling */
}

$.fn.alignElementsSameHeight = function() {
	$('.same-height-row').each(function() {
		var maxHeight = 0;
		var children = $(this).find('.same-height');
		children.height('auto');
		if ($(window).width() > 768) {
			children.each(function() {
				if ($(this).innerHeight() > maxHeight) {
					maxHeight = $(this).innerHeight();
				}
			});
			children.innerHeight(maxHeight);
		}

		maxHeight = 0;
		children = $(this).find('.same-height-always');
		children.height('auto');
		children.each(function() {
			if ($(this).height() > maxHeight) {
				maxHeight = $(this).innerHeight();
			}
		});
		children.innerHeight(maxHeight);
	});
};

/* refresh scrollspy */
function scrollSpyRefresh() {
	setTimeout(function() {
		$('body').scrollspy('refresh');
	}, 1000);
}

/* refresh waypoints */
function waypointsRefresh() {
	setTimeout(function() {
		$.waypoints('refresh');
	}, 1000);
}

/* ajax contact form */

function contactForm() {
	$('#contact-form').submit(function() {
		var url = 'contact.php'; // the script where you handle the form input.

		$.ajax({
			type: 'POST',
			url: url,
			data: $(this).serialize(), // serializes the form's elements.
			success: function(data) {
				var messageAlert = 'alert-' + data.type;
				var messageText = data.message;
				var alertBox =
					'<div class="alert ' +
					messageAlert +
					' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
					messageText +
					'</div>';
				if (messageAlert && messageText) {
					$('#contact-form')
						.find('.messages')
						.html(alertBox);
				}
			}
		});
		return false; // avoid to execute the actual submit of the form.
	});
}
