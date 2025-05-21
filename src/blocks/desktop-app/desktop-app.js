jQuery(function ($) {
});

function desktopAppHeightHandler(height) {
  if (height) {
    $('.desktop-app').height(height);
  }
}

$(window).on('load', function () {
  var controller = new ScrollMagic.Controller();
  var mq = window.matchMedia( "(min-width: 767.98px)" );
  var mqMob = window.matchMedia( "(max-width: 768px)" );
  var $desktopAppWrapper = $('.desktop-app__wrapper');
  var $desktopApp = $('.desktop-app');
  var windowHeight = $(window).height();
  var sectionHeight = $desktopAppWrapper.height();
  var animClasses = ['first-trigger', 'second-trigger'];
  
  desktopAppHeightHandler($('.desktop-app__img--1').height());

  new ScrollMagic.Scene({
    triggerElement: $desktopAppWrapper[0],
    triggerHook: 0,
    duration: sectionHeight - windowHeight
  })
    .on('progress', function (e) {
      var progress = Math.floor(100 * e.progress); // from 0 to 100
      var state = e.state; // e.g. 'DURING'
      var scrollDirection = e.scrollDirection; // 'FORWARD' or 'REVERSE'
      // console.log(progress, state, scrollDirection);
      
      if (state === 'DURING' && scrollDirection === 'FORWARD') {
        if (progress > 10) {
          $('#desktop-app-heading').fadeOut(300);
        }
        if (progress > 20 && progress < 60) {
          // console.log('FORWARD: first animation');
          animClasses.forEach(function (animClass) {
            $desktopApp.removeClass(animClass);
          });
          $desktopApp.addClass(animClasses[0]);
        }
        if (progress > 60 && progress < 100) {
          // console.log('FORWARD: second animation');
          animClasses.forEach(function (animClass) {
            $desktopApp.removeClass(animClass);
          });
          $desktopApp.addClass(animClasses[1]);
        }
      }

      if (state === 'DURING' && scrollDirection === 'REVERSE') {
        if (progress < 10) {
          $('#desktop-app-heading').fadeIn(300);
        }
        if (progress < 20) {
          animClasses.forEach(function (animClass) {
            $desktopApp.removeClass(animClass);
          });
        }
        if (progress < 60 && progress > 20) {
          // console.log('REVERSE: first animation');
          animClasses.forEach(function (animClass) {
            $desktopApp.removeClass(animClass);
          });
          $desktopApp.addClass(animClasses[0]);
        }
        if (progress < 100 && progress > 60) {
          // console.log('REVERSE: second animation');
          animClasses.forEach(function (animClass) {
            $desktopApp.removeClass(animClass);
          });
          $desktopApp.addClass(animClasses[1]);
        }
      }
    })
    // .setTween(tween)
    // .addIndicators({name: "desktop-app"})
    .addTo(controller);
});

$(window).on('resize', function () {
  desktopAppHeightHandler($('.desktop-app__img--1').height());
});
