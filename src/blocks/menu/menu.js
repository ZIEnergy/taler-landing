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
});
