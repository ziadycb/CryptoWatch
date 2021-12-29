jQuery(document).ready(function ($) {

$("body").on("click", "#btnClear", function () {
    var but = $(this);

    if (!$(".dropdown").hasClass("hidesession")) {
      if (!$(this).hasClass("checked")) {
        var get_cls = $(this).attr("class");
        var answer = get_cls.split(" ").pop();
        console.log(answer);

        var postForm = {
          //Fetch form data
          coin: answer,
          add: 1,
        };

        var settings = {
          method: "POST",
          url: "../../BLL/subManager.php",
          data: postForm,
        };

        $.ajax(settings).done(function (data) {
          if (data) {
            but.attr("class", "checked " + but.attr("class"));
          }

          //console.log(result.totalCoins);
        });
      } else {
        var get_cls = but.attr("class");
        var answer = get_cls.split(" ").pop();
        console.log("wohooooooooo");

        var postForm = {
          //Fetch form data
          coin: answer,
          add: 0,
        };

        var settings = {
          method: "POST",
          url: "../../BLL/subManager.php",
          data: postForm,
        };

        $.ajax(settings).done(function (data) {
          if (data) {
            but.removeClass("checked");
          }

          //console.log(result.totalCoins);
        });
      }
    } else {
      $(".main-nav").children("ul").removeClass("is-visible");
      //show modal layer
      $(".cd-user-modal").addClass("is-visible");
      //show the selected form
      $(".cd-user-modal").find("#cd-login").addClass("is-selected");
    }
  });

});