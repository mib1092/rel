jQuery(document).ready(function($) {

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay, .mobile-menu-box .nav-menu a').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });

    // for header-fixed padding
    $(window).on('load resize', function() {
        headerHeight = $('#header').outerHeight();

        if ($(window).width() <= '768') {
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
    var primary = 'primary',
        secondary = 'secondary',
        third = 'third',
        primaryItems = $('.primary'),
        secondaryItems = $('.secondary'),
        thirdItems = $('.third'),
        accordionList = $('.accordion-list li'),
        allNavItem = $('.nav-menu a, .accordion-link:not(.active)'),
        duration = 350;

    function mainLogic(arg) {
        setTimeout(function () {
            var href = window.location.hash,
                navItems = $('[href="'+href+'"]'),
                accordionItem = $('.accordion-list').find('[href="'+href+'"]').parent(),
                nextItem = accordionItem.next(),
                prevItem = accordionItem.prev();
            if (!accordionItem.hasClass('open')) {
                if (accordionItem.hasClass(primary)) {
                    accordionList.removeClass('neighbors-open');
                    accordionList.removeClass('open');
                    accordionList.find('.accordion-content').slideUp(duration);
                    primaryItems.addClass('open');
                    primaryItems.find('.accordion-content').slideDown(duration);
                    secondaryItems.addClass('disable');
                    thirdItems.addClass('disable');
                } else if (accordionItem.hasClass(secondary)) {
                    var secondaryCountOpen = $('.secondary.open').length;

                    accordionList.not('.primary').not('.third').removeClass('neighbors-open');

                    if (prevItem.hasClass(primary) && !nextItem.hasClass(primary)) {
                        prevItem.addClass('neighbors-open');
                    } else if (!prevItem.hasClass(primary) && nextItem.hasClass(primary)) {
                        nextItem.addClass('neighbors-open');
                    }

                    accordionList.not('.secondary').find('.accordion-content').slideUp(duration);
                    accordionList.not('.secondary').removeClass('open');
                    if(secondaryCountOpen > 0) {
                        thirdItems.addClass('disable');
                    } else {
                        accordionList.removeClass('disable');
                    }

                    if (href == '#impact') {
                        accordionList.not('.primary').not('.third').addClass('open');
                        accordionList.not('.primary').not('.third').find('.accordion-content').slideDown(duration);
                        thirdItems.addClass('disable');
                    } else {
                        accordionItem.addClass('open');
                        accordionItem.find('.accordion-content').slideDown(duration);
                    }


                } else if (accordionItem.hasClass(third)) {

                    if (prevItem.hasClass(secondary) && !nextItem.hasClass(secondary)) {
                        prevItem.addClass('neighbors-open');
                        if (prevItem.hasClass(secondary) && nextItem.hasClass(third)) {
                            nextItem.removeClass('top');
                            nextItem.addClass('bottom');
                        }
                    } else if (prevItem.hasClass(third) && nextItem.hasClass(third)) {
                        prevItem.removeClass('bottom');
                        prevItem.addClass('top');
                        nextItem.removeClass('top');
                        nextItem.addClass('bottom');
                        accordionItem.removeClass('bottom');
                        accordionItem.addClass('top');
                    } else if (!prevItem.hasClass(secondary) && nextItem.hasClass(secondary)) {
                        nextItem.addClass('neighbors-open');
                        if (nextItem.hasClass(secondary) && prevItem.hasClass(third) ) {
                            prevItem.removeClass('bottom');
                            prevItem.addClass('top');
                            accordionItem.removeClass('bottom');
                            accordionItem.addClass('top');
                        }
                    }

                    accordionList.find('.accordion-content').slideUp(duration);
                    accordionList.removeClass('disable');
                    accordionList.removeClass('open');
                    accordionItem.addClass('open');
                    accordionItem.find('.accordion-content').slideDown(duration);
                }
            } else {
                if ( arg == 'click') {
                    if (accordionItem.hasClass(primary)) {
                        accordionList.removeClass('open');
                        accordionList.find('.accordion-content').slideUp(duration);
                        accordionList.removeClass('disable');
                    } else if (accordionItem.hasClass(secondary)) {
                        accordionList.removeClass('open');
                        accordionList.find('.accordion-content').slideUp(duration);
                        accordionList.removeClass('disable');
                    } else if (accordionItem.hasClass(third)) {
                        accordionList.removeClass('open');
                        accordionList.find('.accordion-content').slideUp(duration);
                        accordionList.removeClass('disable');
                    }
                }
            }

            var activeNavItem = $('.accordion-list li.open').find('a');

            allNavItem.removeClass('active');

            activeNavItem.each(function (i) {
                var id = activeNavItem.eq(i).attr('href');
                allNavItem.each(function (y) {
                  if (id == allNavItem.eq(y).attr('href')) {
                      allNavItem.eq(y).addClass('active');
                  }
                })

            });

        }, 10);
    }

    function firstLoadMobile() {
        if ($(window).width() <= '768') {
            var clickCont = 0;
            $('.primary.open .accordion-content').click(function () {
                if (clickCont < 1) {
                    accordionList.removeClass('open');
                    accordionList.find('.accordion-content').slideUp(duration);
                    accordionList.removeClass('disable');
                }
                clickCont++;
            });
        }
    }

    firstLoadMobile();

    function scrollHash() {
        setTimeout(function () {
            var target = window.location.hash;
            var deduction = $(window).width() <= '768' ? headerHeight + 30 : 30;

            $('html, body').animate({
                scrollTop: $(target).offset().top - deduction
            }, 400);
        }, duration + 10);
    }

    allNavItem.click(function(){
        mainLogic('click');
        scrollHash();
    });

    $(window).on('load', function() {
        mainLogic('load');
        scrollHash();
    });

});