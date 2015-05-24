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
      if (current == 0) {
        $(".choice").each(function() {
          if ($(this).hasClass("selected")) {
            select = true;
            selection = $(this).attr("id");
          }
        });
      }
      else if (current == 1) {
        $(".choice").each(function() {
          if ($(this).hasClass("selected")) {
            select = true;
          }
        });
      }
      if (select && current == 0) {
        typeOfSandwich(selection);
        current++;
        select = false;
      }
      if (select) {
        current++;
        next(current);
      }
      else {
        $(this).parent().append("<p class='noSelect'>Please make a selection.</p>");
      }
    });
    $(".previous").click(function() {
      console.log("hello");
      current--;
      next(current);
    });
    $(".choice").click(function() {
      $(".choice").each(function() {
        $(this).removeClass("selected");
      });
      $(this).addClass("selected");
    });
});
var page0 = '<p>Type of Sandwich</p><ul><li class="choice" id="hero"><p>Hero</p></li><li class="choice" id="classic"><p>Classic Sandwich</p></li><li class="choice" id="burger"><p>Hamburger</p></li><li class="choice" id="bagel"><p>Bagel</p></li><li class="choice" id="roll"><p>Roll</p></li></ul><div class="next"> Next Step </div>';
var hero = '<p>Types of Hero Bread</p><ul><li class="choice" id="hero-italian"><p>Italian</p></li><li class="choice" id="hero-wheat"><p>Wheat</p></li><li class="choice" id="hero-flatbread"><p>Flatbread</p></li></ul><div class="previous"> Previous</div><div class="next"> Next </div>'

function next(current) {
  if (current == 0) {
    $(".sandwich-details").empty().html(page0);
  }
  else if (current == 2) {
    $(".sandwich-details").empty().html(page2);
  }
  else if (current == 3) {
    $(".sandwich-details").empty().html(page3);
  }
  else if (current == 4) {
    $(".sandwich-details").empty().html(page4);
  }
}
function typeOfSandwich(selection) {
  if (selection == "hero") {
    $(".sandwich-details").empty().html(hero);
  }
  else if (select == "classic") {
    $(".sandwich-details").empty().html(classic);
  }
  else if (select == "burger") {
    $(".sandwich-details").empty().html(burger);
  }
  else if (select == "bagel") {
    $(".sandwich-details").empty().html(bagel);
  }
  else if (select == "roll") {
    $(".sandwich-details").empty().html(roll);
  }
}