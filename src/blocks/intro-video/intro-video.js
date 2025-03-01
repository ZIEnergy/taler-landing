jQuery(function ($) {
  $("body").css("overflow", "hidden");
  
  var $video = $(".intro-video video");
  if ($video.length) {
    $video[0].play();

    $video.on("timeupdate", function () {
      console.log(this.currentTime);
      if (this.currentTime >= 1.5) {
        $(".site-content").addClass("show");
      }

      if (this.currentTime >= 2) {
        $(".hero__text").addClass("show");
        $("body").css("overflow", "");
        $video.off("timeupdate");
      }
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    });

    /*$video.on('ended', function () {
      $('.hero').addClass("hero--show-bg");
    });*/
  }
});
