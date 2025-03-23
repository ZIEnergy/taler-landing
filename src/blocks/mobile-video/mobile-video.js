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
    // .addIndicators({name: 'mobile-video sequence'})
    .addTo(controller);
}

jQuery(function ($) {
  let loadedImages = 0;
  let totalImages = 0;
  let videoImages2 = 0;

  function updateProgress(data) {
    if (loadedImages === videoImages2) {
      mobileVideoAnimation(videoImages2);
    }
  }

  function isImageCached(src) {
    let img = new Image();
    img.src = src;

    return img.complete && img.naturalHeight !== 0; // Cached if true
  }

  function preloadImages(folders) {
    totalImages = folders.totalImages - folders.imagesPerFolder.folder1;
    videoImages2 = folders.imagesPerFolder.folder2;
    let folderPaths = ["video2"];

    folderPaths.forEach((folder, index) => {
      let count = folders.imagesPerFolder['folder2'] || 0;

      for (let i = 0; i <= count - 1; i++) {
        let imgPath = `./public/videos/${folder}/video${String(i).padStart(3, '0')}.jpg`;

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
  if ($('.mobile-video').length) {
    $.getJSON('./public/config.json', function (data) {
      preloadImages(data);
    }).fail(function () {
      console.error("Failed to load config.json");
    });
  }
});
