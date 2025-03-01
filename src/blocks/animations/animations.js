var controller = new ScrollMagic.Controller();
var mq = window.matchMedia( "(min-width: 767.98px)" );
var mqMob = window.matchMedia( "(max-width: 768px)" );

jQuery(function ($) {
  if ($('#animate_icon_1').length) {
    if (mq.matches) {
      var animate_icon_1 = new ScrollMagic.Scene({
        triggerElement: "#trigger_animate_icon_1",
        duration: 400
      })
        .setTween("#animate_icon_1", { scale: 1 })
        .addTo(controller);
    }
  }
});
