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


    // for Outcomes carousel
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
    $(".owl-list").owlCarousel({
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
            360:{
                items:3
            },
            420:{
                items:4
            },
            560:{
                items:5
            },
            767:{
                items:6
            },
            860:{
                items:7
            },
            1081:{
                items:4
            },
            1240:{
                items:5
            },
            1440:{
                items:6
            },
            1700:{
                items:7
            }
        }
    });


    // for min-height LI
    $(window).on('load resize', function() {
        var mh = 0,
            contentLi = $(".primary .accordion-content-box ul li");

        if ($(window).width() > '736') {
            contentLi.each(function () {
                if ($(this).outerHeight() > mh) {
                    mh = $(this).outerHeight();
                }
            });
            contentLi.css('min-height', mh);
        } else {
            contentLi.removeAttr('style');
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
                allTabContent.find('.sub-tab-box-wrap').removeClass('visible animated fadeIn');
                allTabContent.find('.sub-tab-box-wrap').addClass('invisible');
                // allTabContent.find('.sub-tab-box').slideUp(500);
                $(this).addClass('active');
                idTabContent.addClass('active');
                idTabContent.find('.sub-tab-box-wrap').removeClass('invisible');
                idTabContent.find('.sub-tab-box-wrap').addClass('visible animated fadeIn');
                // setTimeout(function () {
                //     // idTabContent.find('.sub-tab-box').slideDown(500);
                // }, 500);

                // height carousel content box
                setTimeout(function () {
                    var box = idTabContent.find('.slider-text-content'),
                        maxHeight = 0;
                    box.each(function(){
                        if ( $(this).height() > maxHeight ){
                            maxHeight = $(this).height();
                        }
                    });
                    box.height(maxHeight);
                }, 500);
                // height carousel content box
                setTimeout(function () {
                    var wbox = idTabContent.find('.slider-text-wrap'),
                        wmaxHeight = 0;
                    wbox.each(function(){
                        if ( $(this).height() > wmaxHeight ){
                            wmaxHeight = $(this).height();
                        }
                    });
                    wbox.height(wmaxHeight);
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
                allTabContent.find('.accordion-content-box-wrap').removeClass('visible animated fadeIn');
                allTabContent.find('.accordion-content-box-wrap').addClass('invisible');

                // $(this).addClass('active');
                tabWrap.find("[data-examples-item="+tabID+"]").addClass('active');
                idTabContent.addClass('active');

                idTabContent.find('.accordion-content-box-wrap').removeClass('invisible');
                idTabContent.find('.accordion-content-box-wrap').addClass('visible animated fadeIn');
            }
    });
    //close example tab content
    $('.accordion-content-box-wrap .mfp-close, .accordion-sub-tab-list li').on('click', function () {
        var tabWrap = $('.strategy-examples-block'),
            tabContent = tabWrap.children('.strategy-examples-box-list'),
            allTab = tabWrap.find('.example-item'),
            allTabContent = tabContent.children();

        allTab.removeClass('active');
        allTabContent.removeClass('active');
        allTabContent.find('.accordion-content-box-wrap').removeClass('visible animated fadeIn');
        allTabContent.find('.accordion-content-box-wrap').addClass('invisible');
    });

    // $('.sub-tab-item, .icon-img-box, .sub-tab-item-img, .icon-title, .sub-tab-item-title, .sub-tab-box-wrap').addClass("invisible");//fadeIn

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
                    // if(secondaryCountOpen > 0) {
                    //     thirdItems.addClass('disable');
                    // } else {
                    //     accordionList.removeClass('disable');
                    // }

                    // if (href == '#impact') {
                    //     accordionList.not('.primary').not('.third').addClass('open');
                    //     accordionList.not('.primary').not('.third').find('.accordion-content').slideDown(duration);
                    //     thirdItems.addClass('disable');
                    // } else {
                        accordionList.removeClass('disable');
                        accordionList.removeClass('open');
                        accordionList.find('.accordion-content').slideUp(duration);
                        accordionList.removeClass('disable');
                        accordionItem.addClass('open');
                        accordionItem.find('.accordion-content').slideDown(duration);
                    // }


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
                        if (nextItem.hasClass(secondary) && prevItem.hasClass(third)) {
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
                        // accordionItem.removeClass('open');
                        // accordionItem.find('.accordion-content').slideUp(duration);
                        // accordionItem.removeClass('disable');
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
        $(window).on('load resize', function() {
            // if ($(window).width() <= '1080') {
                // var clickCont = 0;
                $('#continue').on('click touch', function() {
                    var deduction = $(window).width() <= '768' ? headerHeight + 30 : 30;
                    // if (clickCont < 1) {
                        accordionList.removeClass('open');
                        accordionList.find('.accordion-content').slideUp(duration);
                        accordionList.removeClass('disable');
                        $('html, body').animate({
                            scrollTop: $('#problem').offset().top - deduction
                        }, 400);

                    // }
                    // clickCont++;
                });
            // }
        });
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

    if (!($('div#fullpage').hasClass('fullpage'))) {
        allNavItem.click(function () {
            mainLogic('click');
            scrollHash();
        });

        $(window).on('load', function () {
            mainLogic('load');
            scrollHash();
        });
    }

    //for fullpage

    // header fade
    $(function() {
        var header = $('.header'),
            sidebar = $('.sidebar'),
            contentBox = $('.content-box'),
            menuIcon = $('.menu-icon');

        setTimeout(function(){
            $('.animated-wrap').addClass('visible animated fadeIn');
        },100);

        setTimeout(function(){
            header.addClass('show');
            sidebar.addClass('visible animated fadeInUp');
            contentBox.addClass('visible animated fadeInUp');
            menuIcon.addClass('visible animated fadeIn');
        },800);
    });

    if ($('div#fullpage').hasClass('fullpage')) {
        function maxHeight(box) {
            var maxHeight = 0;
            box.each(function () {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });
            return maxHeight;
        }

        $('#fullpage').fullpage({
            verticalCentered: false,
            css3: false,
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
            menu: '#myMenu',
            navigationPosition: 'right',
            afterLoad: function (anchorLink, index) {
                setTimeout(function () {
                    if ((!$('body').hasClass('fp-responsive'))) {
                        var slideBox = $('.slide-box').eq(index - 1),
                            slideTitle = slideBox.find('.slide-title'),
                            slideContent = slideBox.find('.content *'),
                            slideBtn = slideBox.find('.btn');

                        if (slideTitle.hasClass('invisible')) {
                            slideTitle.removeClass('invisible').addClass('visible animated fadeInUp');
                        }
                        if (slideContent.hasClass('invisible')) {
                            slideContent.removeClass('invisible').addClass('visible animated fadeInUp');
                        }
                        if (slideBtn.hasClass('invisible')) {
                            slideBtn.removeClass('invisible').addClass('visible animated fadeInUp');
                        }
                    }
                }, 100)
            }
        });

        $(window).on('load resize', function () {
            var footer = $('#footer'),
                footerSlide = $('.section.footer'),
                footerHeight = footer.outerHeight(),
                rightNav = $('.right-nav'),
                rightNavHeight = rightNav.outerHeight() / 2,
                box = $('.slide-box'),
                maxH = maxHeight(box),
                fullWinHeight = $(window).height(),
                winHeight = fullWinHeight - $('.header').height();

            if (maxH > winHeight) {
                setTimeout(function () {
                    $.fn.fullpage.destroy('all');
                    $('#fullpage').fullpage({
                        verticalCentered: false,
                        css3: false,
                        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
                        menu: '#myMenu',
                        navigationPosition: 'right',
                        responsiveHeight: fullWinHeight + 20,
                        afterLoad: function (anchorLink, index) {
                            setTimeout(function () {
                                if ((!$('body').hasClass('fp-responsive'))) {
                                    var slideBox = $('.slide-box').eq(index - 1),
                                        slideTitle = slideBox.find('.slide-title'),
                                        slideContent = slideBox.find('.content *'),
                                        slideBtn = slideBox.find('.btn');

                                    if (slideTitle.hasClass('invisible')) {
                                        slideTitle.removeClass('invisible').addClass('visible animated fadeInUp');
                                    }
                                    if (slideContent.hasClass('invisible')) {
                                        slideContent.removeClass('invisible').addClass('visible animated fadeInUp');
                                    }
                                    if (slideBtn.hasClass('invisible')) {
                                        slideBtn.removeClass('invisible').addClass('visible animated fadeInUp');
                                    }
                                }
                            }, 10)
                        }
                    });
                }, 10)
            }
            setTimeout(function () {
                footerSlide.height(footerHeight);
            }, 400);
        });

        //for animate
        function animate() {
            /*viewportchecker to trigger animations throughout*/
            $(".slide-title, .slide-box .content *").addClass("invisible").viewportChecker({
                classToAdd: 'visible animated fadeInUp',
                offset: 50
            });
            $(".slide-box .btn").addClass("invisible").viewportChecker({
                classToAdd: 'visible animated fadeInUp',
                offset: 0
            });
        }

        animate();
    }


   // animate
    $('.icon-list .icon-img-box, .sub-tab-item-img').addClass("invisible").viewportChecker({
            classToAdd: 'visible animated fadeInUp',
            offset: 50
        });
    $('.icon-list .icon-title, .sub-tab-item-title').addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 0
    });
    $('.strategy-examples-block').addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 50
    });
    $('.cell-list').addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 50
    });
    $('.sub-tab-box-wrap').addClass("invisible");
    // $(".sidebar, .content-box").addClass("invisible").viewportChecker({
    //     classToAdd: 'visible animated fadeInUp',
    //     offset: 50
    // });
});