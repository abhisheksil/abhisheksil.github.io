(function(){

            /***********************************************************/
            /********************* Variables *********************/
            /***********************************************************/
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            $(".elem-pos-absolute-center").each(function(index, elem){
                var elem = $(this);
                var parentElem = elem.parent();
                
                var elemWidth = 257;
                var parentElemWidth = parentElem.innerWidth();
                var leftMargin = (parentElemWidth - elemWidth) * 0.5;

                elem.css({ 'margin-left':leftMargin });
            });

            if(winWidth>992){
                $("body,html").niceScroll({cursorcolor: "#000",cursorborder: "0px",railpadding: {right:0},scrollspeed: 100,mousescrollstep: 15,cursorwidth: "8px",autohidemode: false,zindex:12});
            }



            /***********************************************************/
            /********************* Col-Height-Module *********************/
            /***********************************************************/
            $(window).load(function(e) {
                setParentRowHeightHandler();
            });
            $(window).resize(function(e) {
                setParentRowHeightHandler();
            });
            function setParentRowHeightHandler(){
                $(".set-parent-row-height").each(function(index, element) {
                    var col = $(this);
                    var parentRow = col.parent(".row");
                    var rowHeight = parentRow.innerHeight();
                    var winWidth = $(window).width();
                    
                    if(winWidth >= 992){
                        col.css({height:rowHeight});
                    }else{
                        col.css({height:"auto"});
                    }
                });
            }
            setParentRowHeightHandler();



            /***********************************************************/
            /********************* Init *********************/
            /***********************************************************/
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
            if(isMobile.any() || winWidth <= 991){
                return false;
            }




            /***********************************************************/
            /********************* Init Controller *********************/
            /***********************************************************/
            var scrollMagicController = new ScrollMagic.Controller({
                container: '#wrapper-sections'
            });





            /***********************************************************/
            /********************* Scene 1 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween1 = TweenMax.fromTo("#trigger-section-1 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween1 = TweenMax.fromTo("#trigger-section-1 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var mobileBackFaceTween = TweenMax.fromTo("#trigger-section-1 .shot-mobile-back-face", 0.5,
            {
                left: '0%'
            },
            {
                left: '-10%'
            });
            var mobileFrontFaceTween = TweenMax.fromTo("#trigger-section-1 .shot-mobile-front-face", 0.5,
            {
                left: '0%'
            },
            {
                left: '10%'
            });            

            // Create Timeline
            var copyTimeline1 = new TimelineMax()
            .add([headingTween1, descriptionTween1]);

            var imgTimeline1 = new TimelineMax()
            .add([mobileBackFaceTween, mobileFrontFaceTween]);


            // Create Scene
            var copyScene1 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-1",
                offset: '20%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline1)
            .addTo(scrollMagicController);

            var imgScene1 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-1",
                offset: '20%'
            })
            .setTween(imgTimeline1)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene1.addIndicators();
            //imgScene1.addIndicators();





            /***********************************************************/
            /********************* Scene 2 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween2 = TweenMax.fromTo("#trigger-section-2 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1
            });
            var descriptionTween2 = TweenMax.fromTo("#trigger-section-2 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1
            });
            var threeListingTween2 = TweenMax.fromTo("#trigger-section-2 .three-listing > ul > li > img", 1,
            {
                opacity: 0,
                scale: 0,
                rotation: 0
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var threeListingCopy2 = TweenMax.fromTo("#trigger-section-2 .three-listing > ul > li > p", 1,
            {
                bottom: -20,
                opacity: 0,
                rotation:0,
            },
            {
                bottom:0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */

            });
            var mobileShotTween2 = TweenMax.fromTo("#trigger-section-2 .mobile-shot", 0.5,
            {
                bottom: -250
            },
            {
                bottom: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            // Create Timeline
            var copyTimeline2 = new TimelineMax()
            .add([headingTween2, descriptionTween2, threeListingTween2, threeListingCopy2]);


            // Create Scene
            var copyScene2 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-2",
                offset: '100%'
            })
            .setTween(copyTimeline2)
            .addTo(scrollMagicController);

            var imgScene2 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-2",
                duration: (winHeight * 0.8)
            })
            .setTween(mobileShotTween2)
            .addTo(scrollMagicController);


            // Debug indicators
            //copyScene2.addIndicators();
            //imgScene2.addIndicators();



            /***********************************************************/
            /********************* Scene 3 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween3 = TweenMax.fromTo("#trigger-section-3 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween3 = TweenMax.fromTo("#trigger-section-3 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingTween3 = TweenMax.fromTo("#trigger-section-3 .three-listing > ul > li > img", 1,
            {
                opacity: 0,
                scale: 0,
                rotation:0,
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingCopy3 = TweenMax.fromTo("#trigger-section-3 .three-listing > ul > li > p", 1,
            {
                bottom:-20,
                opacity: 0,
                rotation:0,
            },
            {
                bottom:0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */

            });

            // Create Timeline
            var copyTimeline3 = new TimelineMax()
            .add([headingTween3, descriptionTween3, threeListingTween3, threeListingCopy3]);

            // Create Image Timeline
            TweenMax.set("#trigger-section-3 .listing-img-container", {css:{transformPerspective:800, perspective:800, transformStyle:"preserve-3d"}});
            var imgTimeline3 = TweenMax.fromTo("#trigger-section-3 .listing-img-container", 3,
            {
                y: 40,
                rotationY: -30
            },
            {
                y: 40,
                rotationY: 30,
                repeat: 1, /* -1 = aka an infinite amount of repeats */
                yoyo: true /* true = make it go back and forth or not */

            });

            // Create Scene
            var copyScene3 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-3",
                offset: '-50%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline3)
            .addTo(scrollMagicController);

            var imgScene3 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-3",
                duration: (winHeight * 1.2)
            })
            .setTween(imgTimeline3)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene3.addIndicators();
            //imgScene3.addIndicators();


            /***********************************************************/
            /********************* Scene 4 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween4 = TweenMax.fromTo("#trigger-section-4 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween4 = TweenMax.fromTo("#trigger-section-4 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingTween4 = TweenMax.fromTo("#trigger-section-4 .three-listing > ul > li > img", 1,
            {
                opacity: 0,
                scale: 0,
                rotation:0,
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingCopy4 = TweenMax.fromTo("#trigger-section-4 .three-listing > ul > li > p", 1,
            {
                bottom:-20,
                opacity: 0,
                rotation:0,
            },
            {
                bottom:0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */

            });

            // Create Timeline
            var copyTimeline4 = new TimelineMax()
            .add([headingTween4, descriptionTween4, threeListingTween4, threeListingCopy4]);

            // Create Scene
            var copyScene4 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-4 .anim-heading",
                offset: '0%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline4)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene4.addIndicators();


            /***********************************************************/
            /********************* Scene 5 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween5 = TweenMax.fromTo("#trigger-section-5 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween5 = TweenMax.fromTo("#trigger-section-5 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });


            var threeListingTween5 = TweenMax.fromTo("#trigger-section-5 .three-listing > ul > li > img", 1,
            {
                opacity: 0,
                scale: 0,
                rotation:0,
            },
            {
                opacity: 1,
                scale: 1,
                rotation:0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingCopy5 = TweenMax.fromTo("#trigger-section-5 .three-listing > ul > li > p", 1,
            {
                bottom:-20,
                opacity: 0,
                rotation:0,
            },
            {
                bottom:0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */

            });

            var mobileBackFaceTween5 = TweenMax.fromTo("#trigger-section-5 .shot-mobile-back-face", 0.5,
            {
                left: '0%'
            },
            {
                left: '-10%'
            });
            var mobileFrontFaceTween5 = TweenMax.fromTo("#trigger-section-5 .shot-mobile-front-face", 0.5,
            {
                left: '0%'
            },
            {
                left: '20%'
            });            

            // Create Timeline
            var copyTimeline5 = new TimelineMax()
            .add([headingTween5, descriptionTween5, threeListingTween5, threeListingCopy5]);

            var imgTimeline5 = new TimelineMax()
            .add([mobileBackFaceTween5, mobileFrontFaceTween5]);

            // Create Scene
            var copyScene5 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-5 .anim-heading",
                offset: '0%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline5)
            .addTo(scrollMagicController);

            var imgScene5 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-5",
                duration: (winHeight * 0.8)
            })
            .setTween(imgTimeline5)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene5.addIndicators();
            //imgScene5.addIndicators();


            /***********************************************************/
            /********************* Scene 6 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween6 = TweenMax.fromTo("#trigger-section-6 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween6 = TweenMax.fromTo("#trigger-section-6 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var threeListingTween6 = TweenMax.fromTo("#trigger-section-6 .three-listing > ul > li > img", 1,
            {
                opacity: 0,
                scale: 0,
                rotation:0,
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var threeListingCopy6 = TweenMax.fromTo("#trigger-section-6 .three-listing > ul > li > p", 1,
            {
                bottom:-20,
                opacity: 0,
                rotation:0,
            },
            {
                bottom:0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */

            });
            var mobileShotTween6 = TweenMax.fromTo("#trigger-section-6 .mobile-shot", 0.5,
            {
                bottom: -300
            },
            {
                bottom: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            // Create Timeline
            var copyTimeline6 = new TimelineMax()
            .add([headingTween6, descriptionTween6, threeListingTween6, threeListingCopy6]);

            // Create Scene
            var copyScene6 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-6 .anim-heading",
                offset: '0%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline6)
            .addTo(scrollMagicController);

            var imgScene6 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-6",
                duration: (winHeight * 1)
            })
            .setTween(mobileShotTween6)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene6.addIndicators();
            //imgScene6.addIndicators();


            /***********************************************************/
            /********************* Scene 7 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween7 = TweenMax.fromTo("#trigger-section-7 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween7 = TweenMax.fromTo("#trigger-section-7 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingTween7 = TweenMax.fromTo("#trigger-section-7 .three-listing > ul > li > img", 1,
            {
                opacity: 0,
                scale: 0,
                rotation:0,
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });

            var threeListingCopy7 = TweenMax.fromTo("#trigger-section-7 .three-listing > ul > li > p", 1,
            {
                bottom:-20,
                opacity: 0,
                rotation:0,
            },
            {
                bottom:0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */

            });

            
            // Create Timeline
            var copyTimeline7 = new TimelineMax()
            .add([headingTween7, descriptionTween7, threeListingTween7, threeListingCopy7]);

            // Create Scene
            var copyScene7 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-7 .anim-heading",
                offset: '0%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline7)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene7.addIndicators();


            /***********************************************************/
            /********************* Scene 8 *********************/
            /***********************************************************/
            // Create Animation
            var headingTween8 = TweenMax.fromTo("#trigger-section-8 .anim-heading", 1,
            {
                left: 70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var descriptionTween8 = TweenMax.fromTo("#trigger-section-8 .anim-copy", 1,
            {
                left: -70,
                opacity: 0
            },
            {
                left: 0,
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var knowMoreBtn8 = TweenMax.fromTo("#trigger-section-8 .component-content a", 0.2,
            {
                opacity: 0,

            },
            {
                opacity: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });
            var mobileShotTween8 = TweenMax.fromTo("#trigger-section-8 .mobile-shot", 0.5,
            {
                scale: 0.7
            },
            {
                scale: 1,
                repeat: 0, /* -1 = aka an infinite amount of repeats */
                yoyo: false /* true = make it go back and forth or not */
            });


            // Create Timeline
            var copyTimeline8 = new TimelineMax()
            .add([headingTween8, descriptionTween8, knowMoreBtn8]);

            // Create Scene
            var copyScene8 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-8 .anim-heading",
                offset: '0%'  /*offset the trigger 150px below #scene's top */
                /*duration: 500  How many pixels to scroll / animate */
            })
            .setTween(copyTimeline8)
            .addTo(scrollMagicController);

            var imgScene8 = new ScrollMagic.Scene({
                triggerElement: "#trigger-section-8",
                duration: (winHeight * 0.3)
            })
            .setTween(mobileShotTween8)
            .addTo(scrollMagicController);

            // Debug indicators
            //copyScene8.addIndicators();
            //imgScene8.addIndicators();


}());