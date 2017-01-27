jQuery(document).ready(function($) {

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });

    // for header-fixed padding
    $(window).on('load resize', function() {
        if ($(window).width() <= '768') {
            var headerHeight = $('#header').outerHeight();
            $('.wrapper').css('padding-top', headerHeight);
        } else {
            $('.wrapper').removeAttr('style');
        }
    });

    // for smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInQuad', // Easing pattern to use
        offset: 50 // Integer. How far to offset the scrolling anchor location in pixels
    });

    //for popup
    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    //carousel
    $(".owl-text").owlCarousel({
        items: 1,
        loop: true,
        responsive:{
            0:{
                items:1
            }
        }
    });
    // tab carousel
    $(".owl-examples").owlCarousel({
        dots: false,
        nav: true,
        navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        responsive:{
            0:{
                items:2
            },
            320:{
                items:3
            },
            420:{
                items:4
            },
            480:{
                items:5
            },
            640:{
                items:6
            },
            768:{
                items:7
            }
        }
    });

    //for sub tab
    $('.accordion-sub-tab-list li').click(function(){
        var tabID = $(this).data('subTab'),
            tabContent = $(this).parent().next(),
            allTab = $(this).parent().find('li'),
            allTabContent = tabContent.find('li'),
            tabParrent = $(this).parent();

            if (!$(this).hasClass('active')) {
                var idTabContent = tabContent.find("[data-sub-box="+tabID+"]");

                allTab.removeClass('active');
                allTabContent.removeClass('active');
                // allTabContent.find('.sub-tab-box').slideUp(500);
                $(this).addClass('active');
                idTabContent.addClass('active');
                // setTimeout(function () {
                //     // idTabContent.find('.sub-tab-box').slideDown(500);
                // }, 500);

                // height carousel box
                setTimeout(function () {
                    var box = idTabContent.find('.slider-text-content'),
                        maxHeight = 0;
                    box.each(function(){
                        if ( $(this).height() > maxHeight ){
                            maxHeight = $(this).height();
                        }
                    });
                    console.log(maxHeight);
                    box.height(maxHeight);
                }, 500);
            }
    });

    //for example tab
    $('.example-item').click(function(){
        var tabID = $(this).data('examplesItem'),
            tabWrap = $(this).parents('.strategy-examples-block'),
            tabContent = tabWrap.children('.strategy-examples-box-list'),
            tabParent = $(this).parents('.tab-parent'),
            allTab = tabWrap.find('.example-item'),
            allTabContent = tabContent.children();

            if (!$(this).hasClass('active')) {
                var idTabContent = tabContent.find("[data-examples-box="+tabID+"]");
                allTab.removeClass('active');
                allTabContent.removeClass('active');

                // $(this).addClass('active');
                tabWrap.find("[data-examples-item="+tabID+"]").addClass('active');
                idTabContent.addClass('active');
            }

    });

    // main logic
    $('.nav-menu a, .sub-nav a, .accordion-link').click(function(){
        var href = $(this).attr('href');
        console.log(href);
    });

});