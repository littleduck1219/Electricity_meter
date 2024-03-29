$(document).ready(function() {
  $(".menu-button").click(function() {
    var contentId = $(this).data("content-id");
    $(".main-title").hide();
    $(".content-container > div").hide();
    $("#" + contentId).show();
    $("#all-calculate").hide();
  });

  $(".calculate-btn-go").click(function() {
    let formData = new FormData();
    let image1 = $("input[name='image1']")[0].files[0];
    let image2 = $("input[name='image2']")[0].files[0];

    formData.append("image1", image1);
    formData.append("image2", image2);

    $.ajax({
      url: "/detect_images",
      type: "POST",
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function(response) {
        const label_float1 = response.label_float1;
        const label_float2 = response.label_float2;
        console.log("Label float 1:", label_float1);
        console.log("Label float 2:", label_float2);

        // Calculate label_kwh and set input value
        const label_kwh = (label_float1 - label_float2).toFixed(2);
        $("input[name='usage']").val(label_kwh);

        // Update label_float1 and label_float2 values in HTML
        if (label_float1) {
          $("#label-float-1").text("Label float 1: " + label_float1);
        }
        if (label_float2) {
          $("#label-float-2").text("Label float 2: " + label_float2);
        }

        $("#content1").hide();
        $("#all-calculate").show();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
      }
    });
  });
});
