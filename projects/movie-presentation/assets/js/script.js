
var $ = jQuery;

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
//Don't leave # where you want the links to work:ex:slider a tag or a tag won't work so give link.
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


// This function will get the video ID
function get_video_id(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

// Start Appending the elements to the dom
$(document).ready(function(){
    
  // Append the video iframe on user's click on the thumbnail
  $('.video-wrap').click(function(){
    var id = get_video_id($(this).data('url')); // Get the ID
    $(this).append(
        '<iframe src="https://www.youtube.com/embed/' + id + '?showinfo=0&iv_load_policy=3&modestbranding=1&autoplay=1" allow="autoplay;picture-in-picture" allowfullscreen></iframe>'); // Appending the iframe
    $(this).find('.video-thumbnail').fadeOut(); // Remove the Video Thumbnail
 
    
  });

  
}); 

        // '<iframe src="https://www.youtube.com/embed/' + id + '?showinfo=0&iv_load_policy=3&modestbranding=1&autoplay=1&rel=1"></iframe>'); // Appending the iframe


jQuery(document).ready(function(){


  /* Sticky Header
  --------------------------------------------------*/ 

      $(window).scroll(function() {

      if ($(this).scrollTop() > 1){  
          $('header').addClass("sticky-");
        }
        else{
          $('header').removeClass("sticky-");
        }

      });

  /* Mobile Menu
  --------------------------------------------------*/ 

      $(".mobile-menu-icon").click(function () {
          $(this).toggleClass('change');
            $(".mobile-menu").slideToggle(700);
            $("body").toggleClass("body-hide");
            $("header").toggleClass("open");
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

  /* HomeBanner Slider
  --------------------------------------------------*/
    $('.serials-slider')
    .on('afterChange init', function(event, slick, direction){
        console.log('afterChange/init', event, slick, slick.$slides);
        // remove all prev/next
        slick.$slides.removeClass("active-before").removeClass("active-after");

        // find current slide
        for (var i = 0; i < slick.$slides.length; i++)
        {
            var $slide = $(slick.$slides[i]);
            if ($slide.hasClass('slick-center')) {
                // update DOM siblings
                $slide.prev(".slick-active").prev().prev().addClass("active-before");
                $slide.next(".slick-active").next().next().addClass("active-after");            
                break;
            }
        }
      }
    )
    .on('beforeChange', function(event, slick) {
        // optional, but cleaner maybe
        // remove all prev/next
        slick.$slides.removeClass("active-before").removeClass("active-after");
    })
    .slick({

      focusOnSelect: true,  
      arrows: true,
      dots: false,
      centerMode: true,
      /*Change this padding as you change the number of slides below
       and adjust css acordingly*/  
      centerPadding:'5%', 
      /*Always show odd numbers of slides to make it work: 1,3,5,7,9,11 
      and adjust padding ablove and change css acordingly*/
      slidesToShow:5,
      slidesToScroll:1,
      autoplay:true,
      infinite:true,
      speed:100  
    });

  /* Like Btn
  --------------------------------------------------*/ 

      $(".like-btn").click(function () {
          $(this).toggleClass('like');
        });        
     

});






