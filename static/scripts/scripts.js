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
            console.log(selection);
            if(current == 2) { 
              selection++;
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
          ($("#bacon")).hide();
          ($("#chicken")).hide();
          ($("#ham")).hide();
          ($("#salami")).hide();
          ($("#turkey")).hide();
        }
        else if ($(this).attr("id") == "cheese") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#american")).hide();
          ($("#swiss")).hide();
          ($("#mozzarella")).hide();
        }
        else if ($(this).attr("id") == "toppings") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#lettuce")).hide();
          ($("#tomato")).hide();
          ($("#avocado")).hide();
          ($("#pickles")).hide();
        }
        else if ($(this).attr("id") == "sauces") {
          $(this).children("p").children("div").html("+");
          $(this).removeClass("expan").addClass("collapse");
          ($("#chipotle")).hide();
          ($("#mayo")).hide();
          ($("#ketchup")).hide();
        }
      }
      else if ($(this).hasClass("collapse")) {
        if ($(this).attr("id") == "meats") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#bacon")).show();
          ($("#chicken")).show();
          ($("#ham")).show();
          ($("#salami")).show();
          ($("#turkey")).show();
        }
        else if ($(this).attr("id") == "cheese") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#american")).show();
          ($("#swiss")).show();
          ($("#mozzarella")).show();
        }
        else if ($(this).attr("id") == "toppings") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#lettuce")).show();
          ($("#tomato")).show();
          ($("#avocado")).show();
          ($("#pickles")).show();
        }
        else if ($(this).attr("id") == "sauces") {
          $(this).children("p").children("div").html("-");
          $(this).removeClass("collapse").addClass("expan");
          ($("#chipotle")).show();
          ($("#mayo")).show();
          ($("#ketchup")).show();
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
        $(this).children("p").html("Cheeses<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
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
        $(this).children("p").html("Toppings<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
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
        $(this).children("p").html("Sauces<div class='expand-button'>+</div>");
        $(this).addClass("collapse");
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
        $(this).attr("id", "hero-italian");
        $(this).children("p").html("Italian");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "hero-wheat");
        $(this).children("p").html("Whole Wheat");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "hero-flatbread");
        $(this).children("p").html("Flatbread");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 3) {
        $(this).css("display", "none");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 4) {
        $(this).css("display", "none");
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
        $(this).attr("id", "classic-whole-wheat");
        $(this).children("p").html("Whole Wheat");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "classic-white");
        $(this).children("p").html("White Bread");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "classic-rye");
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
        $(this).attr("id", "burger-plain");
        $(this).children("p").html("Plain");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "burger-sesame");
        $(this).children("p").html("Sesame");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "burger-wheat");
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
        $(this).attr("id", "bagel-plain");
        $(this).children("p").html("Plain");
        $(this).removeClass("subset");
        $(this).show();
        $(this).removeClass("collapse");
        $(this).removeClass("expan");
      }
      else if(index == 1) {
        $(this).attr("id", "bagel-sesame");
        $(this).children("p").html("Sesame");
        $(this).removeClass("subset");
        $(this).show();
      }
      else if(index == 2) {
        $(this).attr("id", "bagel-everything");
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