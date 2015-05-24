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
    var current = 0;
    var type;
    var select = false;
    var selection;
    var allSelected = [];
    $(".next").click(function() {
      $(".noSelect").remove();
      $(".choice").each(function() {
        $(".choice").each(function() {
          if ($(this).hasClass("selected")) {
            select = true;
            selection = $(this).attr("id");
            allSelected.push(selection);
          }
        });
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
      allSelected.pop();
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
    $(".previous").addClass("noShow");
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
      else {
        $(this).css("display", "none");
      }
    });
  }
  else if (current == 2) {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "meats");
        $(this).children("p").html("Meats");
        $(this).append("<div class='expand-button'>+</div>");
        $(this).show();
      }
      else if(index == 1) {
        $(this).addClass("subset");
        $(this).attr("id", "bacon");
        $(this).children("p").html("Bacon");
        $(this).hide();
      }
      else if(index == 2) {
        $(this).addClass("subset");
        $(this).attr("id", "chicken");
        $(this).children("p").html("Chicken");
        $(this).hide();
      }
      else if(index == 3) {
        $(this).addClass("subset");
        $(this).attr("id", "ham");
        $(this).children("p").html("Ham");
        $(this).hide();
      }
      else if(index == 4) {
        $(this).addClass("subset");
        $(this).attr("id", "salami");
        $(this).children("p").html("Salami");
        $(this).hide();
      }
      else if(index == 5) {
        $(this).addClass("subset");
        $(this).attr("id", "turkey");
        $(this).children("p").html("Turkey");
        $(this).hide();
      }
      else if(index == 6) {
        $(this).attr("id", "cheese");
        $(this).children("p").html("Cheeses");
        $(this).show();
      }
      else if(index == 7) {
        $(this).addClass("subset");
        $(this).attr("id", "american");
        $(this).children("p").html("American");
        $(this).hide();
      }
      else if(index == 8) {
        $(this).addClass("subset");
        $(this).attr("id", "swiss");
        $(this).children("p").html("Swiss");
        $(this).hide();
      }
      else if(index == 9) {
        $(this).addClass("subset");
        $(this).attr("id", "mozzarella");
        $(this).children("p").html("Mozzarella");
        $(this).hide();
      }
      else if(index == 10) {
        $(this).attr("id", "toppings");
        $(this).children("p").html("Toppings");
        $(this).append("<div class='expand-button'></div>");
        $(this).show();
      }
      else if(index == 11) {
        $(this).addClass("subset");
        $(this).attr("id", "lettuce");
        $(this).children("p").html("Lettuce");
        $(this).hide();
      }
      else if(index == 12) {
        $(this).addClass("subset");
        $(this).attr("id", "tomato");
        $(this).children("p").html("Tomato");
        $(this).hide();
      }
      else if(index == 13) {
        $(this).addClass("subset");
        $(this).attr("id", "avocado");
        $(this).children("p").html("Avocado");
        $(this).hide();
      }
      else if(index == 14) {
        $(this).addClass("subset");
        $(this).attr("id", "pickles");
        $(this).children("p").html("Pickles");
        $(this).hide();
      }
      else if(index == 15) {
        $(this).attr("id", "sauces");
        $(this).children("p").html("Sauces");
        $(this).show();
      }
      else if(index == 16) {
        $(this).addClass("subset");
        $(this).attr("id", "chipotle");
        $(this).children("p").html("Chipotle");
        $(this).hide();
      }
      else if(index == 17) {
        $(this).addClass("subset");
        $(this).attr("id", "mayo");
        $(this).children("p").html("Mayo");
        $(this).hide();
      }
      else if(index == 18) {
        $(this).addClass("subset");
        $(this).attr("id", "ketchup");
        $(this).children("p").html("Ketchup");
        $(this).hide();
      }
    });    
  }
  else if (current == 3) {
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
      else {
        $(this).css("display", "none");
      }
    });
  }
  else if (selection == "classic") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "classic-whole-wheat");
        $(this).children("p").html("Whole Wheat");
      }
      else if(index == 1) {
        $(this).attr("id", "classic-white");
        $(this).children("p").html("White Bread");
      }
      else if(index == 2) {
        $(this).attr("id", "classic-rye");
        $(this).children("p").html("Rye Bread");
      }
      else {
        $(this).css("display", "none");
      }
    });
  }
  else if (selection == "burger") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "burger-plain");
        $(this).children("p").html("Plain");
      }
      else if(index == 1) {
        $(this).attr("id", "burger-sesame");
        $(this).children("p").html("Sesame");
      }
      else if(index == 2) {
        $(this).attr("id", "burger-wheat");
        $(this).children("p").html("Whole Wheat");
      }
      else {
        $(this).css("display", "none");
      }
    });
  }
  else if (selection == "bagel") {
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "bagel-plain");
        $(this).children("p").html("Plain");
      }
      else if(index == 1) {
        $(this).attr("id", "bagel-sesame");
        $(this).children("p").html("Sesame");
      }
      else if(index == 2) {
        $(this).attr("id", "bagel-everything");
        $(this).children("p").html("Everything");
      }
      else {
        $(this).css("display", "none");
      }
    });
  }
}