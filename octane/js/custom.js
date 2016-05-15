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


            /***********************************************************/
            /********************* Nice Scroll-Module *********************/
            /***********************************************************/
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
                if(winWidth >= 992){
                    aTags.eq(0).trigger("click");
                }
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
            var sectionData = [{ topDiagonal: 0, bottomDiagonal: 135, parallax: false },
            { topDiagonal: 0, bottomDiagonal: 0, parallax: true },
            { topDiagonal: 130, bottomDiagonal: 130, parallax: false },
            { topDiagonal: 0, bottomDiagonal: 0, parallax: true },
            { topDiagonal: 170, bottomDiagonal: 160, parallax: false },
            { topDiagonal: 0, bottomDiagonal: 0, parallax: true },
            { topDiagonal: 196, bottomDiagonal: 180, parallax: false },
            { topDiagonal: 0, bottomDiagonal: 0, parallax: true },
            { topDiagonal: 132, bottomDiagonal: 160, parallax: false },
            { topDiagonal: 0, bottomDiagonal: 0, parallax: false }];

            $(window).load(function(e) {
                manageSectionHandler();
            });
            $(window).resize(function(e) {
                manageSectionHandler();
            });
            manageSectionHandler();

            /*
            1) check topDiagonal & bottomDiagonal space in 1920
            2) covert it as per 2800 : (diagonal space * 2800 / 1920)
            3) set value in "sectionData" array
            4) run a function and check each section
            5) set section & content-wrapper height : auto
            6) set section height, content position & content height
            7) section bg image
                1) desktop/tablet view - bg image with diagonal cut and without content
                2) mobile view - bg image only a division strip image and background-color
                3) make content position according to design
            8) parallax-section bg image
                1) full rectangle shape
                2) desktop/tablet view - 1920x1200 dimension without text
                3) mobile view - 768x480 dimension with text
            */
            function manageSectionHandler(){
                var winWidth = $(window).width();
                var winHeight = $(window).height();
                var sections = $("section");

                sections.css({'height':'auto'});
                sections.children(".content-wrapper").css({'height':'auto'});

                $("section").each(function(index, elem){
                    var section = $(this);
                    var contentWrapper = section.children('.content-wrapper');
                    var secData = sectionData[index];
                    var secPrevData = sectionData[index-1];
                    var secNextData = sectionData[index+1];

                    var parallax = secData.parallax;
                    var topDiagonal = Math.floor(secData.topDiagonal * 2800 / 1920);
                    topDiagonal = Math.floor(topDiagonal * winWidth / 2800);
                    var bottomDiagonal = Math.floor(secData.bottomDiagonal * 2800 / 1920);
                    bottomDiagonal = Math.floor(bottomDiagonal * winWidth / 2800);
                    
                    var height = Math.floor(winWidth * 1750 / 2800);
                    var contentHeight = height - topDiagonal - bottomDiagonal;

                    if(winWidth >= 768 && index != 9){
                        section.css({'height':height});
                        contentWrapper.css({'top':topDiagonal, 'height':contentHeight});
                        // section margin-top
                        if(parallax == false){
                            sections.eq(index).css({'margin-top':-topDiagonal});
                            sections.eq(index+1).css({'margin-top':-bottomDiagonal});
                        }
                    }else if(winWidth <= 767 && section.hasClass('section-parallax')){
                        section.css({'height':height});
                        contentWrapper.css({'top':0, 'height':height});
                    }
                });
            }


            /***********************************************************/
            /********************* Height Responsive - Module *********************/
            /***********************************************************/
            function scaleContentByHeight(percent, elem, elemWidth, elemHeight){
                var winWidth = $(window).width();
                var targetHeight = Math.floor(winWidth * 1750 / 2800);
                var percentageScale = Math.floor(targetHeight * percent / 100);
                var totalHeight = targetHeight + percentageScale;
                var totalWidth = Math.floor(totalHeight * elemWidth / elemHeight);

                var leftOffset =  Math.floor((totalWidth - winWidth) * -0.5);
                leftOffset = (leftOffset >= 0) ? 0 : leftOffset;
                $(elem).css({'height':totalHeight});
                $(elem).css({'left':leftOffset});

                return {'percentageScale':-percentageScale};
            }
            var obj1 = scaleContentByHeight(0, "#bg-element-1", 536, 336);
            var obj2 = scaleContentByHeight(0, "#bg-element-2", 536, 336);



            /***********************************************************/
            /********************* Init Controller *********************/
            /***********************************************************/
            if(isMobile.any() || winWidth <= 991){
                $('#bg-element-1')[0].play();
                $('#bg-element-2')[0].play();
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
                    //updateNavActiveHandler("#nav-1");
                }else if(e.progress.toFixed(3) <= 0.010){
                    //updateNavActiveHandler("#nav-2");
                }
            });

            // Debug indicators
            // bgScene1.addIndicators();

            /***********************************************************/
            /********************* Scene 2 *********************/
            /***********************************************************/
            // variables
            var bgDuration2 = $("#section-3").innerHeight() + $("#section-4").innerHeight() * 1;
            // Create Animation
            var bgTween2 = TweenMax.fromTo("#bg-element-1", 1,
            {
                top: 0
            },
            {
                top: obj1.percentageScale,
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
            .on("enter", function (e) {
                $('#bg-element-1')[0].play();
            })
            .on("leave", function (e) {
                $('#bg-element-1')[0].pause();
            })
            .on("progress", function (e) {
                if(e.progress.toFixed(3) == 0.000){
                    //updateNavActiveHandler("#nav-2");
                }else if(e.progress.toFixed(3) <= 0.010){
                    //updateNavActiveHandler("#nav-3");
                }
            });

            // Debug indicators
            // bgScene2.addIndicators();

            /***********************************************************/
            /********************* Scene 3 *********************/
            /***********************************************************/
            // variables
            var bgDuration3 = $("#section-5").innerHeight() + $("#section-6").innerHeight() * 1;
            // Create Animation
            var bgTween3 = TweenMax.fromTo("#bg-element-2", 1,
            {
                top: 0
            },
            {
                top: obj2.percentageScale,
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
            .addTo(scrollMagicController)
            .on("enter", function (e) {
                $('#bg-element-2')[0].play();
            })
            .on("leave", function (e) {
                $('#bg-element-2')[0].pause();
            });

            // Debug indicators
            // bgScene3.addIndicators();

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