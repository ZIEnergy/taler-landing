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

  $('.menu__list li a').on('click', function(e) {
    var href = $(this).attr('href');
    var isLinkToIndex = href.indexOf('index.html') === 0;
    var hash = href.substring(href.indexOf('#'));
    var $scrollTo = $(hash);

    if (isLinkToIndex && window.location.pathname.indexOf('index.html') === -1) {
      return;
    }

    if( !$scrollTo.length ) return;
    
    e.preventDefault();
    
    var $container = $('html, body');

    $('.menu').fadeOut(500);
    $('body').css('overflow', '');
    $container.animate({
      scrollTop: $scrollTo.offset().top
    }, 500);
  });
});
