(function(){

            /***********************************************************/
            /********************* Variables *********************/
            /***********************************************************/
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var isMobile = {
                    Android: function() {
                        return navigator.userAgent.match(/Android/i);
                    },
                    BlackBerry: function() {
                        return navigator.userAgent.match(/BlackBerry/i);
                    },
                    iOS: function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    },
                    Opera: function() {
                        return navigator.userAgent.match(/Opera Mini/i);
                    },
                    Windows: function() {
                        return navigator.userAgent.match(/IEMobile/i);
                    },
                    any: function() {
                        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                    }
            };

            if(winWidth>=992){
                var niceScroll = $("body,html").niceScroll({cursorcolor: "#000", cursorborder: "0px", railpadding: {right:0}, scrollspeed: 10, mousescrollstep: 15, cursorwidth: "8px", autohidemode: false, zindex:12});
            }


            /***********************************************************/
            /********************* Navigation-Module *********************/
            /***********************************************************/
            var lastParam = "";
            $(window).load(function(e) {
                setNavPositionHandler();
            });
            $(window).resize(function(e) {
                setNavPositionHandler();
            });
            setNavPositionHandler();
            controlNavHandler();

            function setNavPositionHandler(){
                var navWrapper = $(".nav-wrapper");
                var winHeight = $(window).height();
                var navHeight = navWrapper.height();
                var top = (winHeight - navHeight) * 0.5;

                top = (top <= 0) ? 0 : top;
                navWrapper.css({'top':top});
            }
            function controlNavHandler(){
                var navWrapper = $(".nav-wrapper");
                var aTags = navWrapper.find("a");

                navWrapper.hover(function(){
                    navWrapper.css({'margin-left':0});
                }, function(){
                    navWrapper.css({'margin-left':-230});
                });

                aTags.each(function(index, elem){
                    var aTag = $(this);
                    var href = aTag.attr("href");

                    if(href.indexOf(".") >= 0){
                        return false;
                    }
                    aTag.bind("click", function(e){
                        var targetSection = $(href);
                        var topMargin = parseInt(targetSection.css('margin-top'));
                        var topOffset = targetSection.offset().top - topMargin * 0.5;

                        aTags.removeClass('active');
                        aTag.addClass('active');
                        if(niceScroll){
                            //$("body,html").getNiceScroll(0).doScrollTop(topOffset, 2);
                        }
                        $("html, body").stop(true, false);
                        $("html, body").animate({'scrollTop':topOffset}, {duration:2000, easing:'easeInOutExpo'});
                        return false;
                    })
                });
                aTags.eq(0).trigger("click");
            }
            function updateNavActiveHandler(param){
                if(lastParam != param){
                    var navWrapper = $(".nav-wrapper");
                    var aTags = navWrapper.find("a");
                    aTags.removeClass('active');
                    $(param).addClass('active');
                    lastParam = param;
                }
            }


            /***********************************************************/
            /********************* Section-Module *********************/
            /***********************************************************/
            $(window).load(function(e) {
                setSectionHeightHandler();
                setSectionPositionHandler();
            });
            $(window).resize(function(e) {
                setSectionHeightHandler();
                setSectionPositionHandler();
            });

            setSectionHeightHandler();
            setSectionPositionHandler();

            /*
            1) keep parallax bg image in 1920x1200 dimension
            2) keep content in little bit top from center in vertical manner
            3) setting parallax section height rational basis image size
            */
            function setSectionHeightHandler(){
                var styleCode = "";
                var winWidth = $(window).width();
                var winHeight = $(window).height();

                if(winWidth >= 992){
                    $("section").css({'height':'auto'});
                }
                $("section").each(function(index, elem){
                    var section = $(this);
                    var height = Math.floor(winWidth * 1750 / 2800);
                    if(winWidth >= 992 && index <=8){
                        section.css({'height':height});
                    }
                    styleCode += ".section-1:before{height:140px;}\n";
                });
                //$('#custom-style').html(styleCode);
            }
            /*
            1) first check condition for section
            2) check negative margin-top to be set on section on 1920px width in browser by meeting the edges
            3) figure out margin-top value basis on 2800px width in (value * 2800 / 1920) formula
            4) get final value by putting in (windowWidth * new value / 2800) formula
            5) assign new value as margin-top to section
            6) it will keep section conneted with edges in responsive
            */
            function setSectionPositionHandler(){
                var winWidth = $(window).width();
                var winHeight = $(window).height();
                $("section").each(function(index, elem){
                    var section = $(this);
                    if(index == 1){
                        var topMargin = Math.ceil(winWidth * 205 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 2){
                        var topMargin = Math.ceil(winWidth * 255 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 3){
                        var topMargin = Math.ceil(winWidth * 220 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 5){
                        var topMargin = Math.ceil(winWidth * 262 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 6){
                        var topMargin = Math.ceil(winWidth * 292 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 7){
                        var topMargin = Math.ceil(winWidth * 270 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 8){
                        var topMargin = Math.ceil(winWidth * 190 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }else if(index == 9){
                        var topMargin = Math.ceil(winWidth * 190 / 2800) * -1;
                        section.css({'margin-top':topMargin});
                    }
                });
            }



            /***********************************************************/
            /********************* Init Controller *********************/
            /***********************************************************/
            if(isMobile.any() || winWidth <= 991){
                return false;
            }
            var scrollMagicController = new ScrollMagic.Controller({
                container: '#wrapper-sections'
            });


            /***********************************************************/
            /********************* Scene 1 *********************/
            /***********************************************************/
            // variables
            var bgDuration1 = $("#section-1").innerHeight() + $("#section-2").innerHeight() * 1;
            var bgOffset = Math.floor(1750 * winWidth / 2800) * -0.45;
            // Create Animation
            var bgTween1 = TweenMax.fromTo("#section-2", 1,
            {
                backgroundPosition: "50% 100px"
            },
            {
                backgroundPosition: "50% -200px",
                repeat: 0,
                yoyo: false,
                ease: Power0.easeNone
            });

            // Create Timeline
            var bgTimeline1 = new TimelineMax()
            .add([bgTween1]);

            // Create Scene
            var bgScene1 = new ScrollMagic.Scene({
                triggerElement: "#section-2",
                offset: bgOffset,
                duration: bgDuration1
            })
            .setTween(bgTimeline1)
            .addTo(scrollMagicController)
            .on("progress", function (e) {
                if(e.progress.toFixed(3) == 0.000){
                    updateNavActiveHandler("#nav-1");
                }else if(e.progress.toFixed(3) <= 0.010){
                    updateNavActiveHandler("#nav-2");
                }
            });

            // Debug indicators
            bgScene1.addIndicators();

            /***********************************************************/
            /********************* Scene 2 *********************/
            /***********************************************************/
            // variables
            var bgDuration2 = $("#section-3").innerHeight() + $("#section-4").innerHeight() * 1;
            // Create Animation
            var bgTween2 = TweenMax.fromTo("#section-4", 1,
            {
                backgroundPosition: "50% 100px"
            },
            {
                backgroundPosition: "50% -200px",
                repeat: 0,
                yoyo: false,
                ease: Power0.easeNone
            });

            // Create Timeline
            var bgTimeline2 = new TimelineMax()
            .add([bgTween2]);

            // Create Scene
            var bgScene2 = new ScrollMagic.Scene({
                triggerElement: "#section-4",
                offset: bgOffset,
                duration: bgDuration2
            })
            .setTween(bgTimeline2)
            .addTo(scrollMagicController)
            .on("progress", function (e) {
                if(e.progress.toFixed(3) == 0.000){
                    updateNavActiveHandler("#nav-2");
                }else if(e.progress.toFixed(3) <= 0.010){
                    updateNavActiveHandler("#nav-3");
                }
            });

            // Debug indicators
            bgScene2.addIndicators();

            /***********************************************************/
            /********************* Scene 3 *********************/
            /***********************************************************/
            // variables
            var bgDuration3 = $("#section-5").innerHeight() + $("#section-6").innerHeight() * 1;
            // Create Animation
            var bgTween3 = TweenMax.fromTo("#section-6", 1,
            {
                backgroundPosition: "50% 100px"
            },
            {
                backgroundPosition: "50% -200px",
                repeat: 0,
                yoyo: false,
                ease: Power0.easeNone
            });

            // Create Timeline
            var bgTimeline3 = new TimelineMax()
            .add([bgTween3]);

            // Create Scene
            var bgScene3 = new ScrollMagic.Scene({
                triggerElement: "#section-6",
                offset: bgOffset,
                duration: bgDuration3
            })
            .setTween(bgTimeline3)
            .addTo(scrollMagicController);

            // Debug indicators
            bgScene3.addIndicators();

            /***********************************************************/
            /********************* Scene 4 *********************/
            /***********************************************************/
            // variables
            var bgDuration4 = $("#section-7").innerHeight() + $("#section-8").innerHeight() * 1;
            // Create Animation
            var bgTween4 = TweenMax.fromTo("#section-8", 1,
            {
                backgroundPosition: "50% 100px"
            },
            {
                backgroundPosition: "50% -200px",
                repeat: 0,
                yoyo: false,
                ease: Power0.easeNone
            });

            // Create Timeline
            var bgTimeline4 = new TimelineMax()
            .add([bgTween4]);

            // Create Scene
            var bgScene4 = new ScrollMagic.Scene({
                triggerElement: "#section-8",
                offset: bgOffset,
                duration: bgDuration4
            })
            .setTween(bgTimeline4)
            .addTo(scrollMagicController);

            // Debug indicators
            //bgScene4.addIndicators();
}());