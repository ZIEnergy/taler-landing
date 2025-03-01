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
