'use strict';

(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
        /*------------------
            Car filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
		
        if ($('.car-filter').length > 0) {
            var containerEl = document.querySelector('.car-filter');
            var mixer = mixitup(containerEl);
        }
		
		getCars(true);			
    });

	function saveQuery() {
        alert('saveQuery called');
        let description = `I am looking For ${document.getElementById('brand').value} ${document.getElementById('car_name').value} `
            userData = {
				name: document.getElementById('name').value,
				mobile: document.getElementById('mobile').value,
				city: document.getElementById('city').value || 'Delhi',
				title: "From Website Home",
				description: description ,
				ownerId: "5f6f0e8c1f46bf3f11660245",
            };
            
			var saveData = $.ajax({
				type: 'POST',
                url:  'http://13.127.184.151:3000/api/v1/customer/saveQuery',
                data: userData,
                success: function(resultData) { 
					document.getElementById('name').value = '';
					document.getElementById('mobile').value = '';
                    document.getElementById('city').value = '';
                    document.getElementById('brand').value = '';
                    document.getElementById('car_name').value = '';
						$.toast({ 
							text : "Thanks for Showing Interest , We will contact you shortly", 
                            bgColor : 'green',              // Background color for toast
                            textColor : '#eee',            // text color
                            allowToastClose : false,       // Show the close button or not
                            hideAfter : 7000,              // `false` to make it sticky or time in miliseconds to hide after
                            stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                            textAlign : 'left',            // Alignment of text i.e. left, right, center
                            position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                        })
                              
                }
            });
		
    }

	function getCars(recomended) {
		let filter=recomended?"rec":"";
		
		let uri = 'http://13.127.184.151:3000/api/v1/admin/all/5f6f0e8c1f46bf3f11660245/ProductsList/20/0?filter='+filter;
		let h = new Headers();
		h.append('__authorization_x_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmRpcHVuamFiZGkuZ3piQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicHVuamFiaWhhbmRpIiwiaWF0IjoxNjA1NTUxMzYwLCJleHAiOjE2MTMzMjczNjB9.ZSZower_BqliN0D7s7hgDrLvIfYHRNrdNSz24IQwM6k');

		let req = new Request(uri, {
			method:'GET',
			headers:h,
			mode:'cors'
		});

		fetch(req).then( (response)=> {
			if(response.ok){
				return response.json();
			} else {
				throw new Error("Bad Response");
			}
		}).then( (jsonData)=> {
			jsonData.object.forEach(e=>{
				let elm = '<div class="col-lg-3 col-md-4 col-sm-6 mix sale">'+
						  '<div class="car__item">'+
						  '<div class="car__item__pic__slider owl-carousel">';
								
				for (var index = 0; index < e.imageVarients.length; index++) { 
					elm += '<img src="' + e.imageVarients[index] + '" alt="">';
				} 
				
				elm += '</div>'+
					   '<div class="car__item__text">'+
					   '<div class="car__item__text__inner">'+
					   '<h5><a href="#">' + e.productName + '</a></h5>'+
					   '<ul>'+
					   '<li><span>' + (e.addCustomeFeatures.price_from/100000).toFixed(2) + '</span> Lakh</li>'+
					   '<li><span>' + e.addCustomeFeatures.engine + '</span> CC</li>'+
					   '<li><span>' + e.addCustomeFeatures.bhp + '</span> BHP</li>'+
					   '</ul>'+
					   '</div>'+
					   '<div class="car__item__price">'+
					   '<span class="car-option">Book Now</span>'+
					   '<h6><i class="fa fa-money"></i>₹&nbsp;&nbsp;' + e.discount + '&nbsp;CASHBACK</h6>'+
					   '</div></div></div></div>';
				
				$(".carContainer").append(elm);				
				applyCarousel();					
			});
		}).catch( (err)=>{
			console.log('ERROR:', err.message);
		});
	}
	
	function applyCarousel() {
        $(".car__item__pic__slider").owlCarousel({
			loop: true,
			margin: 0,
			items: 1,
			dots: true,
			smartSpeed: 1200,
			autoHeight: false,
			autoplay: false
		});
    }
	
	/*--------------
	  save query
	----------------*/  
	 $( "#onSubmitBtn" ).click(function() {
		 saveQuery();
	 });
	
    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*--------------------------
        Testimonial Slider
    ----------------------------*/
    $(".car__item__pic__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*--------------------------
        Testimonial Slider
    ----------------------------*/
    var testimonialSlider = $(".testimonial__slider");
    testimonialSlider.owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: true,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        responsive: {
            768: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    /*-----------------------------
        Car thumb Slider
    -------------------------------*/
    $(".car__thumb__slider").owlCarousel({
        loop: true,
        margin: 25,
        items: 5,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false,
        responsive: {

            768: {
                items: 5
            },
            320: {
                items: 3
            },
            0: {
                items: 2
            }
        }
    });

    /*-----------------------
		Range Slider
	------------------------ */
    var rangeSlider = $(".price-range");
    rangeSlider.slider({
        range: true,
        min: 1,
        max: 4000,
        values: [800, 3200],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1] + ".100");
        }
    });
    $("#amount").val("$" + $(".price-range").slider("values", 0) + " - $" + $(".price-range").slider("values", 1) + ".100");

    var carSlider = $(".car-price-range");
    carSlider.slider({
        range: true,
        min: 1,
        max: 4000,
        values: [900, 3000],
        slide: function (event, ui) {
            $("#caramount").val("$" + ui.values[0] + " - $" + ui.values[1] + ".100");
        }
    });
    $("#caramount").val("$" + $(".car-price-range").slider("values", 0) + " - $" + $(".car-price-range").slider("values", 1) + ".100");

    var filterSlider = $(".filter-price-range");
    filterSlider.slider({
        range: true,
        min: 1,
        max: 1200000,
        values: [180000, 1000000],
        slide: function (event, ui) {
            $("#filterAmount").val("[ " + "$" + ui.values[0] + " - $" + ui.values[1] + " ]");
        }
    });
    $("#filterAmount").val("[ " + "$" + $(".filter-price-range").slider("values", 0) + " - $" + $(".filter-price-range").slider("values", 1) + " ]");

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
		Magnific
	--------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Single Product
	--------------------*/
    $('.car-thumbs-track .ct').on('click', function () {
        $('.car-thumbs-track .ct').removeClass('active');
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.car-big-img').attr('src');
        if (imgurl != bigImg) {
            $('.car-big-img').attr({
                src: imgurl
            });
        }
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.counter-num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
	
	

})(jQuery);