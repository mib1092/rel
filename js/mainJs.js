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
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        responsive:{
            0:{
                items:1
            }
        }
    });

    // for accordion list
    $('.accordion-tab').click(function(){
        var accordionItem = $(this).parent(),
            accordionContent = $(this).next();
        if (!accordionItem.hasClass('open')){
            accordionItem.addClass('open');
            accordionContent.slideDown(300);
        } else {
            accordionItem.removeClass('open');
            accordionContent.slideUp(300);
        }
    });

    //for sub tab
    $('.accordion-sub-tab-list li').click(function(){
        var tabID = $(this).data('subTab'),
            tabContent = $(this).parent().next(),
            allTab = $(this).parent().find('li'),
            allTabContent = tabContent.find('li'),
            tabParrent = $(this).parent();

        if ($(window).width() <= '736'){
            if (!$(this).hasClass('active')) {
                var idTabContent = tabContent.find("[data-sub-box="+tabID+"]");

                allTab.removeClass('active');
                allTabContent.removeClass('active');
                allTabContent.find('.sub-tab-box').slideUp(500);
                $(this).addClass('active');
                $(this).appendTo(tabParrent).show('slow');
                idTabContent.addClass('active');
                setTimeout(function () {
                    idTabContent.find('.sub-tab-box').slideDown(500);
                }, 500);

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
        } else {
            if (!$(this).hasClass('active')) {
                var idTabContent = tabContent.find("[data-sub-box="+tabID+"]");

                allTab.removeClass('active');
                allTabContent.removeClass('active');
                allTabContent.find('.sub-tab-box').slideUp(500);
                $(this).addClass('active');
                idTabContent.addClass('active');
                setTimeout(function () {
                    idTabContent.find('.sub-tab-box').slideDown(500);
                }, 500);

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
        }

    });

    //for example tab
    $('.strategy-examples-item-list li').click(function(){
        var tabID = $(this).data('examplesItem'),
            tabContent = $(this).parent().next(),
            allTab = $(this).parent().find('li'),
            allTabContent = tabContent.find('li'),
            tabParrent = $(this).parent();

        if ($(window).width() <= '992'){
            if (!$(this).hasClass('active')) {
                var idTabContent = tabContent.find("[data-examples-box="+tabID+"]");
                allTab.removeClass('active');
                allTabContent.removeClass('active');
                // allTabContent.find('.accordion-content-box-wrap').css('display', 'none');

                $(this).addClass('active');
                $(this).appendTo(tabParrent);
                idTabContent.addClass('active');
                // setTimeout(function () {
                //     idTabContent.find('.accordion-content-box-wrap').slideDown(500);
                // }, 500);
            }
        } else {
            if (!$(this).hasClass('active')) {
                var idTabContent = tabContent.find("[data-examples-box="+tabID+"]");
                allTab.removeClass('active');
                allTabContent.removeClass('active');
                // allTabContent.find('.accordion-content-box-wrap').css('display', 'none');

                $(this).addClass('active');
                idTabContent.addClass('active');
                // setTimeout(function () {
                //     idTabContent.find('.accordion-content-box-wrap').slideDown(500);
                // }, 500);
            }
        }

    });

});