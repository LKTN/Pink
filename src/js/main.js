'use strict'

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    navText: ["<div class=\"arrow arrow--prev\"></div>", "<div class=\"arrow arrow--next\"></div>"]
  });
});