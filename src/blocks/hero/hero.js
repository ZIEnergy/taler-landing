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
    .setTween(tween)
    // .addIndicators({name: `heroTextReveal`})
    .addTo(controller);
}

jQuery(function ($) {
  let loadedImages = 0;
  let totalImages = 0;
  let videoImages1 = 0;

  function updateProgress(data) {
    if (loadedImages === videoImages1) {
      heroVideoAnimation(videoImages1);
    }
  }
  
  function isImageCached(src) {
    let img = new Image();
    img.src = src;

    return img.complete && img.naturalHeight !== 0; // Cached if true
  }

  function preloadImages(folders) {
    totalImages = folders.totalImages
    videoImages1 = folders.imagesPerFolder.folder1;
    let folderPaths = ["video1"];

    folderPaths.forEach((folder, index) => {
      let count = folders.imagesPerFolder[`folder${index + 1}`] || 0;

      for (let i = 0; i <= count - 1; i++) {
        let imgPath = `./public/videos/${folder}/intro_video${String(i).padStart(3, '0')}.jpg`;

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

  heroTextReveal();
  
  // Fetch totalImages from config.json
  if ($('.hero').length) {
    $.getJSON('./public/config.json', function (data) {
      preloadImages(data);
    }).fail(function () {
      console.error("Failed to load config.json");
    });
  }
});
