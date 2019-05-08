var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


var orderButtons = document.getElementsByClassName("order-button");
var orderPopup = document.querySelector(".modal");

for (var i = 0; i < orderButtons.length; i++) {
  orderButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
    orderPopup.classList.remove("modal--hide");
    orderPopup.classList.add("modal--show");
  });
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    event.preventDefault();
    if (orderPopup.classList.contains("modal--show")) {
      orderPopup.classList.remove("modal--show");
    }
  }
});

window.onclick = function (event) {
  if (event.target == orderPopup && orderPopup.classList.contains("modal--show")) {
    orderPopup.classList.add("modal--hide")
  }
}
