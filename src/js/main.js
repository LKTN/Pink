//= libs/jquery/jquery.min.js
//= libs/owl.carousel/owl.carousel.min.js
//= map.js

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    navText: ["<div class=\"arrow arrow--prev\"></div>", "<div class=\"arrow arrow--next\"></div>"]
  });
});

var navMain = document.querySelector('.menu');
var navToggle = document.querySelector('.toggle-menu');

navMain.classList.remove('menu--nojs');

navToggle.addEventListener('click', function() {
  if(navMain.classList.contains('menu--closed')) {
    navMain.classList.remove('menu--closed');
    navMain.classList.add('menu--opened');
  } else {    
    navMain.classList.add('menu--closed');
    navMain.classList.remove('menu--opened');
  }
})