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

/* Disable Select
--------------------------------------------------*/

$(document).ready(function(){
    $("body").css("-webkit-user-select","none");
    $("body").css("-moz-user-select","none");
    $("body").css("-ms-user-select","none");
    $("body").css("-o-user-select","none");
    $("body").css("user-select","none");
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


  /* Responsive Slider
  --------------------------------------------------*/ 

    $slickResponsive = false;
    function responsiveSlider(){    
        if($(window).width() < 991){
            if(!$slickResponsive){
                $(".trusted-companies-slider").slick({
                    dots: false,
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [
                        {
                          breakpoint: 768,
                          settings: {
                            arrows: true,
                            slidesToShow: 3
                          }
                        },
                        {
                          breakpoint: 640,
                          settings: {
                            arrows: true,
                            slidesToShow: 2
                          }
                        },                        
                        {
                          breakpoint: 480,
                          settings: {
                            arrows: true,
                            slidesToShow: 1,
                            autoplay:true
                          }
                        }
                      ]
        
                });
                $slickResponsive = true;
            }
        } 
        else if($(window).width() > 992){
            if($slickResponsive){
                $('.trusted-companies-slider').slick('unslick');
                $slickResponsive = false;
            }
        }
    };

    $(document).ready(function(){
        responsiveSlider();
    });
    $(window).on('resize', function(){
         responsiveSlider();
    });


  /* Our Price
  --------------------------------------------------*/ 

    $("#price-checkbox").change(function() {
        if(this.checked) {
          $('.montlypricing').css('display', 'none');
            $('.yearlypricing').css('display', 'block');
            $('.annualy-btn').addClass('active');
            $('.monthly-btn').removeClass('active');
        } 
        else {
          $('.montlypricing').css('display', 'block');
          $('.yearlypricing').css('display', 'none');
          $('.annualy-btn').removeClass('active');
          $('.monthly-btn').addClass('active');
        }
    });


  /* Testimonial Slider
  --------------------------------------------------*/ 

    $(".testimonial-slider").slick({
        dots: false,
        arrows: true,
        fade:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:false,
        infinite:false
    });


  /* FAQ Accordion
  --------------------------------------------------*/ 
    
    $(".accordion h6:first").addClass("active");
    $(".accordion  p:not(:first)").hide();

    $(".accordion h6").click(function(){
        $(this).next("p").slideToggle("slow")
        .siblings("p:visible").slideUp("slow");
        $(this).toggleClass("active");
        $(this).siblings("h6").removeClass("active");
    });




});




