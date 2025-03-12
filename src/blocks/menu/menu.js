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
