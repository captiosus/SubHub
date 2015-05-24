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
        $(this).html("See More...");
        expanded = false;
      }
      else {
        $(this).parent().children(".ingredients-list").css("overflow-y", "visible");
        $(this).parent().children(".ingredients-list").css("height", "auto");
        $(this).html("See Less...");
        expanded = true;
      }
    });
    var current = 0;
    $(".next").click(function() {
      current++;
    });
    $(".choice").clicl(function() {
});