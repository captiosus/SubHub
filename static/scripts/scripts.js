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
    var numSelect = 0;
    var allSelected = [];
    var previousPage;
    $(".next").click(function() {
      $(".noSelect").remove();
      $(".choice").each(function() {
        $(".choice").each(function() {
          if ($(this).hasClass("selected")) {
            select = true;
            selection = $(this).attr("id");
            allSelected.push(selection);
            if(current == 2) { 
              numSelect++;
            }
          }
        });
        if (select && current == 0) {
          if (selection == "roll") {
            current+=2;
            next(current);
            select = false;
          }
          else {
            typeOfSandwich(selection);
            current++;
            if (current == 1) {
              previousPage = selection;
            } 
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
      if (current == 2) {
        typeOfSandwich(previousPage);
        current--;
        for (var i = numSelect; i > 0; i--) {
          allSelected.pop();
        }
        numSelect = 0;
      }
      else {
        current--;
        next(current);
        allSelected.pop();
      }
    });
    $(".choice").click(function() {
      if ($(this).hasClass("expan")) {
        if ($(this).attr("id") == "meats") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#Bacon")).hide();
          ($("#Chicken")).hide();
          ($("#Ham")).hide();
          ($("#Salami")).hide();
          ($("#Turkey")).hide();
        }
        else if ($(this).attr("id") == "Cheese") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#American")).hide();
          ($("#Swiss")).hide();
          ($("#Mozzarella")).hide();
        }
        else if ($(this).attr("id") == "toppings") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#Lettuce")).hide();
          ($("#Tomato")).hide();
          ($("#Avocado")).hide();
          ($("#Pickles")).hide();
        }
        else if ($(this).attr("id") == "sauces") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#Chipotle")).hide();
          ($("#Mayo")).hide();
          ($("#Ketchup")).hide();
        }
      }
      else if ($(this).hasClass("collapse")) {
        if ($(this).attr("id") == "meats") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#Bacon")).show();
          ($("#Chicken")).show();
          ($("#Ham")).show();
          ($("#Salami")).show();
          ($("#Turkey")).show();
        }
        else if ($(this).attr("id") == "Cheese") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#American")).show();
          ($("#Swiss")).show();
          ($("#Mozzarella")).show();
        }
        else if ($(this).attr("id") == "toppings") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#Lettuce")).show();
          ($("#Tomato")).show();
          ($("#Avocado")).show();
          ($("#Pickles")).show();
        }
        else if ($(this).attr("id") == "sauces") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#Chipotle")).show();
          ($("#Mayo")).show();
          ($("#Ketchup")).show();
        }
      }
      else if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
      }
      else {
        if (current != 3) {
          if (current != 2) {
            $(".choice").each(function() {
              $(this).removeClass("selected");
            });
          }
          $(this).addClass("selected");
        }
      }
    });
    $(".finish").click(function() {
      var ingredients = "";
      var name = $("#create-name").val();
      var user = $("#create-input").val();
      for (var i = 0; i < allSelected.length;i++) {
        ingredients += allSelected[i] + ", ";
      }
      if (name == undefined) {
        $(this).parent().append("<p class='noSelect'>Please enter sandwich name.</p>");
      }
      else if (user == undefined) {
        $(this).parent().append("<p class='noSelect'>Please enter a creator name.</p>");
      }
      else {
        window.location.replace("../../templates/Success/index.html?ingredients=" + ingredients + "&name=" + name + "&user=" + user);
      }
    });
});
function next(current) {
  $(".choice").each(function() {
    $(this).removeClass("selected");
  });
  if (current == 0) {
    $(".create-title").html("Type of Sandwich");
    $(".previous").addClass("noShow");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero");
        $(this).children("p").html("Hero");
        $(this).removeClass("subset");
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
        $(this).show();
      }
      else if(index == 1) {
        $(this).attr("id", "classic");
        $(this).children("p").html("Classic Sandwich");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "burger");
        $(this).children("p").html("Hamburger");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 3) {
        $(this).attr("id", "bagel");
        $(this).children("p").html("Bagel");
        $(this).css("display", "block");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 4) {
        $(this).attr("id", "roll");
        $(this).children("p").html("Roll");
        $(this).css("display", "block");
        $(this).removeClass("subset");
        $(this).show();
      }
      else {
        $(this).css("display", "none");
        $(this).removeClass("subset");
      }
    });
  }
  else if (current == 2) {
    $(".next").removeClass("noShow");
    $(".finish").addClass("noShow");
    $(".create-title").html("Types of Filling");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "meats");
        $(this).children("p").html("Meats<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
        $(this).show();
      }
      else if(index == 1) {
        $(this).addClass("subset");
        $(this).attr("id", "Bacon");
        $(this).children("p").html("Bacon");
        $(this).hide();
      }
      else if(index == 2) {
        $(this).addClass("subset");
        $(this).attr("id", "Chicken");
        $(this).children("p").html("Chicken");
        $(this).hide();
      }
      else if(index == 3) {
        $(this).addClass("subset");
        $(this).attr("id", "Ham");
        $(this).children("p").html("Ham");
        $(this).hide();
      }
      else if(index == 4) {
        $(this).addClass("subset");
        $(this).attr("id", "Salami");
        $(this).children("p").html("Salami");
        $(this).hide();
      }
      else if(index == 5) {
        $(this).addClass("subset");
        $(this).attr("id", "Turkey");
        $(this).children("p").html("Turkey");
        $(this).hide();
      }
      else if(index == 6) {
        $(this).attr("id", "Cheese");
        $(this).children("p").html("Cheeses<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
        $(this).show();
      }
      else if(index == 7) {
        $(this).addClass("subset");
        $(this).attr("id", "American");
        $(this).children("p").html("American");
        $(this).hide();
      }
      else if(index == 8) {
        $(this).addClass("subset");
        $(this).attr("id", "Swiss");
        $(this).children("p").html("Swiss");
        $(this).hide();
      }
      else if(index == 9) {
        $(this).addClass("subset");
        $(this).attr("id", "Mozzarella");
        $(this).children("p").html("Mozzarella");
        $(this).hide();
      }
      else if(index == 10) {
        $(this).attr("id", "toppings");
        $(this).children("p").html("Toppings<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
        $(this).show();
      }
      else if(index == 11) {
        $(this).addClass("subset");
        $(this).attr("id", "Lettuce");
        $(this).children("p").html("Lettuce");
        $(this).hide();
      }
      else if(index == 12) {
        $(this).addClass("subset");
        $(this).attr("id", "Tomato");
        $(this).children("p").html("Tomato");
        $(this).hide();
      }
      else if(index == 13) {
        $(this).addClass("subset");
        $(this).attr("id", "Avocado");
        $(this).children("p").html("Avocado");
        $(this).hide();
      }
      else if(index == 14) {
        $(this).addClass("subset");
        $(this).attr("id", "Pickles");
        $(this).children("p").html("Pickles");
        $(this).hide();
      }
      else if(index == 15) {
        $(this).attr("id", "sauces");
        $(this).children("p").html("Sauces<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
        $(this).show();
      }
      else if(index == 16) {
        $(this).addClass("subset");
        $(this).attr("id", "Chipotle");
        $(this).children("p").html("Chipotle");
        $(this).hide();
      }
      else if(index == 17) {
        $(this).addClass("subset");
        $(this).attr("id", "Mayo");
        $(this).children("p").html("Mayo");
        $(this).hide();
      }
      else if(index == 18) {
        $(this).addClass("subset");
        $(this).attr("id", "Ketchup");
        $(this).children("p").html("Ketchup");
        $(this).hide();
      }
    });    
  }
  else if (current == 3) {
    $(".create-title").html("Sandwich Details");
    $(".finish").removeClass("noShow");
    $(".previous").removeClass("noShow");
    $(".next").addClass("noShow");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "sandwich-name");
        $(this).html('<input id="create-name" type="text" placeholder="Sandwich Name">');
        $(this).removeClass("subset");
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
        $(this).removeClass("choice");
        $(this).css("display", "block");
        $(this).show();
      }
      else if(index == 1) {
        $(this).attr("id", "username");
        $(this).html('<input id="create-input" type="text" placeholder="Creator\'s Name">');
        $(this).removeClass("subset");
        $(this).removeClass("choice");
        $(this).css("display", "block");
        $(this).show()
      }
      else {
        $(this).css("display", "none");
        $(this).removeClass("subset");
      }
    });
  }
}
function typeOfSandwich(selection) {
  $(".choice").each(function() {
    $(this).removeClass("selected");
  });
  $(".previous").removeClass("noShow");
  if (selection == "hero") {
    $(".create-title").html("Types of Hero Bread");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "hero-Italian");
        $(this).children("p").html("Italian");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "hero-Whole-Wheat");
        $(this).children("p").html("Whole Wheat");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "hero-Flatbread");
        $(this).children("p").html("Flatbread");
        $(this).removeClass("subset");
        $(this).show();
      }
      else {
        $(this).css("display", "none");
        $(this).removeClass("subset");
      }
    });
  }
  else if (selection == "classic") {
    $(".create-title").html("Types of Classic Sandwich Bread");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "classic-Whole-Wheat");
        $(this).children("p").html("Whole Wheat");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "classic-White");
        $(this).children("p").html("White Bread");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "classic-Rye");
        $(this).children("p").html("Rye Bread");
        $(this).removeClass("subset");
        $(this).show();
      }
      else {
        $(this).css("display", "none");
        $(this).removeClass("subset");
      }
    });
  }
  else if (selection == "burger") {
    $(".create-title").html("Types of Burger Bread");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "burger-Plain");
        $(this).children("p").html("Plain");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "burger-Sesame");
        $(this).children("p").html("Sesame");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "burger-Wheat");
        $(this).children("p").html("Whole Wheat");
        $(this).removeClass("subset");
        $(this).show();
      }
      else {
        $(this).css("display", "none");
        $(this).removeClass("subset");
      }
    });
  }
  else if (selection == "bagel") {
    $(".create-title").html("Types of Bagel Bread");
    $(".choice").each(function( index ) {
      if (index == 0) {
        $(this).attr("id", "bagel-Plain");
        $(this).children("p").html("Plain");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "bagel-Sesame");
        $(this).children("p").html("Sesame");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "bagel-Everything");
        $(this).children("p").html("Everything");
        $(this).removeClass("subset");
        $(this).show();
      }
      else {
        $(this).css("display", "none");
        $(this).removeClass("subset");
      }
    });
  }
}