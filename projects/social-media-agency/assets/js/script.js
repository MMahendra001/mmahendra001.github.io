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
          $('header').addClass("stickyl");
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

  /* Pagination
  --------------------------------------------------*/ 
 
    var items = $("#blog-list > li");
        var numItems = items.length;
        var perPage = 4;

        items.slice(perPage).hide();

        $('#blog-pagination').pagination({
            items: numItems,
            itemsOnPage: perPage,
            prevText: "PREVIOUS",
            nextText: "NEXT",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage; 
                items.hide().slice(showFrom, showTo).show();
              }

        });



});






