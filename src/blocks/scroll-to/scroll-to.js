jQuery(function ($) {
  $('.js-scroll-to').on('click', function(e) {
    var $scrollTo = $($(this).attr('href'));
    if( !$scrollTo.length ) return;
    e.preventDefault();

    var $container = $('html, body');
    
    /*$container.scrollTop(
      $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
    );*/
    $container.animate({
      scrollTop: $scrollTo.offset().top
    }, 500);
  });
});
