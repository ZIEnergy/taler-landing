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

function heroVideoAnimation(imagesCount) {
  // define images
  var images = [];
  var frameCount = imagesCount - 1;
  var sectionHeight = $('.hero')[0].scrollHeight;
  var windowHeight = $(window).height();
  var currentFrame = (index) => `./public/videos/video1/intro_video${index.toString().padStart(3, '0')}.jpg`;

  // Preload images
  var preloadImages = function () {
    for (let i = 0; i <= frameCount; i++) {
      images.push(currentFrame(i));
    }
  };
  preloadImages();

  // build scene
  // TweenMax can tween any property of any object. We use this object to cycle through the array
  var obj = {curImg: 0};

  // create tween
  var tween = TweenMax.to(obj, 0.5,
    {
      curImg: images.length - 1,	// animate propery curImg to number of images
      roundProps: "curImg",				// only integers so it can be used as an array index
      repeat: 0,									// repeat 0 times
      immediateRender: true,			// load first image automatically
      ease: Linear.easeNone,			// show every image the same ammount of time
      onUpdate: function () {
        $(".hero__anim-img").attr("src", images[obj.curImg]); // set the image source
      },
    }
  );

  new ScrollMagic.Scene({
    triggerElement: '.hero',
    duration: sectionHeight - windowHeight,
    triggerHook: 0,
    offset: 0,
  })
    /*.on('progress', function (e) {
      var progress = Math.floor(100 * e.progress); // from 0 to 100
      var state = e.state; // e.g. 'DURING'
      var scrollDirection = e.scrollDirection; // 'FORWARD' or 'REVERSE'
      console.log(state, scrollDirection, progress);

      if (state === 'DURING' && scrollDirection === 'FORWARD') {
        if (progress >= 85) {
          $('.hero__anim-img').fadeOut(500);
        }
      }

      if (state === 'DURING' && scrollDirection === 'REVERSE') {
        if (progress <= 85) {
          $('.hero__anim-img').fadeIn(500);
        }
      }
    })*/
    .setTween(tween)
    // .addIndicators({name: 'image sequence'})
    .addTo(controller);
}

function heroTextReveal() {
  var sectionHeight = $('.hero')[0].scrollHeight;
  var windowHeight = $(window).height();
  var offset = (sectionHeight - windowHeight) / 2.3;
  var duration = (sectionHeight - windowHeight) / 3;

  var tween = gsap.fromTo(
    '.hero__text',
    { opacity: 0, y: '100%' },
    { opacity: 1, y: 0, ease: "power2.out" }
  );

  new ScrollMagic.Scene({
    triggerElement: '.hero',
    triggerHook: 0,
    offset: offset,
    duration: "100%",
  })
    .on('progress', function (e) {
      var progress = Math.floor(100 * e.progress); // from 0 to 100
      var state = e.state; // e.g. 'DURING'
      var scrollDirection = e.scrollDirection; // 'FORWARD' or 'REVERSE'
      // console.log(state, scrollDirection, progress);

      if (state === 'DURING' && scrollDirection === 'FORWARD') {
        if (progress > 8) {
          $('.hero__down').fadeOut(300);
        }
      }

      if (state === 'DURING' && scrollDirection === 'REVERSE') {
        if (progress < 10) {
          $('.hero__down').fadeIn(300);
        }
      }

      if (state === 'AFTER' && scrollDirection === 'FORWARD') {
        if (progress > 8) {
          $('.hero__down').fadeOut(300);
        }
      }
    })
    .setTween(tween)
    // .addIndicators({name: `heroTextReveal`})
    .addTo(controller);
}

function mobileVideoAnimation(imagesCount) {
  // define images
  var images = [];
  var frameCount = imagesCount - 1;
  var sectionHeight = $('.mobile-video__section')[0].scrollHeight;
  var windowHeight = $(window).height();
  var currentFrame = (index) => `./public/videos/video2/video${index.toString().padStart(3, '0')}.jpg`;

  // Preload images
  var preloadImages = function () {
    for (let i = 0; i <= frameCount; i++) {
      images.push(currentFrame(i));
    }
  };
  preloadImages();

  // build scene
  // TweenMax can tween any property of any object. We use this object to cycle through the array
  var obj = {curImg: 0};

  // create tween
  var tween = TweenMax.to(obj, 0.5,
    {
      curImg: images.length - 1,	// animate propery curImg to number of images
      roundProps: "curImg",				// only integers so it can be used as an array index
      repeat: 0,									// repeat 0 times
      immediateRender: true,			// load first image automatically
      ease: Linear.easeNone,			// show every image the same ammount of time
      onUpdate: function () {
        $(".mobile-video__video-wrapper img").attr("src", images[obj.curImg]); // set the image source
      },
    }
  );

  new ScrollMagic.Scene({
    triggerElement: '.mobile-video__section',
    duration: sectionHeight - windowHeight,
    triggerHook: 0,
    offset: 0,
  })
    .setTween(tween)
    // .addIndicators({name: 'mobile-video sequence'})
    .addTo(controller);
}

jQuery(function ($) {
  let loadedImages = 0;
  let totalImages = 0;
  let videoImages1 = 0;
  let videoImages2 = 0;

  function updateProgress(data) {
    let percent = Math.floor((loadedImages / totalImages) * 100);
    $(".preloader__bar-filler").css("width", percent + "%");

    if (loadedImages === totalImages) {
      $("#preloader").fadeOut(500, function () {
        $("#siteContent").css("visibility", "visible");
        $('body').css('overflow', '');
        heroVideoAnimation(videoImages1);
        mobileVideoAnimation(videoImages2);
        heroTextReveal();
      });
    }
  }

  function isImageCached(src) {
    let img = new Image();
    img.src = src;

    return img.complete && img.naturalHeight !== 0; // Cached if true
  }

  function preloadImages(folders) {
    totalImages = folders.totalImages;
    videoImages1 = folders.imagesPerFolder.folder1;
    videoImages2 = folders.imagesPerFolder.folder2;
    let folderPaths = ["video1", "video2"];

    folderPaths.forEach((folder, index) => {
      let count = folders.imagesPerFolder[`folder${index + 1}`] || 0;

      for (let i = 0; i <= count - 1; i++) {
        let imgPath;
        if (folder === 'video1') {
          imgPath = `./public/videos/${folder}/intro_video${String(i).padStart(3, '0')}.jpg`;
        } else {
          imgPath = `./public/videos/${folder}/video${String(i).padStart(3, '0')}.jpg`;
        }

        if (isImageCached(imgPath)) {
          loadedImages++;
          updateProgress(folders);
        } else {
          let img = new Image();
          img.src = imgPath;

          img.onload = img.onerror = function () {
            loadedImages++;
            updateProgress(folders);
          };
        }
      }
    });
  }

  // Fetch totalImages from config.json
  if ($('.hero').length) {
    $.getJSON('./public/config.json', function (data) {
      preloadImages(data);
    }).fail(function () {
      console.error("Failed to load config.json");
    });
  }
});

jQuery(function ($) {

  if (!$.cookie('cookiesAccepted') || $.cookie('cookiesAccepted') === 'false') {
    $('.cookie-banner').fadeIn(300);
  }
  
  $('#accept-cookies').on('click', function (e) {
    e.preventDefault();
    $.cookie('cookiesAccepted', 'true', { expires: 365, path: '/' });
    $('.cookie-banner').fadeOut(300);
  });

  $('#reject-cookies').on('click', function (e) {
    e.preventDefault();
    $.cookie('cookiesAccepted', 'false', { expires: 365, path: '/' });
    $('.cookie-banner').fadeOut(300);
  });
  
});

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

jQuery(function ($) {
  $('.dropdown__selected').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.dropdown__drop-list').fadeToggle(300);
    $(this).parent().toggleClass('is-open');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).hasClass('dropdown') && $(e.target).parents('.dropdown').length === 0) {
      $('.dropdown__drop-list').fadeOut(300);
      $('.dropdown').removeClass('is-open');
    }
  });
});

jQuery(function ($) {

  $('.faq__question').on('click', function(e) {
    e.preventDefault();
    if ($(this).parent().hasClass('is-open')) {
      $(this).parent().removeClass('is-open');
      $(this).next().slideUp({
        duration: 500,
        start: function() {
          $(this).find('.faq__answer-wrapper').css('opacity', '0');
        }
      });
    } else {
      $(this).parent().addClass('is-open');
      $(this).next().slideDown({
        duration: 500,
        // complete: function() {
        //   $(this).find('.faq__answer-wrapper').css('opacity', '1');
        // },
        progress: function(animation, progress, remainingMs) {
          if (remainingMs < 100) {
            $(this).find('.faq__answer-wrapper').css('opacity', '1');
          }
        }
      });
    }
  });

});

/*
jQuery(function ($) {
  var $video = $('.intro-video video');
  var searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('options') && searchParams.get('options') === 'skip-intro') {
    $('body').removeClass('with-intro');
    $('body').css('overflow', '');
    $('.intro-video').addClass('is-finished');
    $('.hero__text').addClass('show');
    $(".site-content").addClass("show");
    if ($video.length) {
      $video[0].play();
    }
  } else {
    $('body.with-intro').css('overflow', 'hidden');
    if ($video.length) {
      $video[0].play();

      $video.on('timeupdate', function () {
        // console.log(this.currentTime);
        if (this.currentTime >= 1.5) {
          $(".site-content").addClass("show");
        }

        if (this.currentTime >= 2) {
          $('.hero__text').addClass('show');
          // $('body').css('overflow', '');
          $('.intro-video').addClass('is-finished');
          $video.off('timeupdate');
        }
        $('html, body').animate({
          scrollTop: 0
        }, 0);
      });

      $video.on('ended', function () {
        $('.hero').addClass("hero--show-bg");
      });
    } 
  }
});
*/

jQuery(function ($) {
});

jQuery(function ($) {
  $('.header__burger').on('click', function (e) {
    e.preventDefault();
    $('.menu').fadeIn(500);
    $('body').css('overflow', 'hidden');
  });
  $('.menu__burger').on('click', function (e) {
    e.preventDefault();
    $('.menu').fadeOut(500, function() {
      $('body').css('overflow', '');
    });
  });

  $('.menu__list:not(.no-scroll) li a').on('click', function(e) {
    e.preventDefault();

    var $container = $('html, body'),
      $scrollTo = $($($(this).attr('href')));

    $('.menu').fadeOut(500);
    $('body').css('overflow', '');
    $container.animate({
      scrollTop: $scrollTo.offset().top
    }, 500);
  });
});

jQuery(function ($) {
  $('.lang-switcher__current').on('click', function (e) {
    e.preventDefault();
    $('.header__overlay').fadeToggle(300);
    $('.lang-switcher__dropdown').fadeToggle({
      duration: 300,
      start: function () {
        if ($(this).is(':visible')) {
          $(this).css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          });
        }
      }
    });
  });

  $(document).on('click', function (e) {
    if (!$(e.target).hasClass('lang-switcher') && $(e.target).parents('.lang-switcher').length === 0) {
      $('.lang-switcher__dropdown').fadeOut(300);
      $('.header__overlay').fadeOut(300);
    }
  });
});



jQuery(function ($) {
  $('.js-scroll-to').on('click', function(e) {
    e.preventDefault();

    var $container = $('html, body'),
      $scrollTo = $($($(this).attr('href')));
    
    /*$container.scrollTop(
      $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
    );*/
    $container.animate({
      scrollTop: $scrollTo.offset().top
    }, 500);
  });
});
