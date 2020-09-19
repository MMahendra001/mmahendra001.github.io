var $ = jQuery

/* Preloader
--------------------------------------------------*/

$(window).on("load", function() {
  $("#status").fadeOut();
  $("#preloader")
    .delay(350)
    .fadeOut("slow");
  $("body")
    .delay(350)
    .css({
      overflow: "visible"
    });
});
 
/* Remove # form Links.
--------------------------------------------------*/

var links = document.getElementsByTagName("a");

Array.prototype.forEach.call(links, function(elem, index) {

  var elemAttr = elem.getAttribute("href");
  if(elemAttr && elemAttr.includes("#")) {
    elem.addEventListener("click", function(ev) {
      ev.preventDefault();
      document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
          });
    });
  }
});


jQuery(document).ready(function(){


  /* Sticky Header
  --------------------------------------------------*/ 

  $(window).scroll(function() {

  if ($(this).scrollTop() > 1){  
      $('header').addClass("sticky");
    }
    else{
      $('header').removeClass("sticky");
    }

  });

  /* Scroll To Top and Bottom
  --------------------------------------------------*/ 

  $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scrollToTop').fadeIn();
        } else {
            $('#scrollToTop').fadeOut();
        }
    });
    $('#scrollToTop').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

     $('.scroll_down a').click(function (e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            var scrollTo = target.offset().top;
            $('body, html').animate({
                scrollTop: scrollTo + 'px'
            }, 800);
        }
    });  

  /* Mobile Menu
  --------------------------------------------------*/ 

      $(".mobile-menu-icon").click(function () {
          $(this).toggleClass('change');
            $(".mobile-menu").slideToggle(700);
            $("body").toggleClass("body-hide");
        });

         $(".mobile-menu").on("click", "a", function () {
               $(".mobile-menu-icon").click();
         });


      let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
        $(".menu-item-has-children a" ).after( "<span class='menu_sub'></span>" );
        $(document).on(touchEvent, '.menu_sub', function(){
          $(this).toggleClass("open");
          $(this).parent('.menu-item-has-children').toggleClass("open-parent");
          $(this).next('ul').slideToggle();
      });



  /* Isotop for Protfolio Section
  --------------------------------------------------*/ 

    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows'
    });
    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
    // bind filter button click
    $('.filters-button-group').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.active').removeClass('active');
        $( this ).addClass('active');
      });
    });

    /* Custom Select Using Ul/LI 
    --------------------------------------------------*/ 

    $("#filters-btn").click(function(){
        $(this).toggleClass('open');
        $("#filters.mobile-filter").slideToggle(300);
    });

    $('#filters.mobile-filter button').click(function() { 
        $("#filters-btn").click();        
        var btnValue = $(this).attr('value'); 
        $("#filters-btn").text(btnValue) 
    }); 

     


  /* Project Img Slider
  --------------------------------------------------*/ 

	$('.project-imgs ul').slick({
	  infinite: true,
	  arrows:true,
	  dots:false,
	  fade:true,	  
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay:false  	  
	});




});




