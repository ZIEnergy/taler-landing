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
