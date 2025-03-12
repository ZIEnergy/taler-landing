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
          $('body').css('overflow', '');
          $('.intro-video').addClass('is-finished');
          $video.off('timeupdate');
        }
        $('html, body').animate({
          scrollTop: 0
        }, 0);
      });

      /*$video.on('ended', function () {
        $('.hero').addClass("hero--show-bg");
      });*/
    } 
  }
});
