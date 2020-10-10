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

$(document).ready(function() {
    $("body").css("-webkit-user-select", "none");
    $("body").css("-moz-user-select", "none");
    $("body").css("-ms-user-select", "none");
    $("body").css("-o-user-select", "none");
    $("body").css("user-select", "none");
});

/* Remove # form Links.
--------------------------------------------------*/
//Don't leave # where you want the links to work:ex:slider a tag or a tag won't work so give link.
var links = document.getElementsByTagName("a");

Array.prototype.forEach.call(links, function(elem, index) {

    var elemAttr = elem.getAttribute("href");
    if (elemAttr && elemAttr.includes("#")) {
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



/* Movie Category
--------------------------------------------------*/
// set up variables
var categoryFilters = [];
var categoryFilter;

// init Isotope
var $container = $('#movie-grid').isotope({
    itemSelector: '.item',
    filter: function() {
        var length = categoryFilters.length;
        if (!length) {
            return true;
        }
        var $this = $(this);
        // check if all category filter match
        for (var i = 0; i < length; i++) {
            var catFilter = categoryFilters[i];
            if (!$this.is('[data-category*=' + catFilter + ']')) {
                return false;
            }
        }
        // otherwise match
        return true;
    }

});

// filter with checkboxes
var $checkboxes = $('.movie-filter input');

$checkboxes.change(function() {
    categoryFilters = [];
    $checkboxes.each(function(i, elem) {
        if (elem.checked) {
            categoryFilters.push(elem.value);
        }
        console.log(categoryFilters.join(','));
        $container.isotope();
    });
    // $('.movie-filter li').toggleClass("active");
});

//****************************
// Isotope Load more button
//**************************** 
var initShow = 10; //number of images loaded on init & onclick load more button
var counter = initShow; //counter for load more button
var iso = $container.data('isotope'); // get Isotope instance
//console.log(iso.elemCount);

loadMore(initShow); //execute function onload

function loadMore(toShow) {

    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
        //console.log(item.element);
        return item.element;
    });
    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
        $("#load-more-btn").hide();
    } else {
        $("#load-more-btn").show();
    }

}

//append load more button
$container.after('<div class="load-more"><a href="#" class="btn gray" id="load-more-btn"><i class="fas fa-plus"></i> LOAD MORE</a></div>');

//when load more button clicked
$(document).on("click", "#load-more-btn", function(e) {
    e.preventDefault();

    if ($('.movie-filter input').data('clicked')) {
        //when filter button clicked, set initial value for counter
        counter = initShow;
        console.log(counter);
        j$('.movie-filter input').data('clicked', false);
    } else {
        counter = counter;
    }

    counter = counter + initShow;

    loadMore(counter);
});


jQuery(document).ready(function(){
   
    /* Sticky Header
    --------------------------------------------------*/

    $(window).scroll(function() {

        if ($(this).scrollTop() > 1) {
            $('header').addClass("sticky-");
        } else {
            $('header').removeClass("sticky-");
        }

    });

    /* Mobile Menu
    --------------------------------------------------*/

    $(".mobile-menu-icon").click(function() {
        $(this).toggleClass('change');
        $(".mobile-menu").slideToggle(700);
        $("body").toggleClass("body-hide");
        $("header").toggleClass("open");
    });

    $(".mobile-menu").on("click", "a", function() {
        $(".mobile-menu-icon").click();
    });


    let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    $(".menu-item-has-children a").after("<span class='menu_sub'></span>");
    $(document).on(touchEvent, '.menu_sub', function() {
        $(this).toggleClass("open");
        $(this).parent('.menu-item-has-children').toggleClass("open-parent");
        $(this).next('ul').slideToggle();
    });

    /* Like Btn
    --------------------------------------------------*/

    $(".like-btn").click(function() {
        $(this).toggleClass('like');
    });


    /* Watch Btn
    --------------------------------------------------*/

    $(".watch-btn").click(function() {
        $(this).toggleClass('watched');
    });


    /* HomeBanner Slider
    --------------------------------------------------*/
    $('.serials-slider')
        .on('afterChange init', function(event, slick, direction) {
            console.log('afterChange/init', event, slick, slick.$slides);
            // remove all prev/next
            slick.$slides.removeClass("active-before").removeClass("active-after");

            // find current slide
            for (var i = 0; i < slick.$slides.length; i++) {
                var $slide = $(slick.$slides[i]);
                if ($slide.hasClass('slick-center')) {
                    // update DOM siblings
                    $slide.prev(".slick-active").prev().prev().addClass("active-before");
                    $slide.next(".slick-active").next().next().addClass("active-after");
                    break;
                }
            }
        })
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
            centerPadding: '5%',
            /*Always show odd numbers of slides to make it work: 1,3,5,7,9,11 
            and adjust padding ablove and change css acordingly*/
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            speed: 100
        });

    /* Video Embed
    --------------------------------------------------*/
    // This function will get the video ID
    function get_video_id(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    // Append the video iframe on user's click on the thumbnail
    $('.video-wrap').click(function() {
        var id = get_video_id($(this).data('url')); // Get the ID
        $(this).append(
            '<iframe src="https://www.youtube.com/embed/' + id + '?showinfo=0&iv_load_policy=3&modestbranding=1&autoplay=1" allow="autoplay;picture-in-picture" allowfullscreen></iframe>'); // Appending the iframe
        $(this).find('.video-thumbnail').fadeOut(); // Remove the Video Thumbnail


    });

    /* Movie Filter Slider
    --------------------------------------------------*/

    $(".movie-filter").slick({
        dots: false,
        arrows: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: true,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                    autoplay: true
                }
            }
        ]

    });

});