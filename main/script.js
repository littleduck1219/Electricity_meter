const header = document.querySelector('#header');
const content = document.querySelector('#content');
const footer = document.querySelector('#footer');

if (header && content && footer) {
  function resize() {
    if (window.innerWidth < 500) {
      header.style.fontSize = '20px';
      content.style.fontSize = '16px';
      footer.style.fontSize = '18px';
    } else {
      header.style.fontSize = '24px';
      content.style.fontSize = '20px';
      footer.style.fontSize = '22px';
    }
  }

  window.onresize = resize;
  resize();
}

$(document).ready(function() {
  $(".menu-button").click(function() {
    var contentId = $(this).attr("data-content-id");
    $(".container-1 > div").hide();
    $("#" + contentId).show();
  });
});

const popupButton = document.querySelector('#popup-button');
const popup = document.querySelector('#popup');
const closeButton = document.querySelector('#close-button');

if (popupButton && popup && closeButton) {
  popupButton.addEventListener('click', () => {
    popup.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

const buttons = document.querySelectorAll('.contract-type-button');

if (buttons.length) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // code to handle button click
    });
  });
}

$('.js-click-modal').click(function(){
  $('.container').addClass('modal-open');
});

$('.js-close-modal').click(function(){
  $('.container').removeClass('modal-open');
});