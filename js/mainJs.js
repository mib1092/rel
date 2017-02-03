jQuery(document).ready(function($) {

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay, .mobile-menu-box .nav-menu a').on('click', function(){
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


    // for empty links
    $('.prevent, a[href="#"]').on('click', function(event){
        event.preventDefault();
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
                items:2
            },
            420:{
                items:3
            },
            480:{
                items:4
            },
            640:{
                items:5
            },
            1081:{
                items:4
            },
            1240:{
                items:5
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

    // for example tab
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


    // main Accordion logic
    // var problem = $('#problem'),
    //     catalyzingStrategy = $('#catalyzing-strategy'),
    //     assets = $('#assets'),
    //     targetOutcomes = $('#target-outcomes'),
    //     impact = $('#impact'),
    //     vision = $('#vision'),
    //     problemNavItem = $('[href="#problem"]'),
    //     catalyzingStrategyNavItem = $('[href="#catalyzing-strategy"]'),
    //     assetsNavItem = $('[href="#assets"]'),
    //     targetOutcomesNavItem = $('[href="#target-outcomes"]'),
    //     impactNavItem = $('[href="#impact"]'),
    //     visionNavItem = $('[href="#vision"]'),
    //     allNavItem = $('.nav-menu a, .sub-nav a, .accordion-link:not(.active)'),
    //     accordionListItem = $('.accordion-list > li'),
    //     duration = 350;
    //
    // function mainLogic() {
    //     var lastHash = window.location.hash;
    //
    //     setTimeout(function () {
    //         var href = window.location.hash;
    //         if ( href == '#problem' || href == '#vision') {
    //             accordionListItem.removeClass('open');
    //             allNavItem.removeClass('active');
    //             problem.addClass('open');
    //             vision.addClass('open');
    //             problem.find('.accordion-content').slideDown(duration);
    //             vision.find('.accordion-content').slideDown(duration);
    //             catalyzingStrategy.addClass('disable');
    //             assets.addClass('disable');
    //             targetOutcomes.addClass('disable');
    //             impact.addClass('disable');
    //             problemNavItem.addClass('active');
    //             visionNavItem.addClass('active');
    //         }
    //
    //         if ( href == '#catalyzing-strategy' || href == '#assets' || href == '#target-outcomes' || href == '#impact' ){
    //             problem.find('.accordion-content').slideUp(duration);
    //             vision.find('.accordion-content').slideUp(duration);
    //             if (href == '#catalyzing-strategy') {
    //                 catalyzingStrategy.removeClass('disable');
    //                 assets.removeClass('disable');
    //                 targetOutcomes.removeClass('disable');
    //                 impact.removeClass('disable');
    //                 accordionListItem.removeClass('open');
    //                 allNavItem.removeClass('active');
    //                 catalyzingStrategy.addClass('open');
    //                 targetOutcomes.find('.accordion-content').slideUp(duration);
    //                 assets.find('.accordion-content').slideUp(duration);
    //                 impact.find('.accordion-content').slideUp(duration);
    //                 catalyzingStrategy.find('.accordion-content').slideDown(duration);
    //                 catalyzingStrategyNavItem.addClass('active');
    //             }
    //             else if (href == '#assets') {
    //                 catalyzingStrategy.removeClass('disable');
    //                 assets.removeClass('disable');
    //                 targetOutcomes.removeClass('disable');
    //                 impact.removeClass('disable');
    //                 accordionListItem.removeClass('open');
    //                 allNavItem.removeClass('active');
    //                 assets.addClass('open');
    //                 targetOutcomes.find('.accordion-content').slideUp(duration);
    //                 catalyzingStrategy.find('.accordion-content').slideUp(duration);
    //                 impact.find('.accordion-content').slideUp(duration);
    //                 assets.find('.accordion-content').slideDown(duration);
    //                 assetsNavItem.addClass('active');
    //             }
    //             else if (href == '#target-outcomes') {
    //                 catalyzingStrategy.removeClass('disable');
    //                 assets.removeClass('disable');
    //                 targetOutcomes.removeClass('disable');
    //                 impact.removeClass('disable');
    //                 accordionListItem.removeClass('open');
    //                 allNavItem.removeClass('active');
    //                 targetOutcomes.addClass('open');
    //                 assets.find('.accordion-content').slideUp(duration);
    //                 catalyzingStrategy.find('.accordion-content').slideUp(duration);
    //                 impact.find('.accordion-content').slideUp(duration);
    //                 targetOutcomes.find('.accordion-content').slideDown(duration);
    //                 targetOutcomesNavItem.addClass('active');
    //             }
    //             else if (href == '#impact') {
    //                 if (lastHash == '#vision' || lastHash == '#problem') {
    //                     accordionListItem.removeClass('open');
    //                     allNavItem.removeClass('active');
    //                     catalyzingStrategy.removeClass('disable');
    //                     assets.removeClass('disable');
    //                     targetOutcomes.removeClass('disable');
    //                     impact.removeClass('disable');
    //                     impact.addClass('open');
    //                     impact.find('.accordion-content').slideDown(duration);
    //                     impactNavItem.addClass('active');
    //                 }
    //                 if (lastHash == href) {
    //                     if (!impact.hasClass('open')){
    //                         impact.addClass('open');
    //                         impact.find('.accordion-content').slideDown(duration);
    //                         impactNavItem.addClass('active');
    //                     }
    //                 } else {
    //                     impact.addClass('open');
    //                     impactNavItem.addClass('active');
    //                     if (lastHash == '#catalyzing-strategy' ) {
    //                         assets.addClass('disable');
    //                         targetOutcomes.addClass('disable');
    //                     }
    //                     else if (lastHash == '#assets' ) {
    //                         catalyzingStrategy.addClass('disable');
    //                         targetOutcomes.addClass('disable');
    //                     }
    //                     else if (lastHash == '#target-outcomes' ) {
    //                         catalyzingStrategy.addClass('disable');
    //                         assets.addClass('disable');
    //                     }
    //                     impact.find('.accordion-content').slideDown(duration);
    //                 }
    //             }
    //         }
    //     }, 10);
    // }

    // main Accordion logic
    var primary = 'primary',
        secondary = 'secondary',
        third = 'third',
        primaryItems = $('.primary'),
        secondaryItems = $('.secondary'),
        thirdItems = $('.third'),
        accordionList = $('.accordion-list li'),
        allNavItem = $('.nav-menu a, .sub-nav a, .accordion-link:not(.active)'),
        duration = 350;

    function mainLogic() {
        setTimeout(function () {
            var href = window.location.hash,
                navItems = $('[href="'+href+'"]'),
                accordionItem = $('.accordion-list').find('[href="'+href+'"]').parent(),
                nextItem = accordionItem.next(),
                prevItem = accordionItem.prev();

            if (!accordionItem.hasClass('open')) {
                if (accordionItem.hasClass(primary)) {
                    allNavItem.removeClass('active');
                    accordionList.removeClass('open');
                    navItems.addClass('active');
                    primaryItems.addClass('open');
                    primaryItems.find('.accordion-content').slideDown(duration);
                    secondaryItems.addClass('disable');
                    thirdItems.addClass('disable');
                } else if (accordionItem.hasClass(secondary)) {
                    accordionList.removeClass('neighbors-open');

                    if (prevItem.hasClass(primary) && !nextItem.hasClass(primary)) {
                        prevItem.addClass('neighbors-open');
                    } else if (!prevItem.hasClass(primary) && nextItem.hasClass(primary)) {
                        nextItem.addClass('neighbors-open');
                    }

                    accordionList.find('.accordion-content').slideUp(duration);
                    accordionList.removeClass('disable');
                    accordionList.removeClass('open');
                    allNavItem.removeClass('active');
                    navItems.addClass('active');
                    accordionItem.addClass('open');
                    accordionItem.find('.accordion-content').slideDown(duration);
                } else if (accordionItem.hasClass(third)) {
                    accordionList.removeClass('neighbors-open');

                    if (prevItem.hasClass(secondary) && !nextItem.hasClass(secondary)) {
                        prevItem.addClass('neighbors-open');

                    } else if (!prevItem.hasClass(secondary) && nextItem.hasClass(secondary)) {
                        nextItem.addClass('neighbors-open');

                    }

                    accordionList.find('.accordion-content').slideUp(duration);
                    accordionList.removeClass('disable');
                    accordionList.removeClass('open');
                    allNavItem.removeClass('active');
                    navItems.addClass('active');
                    accordionItem.addClass('open');
                    accordionItem.find('.accordion-content').slideDown(duration);
                }
            }

        }, 10);
    }

    allNavItem.click(function(){
        mainLogic();
        setTimeout(function () {
            var target = window.location.hash;
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 400);
        }, duration + 10);
    });

    $(window).on('load', function() {
        mainLogic();
    });

});