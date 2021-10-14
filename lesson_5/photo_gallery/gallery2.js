{/* <ul>
  <li class="active"><a href="#"><img src="http://placehold.it/1200x900" alt="" title="Photo 1" /></a></li> */}

$(function() {
  let $slideshow = $("#slideshow");
  let $nav = $slideshow.find("ul");

  $nav.on("click", "a", function(e) {
    e.preventDefault();
    let $li = $(e.currentTarget).closest("li");
    let idx = $li.index();

    $slideshow.find("figure").stop().filter(":visible").fadeOut(300);
    $slideshow.find("figure").eq(idx).delay(300).fadeIn(300);
    $nav.find(".active").removeClass("active");
    $li.addClass("active");
  });
});