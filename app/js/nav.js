$(document).ready(function() {
  $('.menu__link').on('click', function(e) {
    e.preventDefault();

    var section = $(this).attr('href');

    showSection(section, true);
  });

  showSection(window.location.hash, false); //запускаем функцию без анимации, если уже есть href
});

$(window).scroll(function(){
  checkSection()
});

function showSection(section, isAnimate) {
  var direction = section.replace(/#/, ''),
      reqSection = $('section').filter('[data-section="' + direction + '"]'), //для проверки соответствия href и data-section
      reqSectionPos = reqSection.offset().top; //верхний край нужной section

  if (isAnimate) {
    // $('body, html').scrollTop(reqSectionPos);
    $('body, html').animate({scrollTop: reqSectionPos}, 1000); //анимируем действия "вдивую"
  } else {
    $('body, html').scrollTop(reqSectionPos); //если открывается ссылка уже с добавленным href
  }
}

function checkSection(){
  $('.section').each(function() {
    var $this = $(this),
        topEdge = $this.offset().top - 100,
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();

    if (topEdge <= wScroll && bottomEdge > wScroll) { //видим искомую секцию
      var currentId = $this.data('section');
          reqLink = $('.menu__link').filter('[href="#' + currentId + '"]');

      reqLink.closest('.menu__item').addClass('menu__item--current')
        .siblings().removeClass('menu__item--current');

      window.location.hash = currentId;
    }
  });
}
