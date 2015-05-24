$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('.content');
   var offset = startchange.offset();
    if (startchange.length){
      $(document).scroll(function() { 
        scroll_start = $(this).scrollTop();
        if(scroll_start > offset.top) {
          $(".navbar").addClass("nav-shadow");
        }
        else {
          $(".navbar").removeClass("nav-shadow");
        }
      });
    }
    $(".ingredients-list").each(function( index ) {
      if ($(this).height() > 20) {
        $(this).css("overflow-y", "hidden");
        $(this).css("height", "20px");
        $(this).parent().append("<p class='more'>See More...</p>");
      }
      else {
        $(this).css("padding-bottom", "27px");
      }
    })
    var expanded = false;
    $(".more").click(function() {
      if (expanded) {
        $(this).parent().children(".ingredients-list").css("overflow-y", "hidden");
        $(this).parent().children(".ingredients-list").css("height", "20px");
        $(this).empty().html("See More...");
        expanded = false;
      }
      else {
        $(this).parent().children(".ingredients-list").css("overflow-y", "visible");
        $(this).parent().children(".ingredients-list").css("height", "auto");
        $(this).empty().html("See Less...");
        expanded = true;
      }
    });
    var current = 0;
    var type;
    var select = false;
    var selection;
    $(".next").click(function() {
      $(".noSelect").remove();
      $(".choice").each(function() {
        if (current == 0) {
          $(".choice").each(function() {
            if ($(this).hasClass("selected")) {
              select = true;
              selection = $(this).attr("id");
            }
          });
        }
        else {
          $(".choice").each(function() {
            if ($(this).hasClass("selected")) {
              select = true;
            }
          });
        }
        if (select && current == 0) {
          if (selection == "roll") {
            current+=2;
            next(current);
          }
          else {
            typeOfSandwich(selection);
            current++;
            select = false;
          }
          return false;
        }
        else if (select) {
          current++;
          next(current);
          select = false;
          return false;
        }
        else {
          $(this).parent().append("<p class='noSelect'>Please make a selection.</p>");
        }
      });
    });
    $(".previous").click(function() {
      $(".noSelect").remove();
      current--;
      next(current);
    });
    $(".choice").click(function() {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
      }
      else {
        $(".choice").each(function() {
          $(this).removeClass("selected");
        });
        $(this).addClass("selected");
      }
    });
});
function next(current) {
  $(".choice").each(function() {
    $(this).removeClass("selected");
  });
  if (current == 0) {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero");
        $(this).children("p").html("Hero");
      }
      else if(index == 1) {
        $(this).attr("id", "classic");
        $(this).children("p").html("Classic Sandwich");
      }
      else if(index == 2) {
        $(this).attr("id", "burger");
        $(this).children("p").html("Hamburger");
      }
      else if(index == 3) {
        $(this).attr("id", "bagel");
        $(this).children("p").html("Bagel");
        $(this).css("display", "block");
      }
      else if(index == 4) {
        $(this).attr("id", "roll");
        $(this).children("p").html("Roll");
        $(this).css("display", "block");
      }
    });
  }
  else if (current == 2) {
  }
  else if (current == 3) {
  }
  else if (current == 4) {
  }
}
function typeOfSandwich(selection) {
  $(".choice").each(function() {
    $(this).removeClass("selected");
  });
  $(".previous").removeClass("noShow");
  if (selection == "hero") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero-italian");
        $(this).children("p").html("Italian");
      }
      else if(index == 1) {
        $(this).attr("id", "hero-wheat");
        $(this).children("p").html("Whole Wheat");
      }
      else if(index == 2) {
        $(this).attr("id", "hero-flatbread");
        $(this).children("p").html("Flatbread");
      }
      else if(index == 3) {
        $(this).css("display", "none");
      }
      else if(index == 4) {
        $(this).css("display", "none");
      }
    });
  }
  else if (selection == "classic") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero-italian");
        $(this).children("p").html("Italian");
      }
      else if(index == 1) {
        $(this).attr("id", "hero-wheat");
        $(this).children("p").html("Whole Wheat");
      }
      else if(index == 2) {
        $(this).attr("id", "hero-flatbread");
        $(this).children("p").html("Flatbread");
      }
      else if(index == 3) {
        $(this).css("display", "none");
      }
      else if(index == 4) {
        $(this).css("display", "none");
      }
    });
  }
  else if (selection == "burger") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero-italian");
        $(this).children("p").html("Italian");
      }
      else if(index == 1) {
        $(this).attr("id", "hero-wheat");
        $(this).children("p").html("Whole Wheat");
      }
      else if(index == 2) {
        $(this).attr("id", "hero-flatbread");
        $(this).children("p").html("Flatbread");
      }
      else if(index == 3) {
        $(this).css("display", "none");
      }
      else if(index == 4) {
        $(this).css("display", "none");
      }
    });
  }
  else if (selection == "bagel") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero-italian");
        $(this).children("p").html("Italian");
      }
      else if(index == 1) {
        $(this).attr("id", "hero-wheat");
        $(this).children("p").html("Whole Wheat");
      }
      else if(index == 2) {
        $(this).attr("id", "hero-flatbread");
        $(this).children("p").html("Flatbread");
      }
      else if(index == 3) {
        $(this).css("display", "none");
      }
      else if(index == 4) {
        $(this).css("display", "none");
      }
    });
  }
}