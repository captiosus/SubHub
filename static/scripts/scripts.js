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
    $(".ingredients-list").each(function() {
      if ($(this).height() > 20) {
       $(this).css("overflow-y", "hidden");
       $(this).css("height", "20px");
      }
    })
});
