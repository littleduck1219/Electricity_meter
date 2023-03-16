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

window.onload = () => {
  $("#sendbutton").click(() => {
    imagebox = $("#imagebox");
    link = $("#link");
    input = $("#imageinput")[0];
    if (input.files && input.files[0]) {
      let formData = new FormData();
      formData.append("video", input.files[0]);
      $.ajax({
        url: "/detect", // fix this to your liking
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        error: function (data) {
          console.log("upload error", data);
          console.log(data.getAllResponseHeaders());
        },
        success: function (data) {
          console.log(data);
          // bytestring = data["status"];
          // image = bytestring.split("'")[1];
          $("#link").css("visibility", "visible");
          $("#download").attr("href", "static/" + data);
          console.log(data);
        },
      });
    }
  });
};

const buttons = document.querySelectorAll('.contract-type-button');

if (buttons.length) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // code to handle button click
    });
  });
}
