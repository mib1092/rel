jQuery(document).ready(function($) {

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
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

    //for sub tab
    $('.accordion-sub-tab-list li').click(function(){
        var tabID = $(this).data('subTab'),
            tabContent = $(this).parent().next(),
            allTab = $(this).parent().find('li'),
            allTabContent = tabContent.find('li');

        if (!$(this).hasClass('active')) {
            allTab.removeClass('active');
            allTabContent.removeClass('active');
            $(this).addClass('active');
            tabContent.find("[data-sub-box="+tabID+"]").addClass('active');

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

            // height carousel box
            var box = $('.slider-text-content'),
                maxHeight = 0;
            box.each(function(){
                if ( $(this).height() > maxHeight )
                {
                    maxHeight = $(this).height();
                }
            });
            box.height(maxHeight);
        }
    });

    //for example tab
    $('.strategy-examples-item-list li').click(function(){
        var tabID = $(this).data('examplesItem'),
            tabContent = $(this).parent().next(),
            allTab = $(this).parent().find('li'),
            allTabContent = tabContent.find('li');

        if (!$(this).hasClass('active')) {
            allTab.removeClass('active');
            allTabContent.removeClass('active');
            $(this).addClass('active');
            tabContent.find("[data-examples-box="+tabID+"]").addClass('active');
        }
    });

});