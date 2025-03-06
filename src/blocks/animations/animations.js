var controller = new ScrollMagic.Controller();
var mq = window.matchMedia( "(min-width: 767.98px)" );
var mqMob = window.matchMedia( "(max-width: 768px)" );

jQuery(function ($) {
  if ($('.js-reveal-bottom').length) {
    $('.js-reveal-bottom').each(function (index, node) {
      var that = $(this);
      var $triggerNode = $(that.parents('.js-reveal-parent')[0]).find('.js-reveal-bottom-trigger')[0];
      
      var tween = gsap.fromTo(
        this,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "power2.out" }
      );
      
      new ScrollMagic.Scene({
        triggerElement: $triggerNode,
        triggerHook: 0.8, // show, when scrolled 10% into view
        duration: "80%"
      })
        .setTween(tween)
        // .addIndicators({name: `reveal bottom ${index}`})
        .addTo(controller);
    });
  }

  if ($('.js-reveal-right').length) {
    $('.js-reveal-right').each(function (index, node) {
      var that = $(this);
      var $triggerNode = $(that.parents('.js-reveal-parent')[0]).find('.js-reveal-right-trigger')[0];
      
      var tween = gsap.fromTo(
        this,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, ease: "power2.out" }
      );

      new ScrollMagic.Scene({
        triggerElement: $triggerNode,
        triggerHook: 0.8, // show, when scrolled 10% into view
        duration: "80%",
        offset: 100
      })
        .setTween(tween)
        // .addIndicators({name: `reveal right ${index}`})
        .addTo(controller);
    });
  }

  if ($('.js-video-trigger').length) {
    $('.js-video-trigger').each(function (index, node) {
      var that = $(this);
      var video = $(this).find('.js-video-node')[0];

      var scene = new ScrollMagic.Scene({
        duration: "100%",
        triggerElement: that[0],
        triggerHook: 0.8,
        reverse: false,
      })
        // .addIndicators({name: `video play ${index}`})
        .addTo(controller);
      scene.on("enter", function () {
        // console.log('video enter');
        video.pause();
        video.currentTime = 0.1;
        video.play();
      });
      scene.on("leave", function () {
        // console.log('video leave');
        // video.pause();
        // video.currentTime = 0.1;
      });
    });
  }
});
