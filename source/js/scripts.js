const ESC_KEY = "Escape";

const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const orderButtons = document.querySelectorAll(".order-button");
const orderPopup = document.querySelector(".modal");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

orderButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    evt.preventDefault();
    orderPopup.classList.remove("modal--hide");
    orderPopup.classList.add("modal--show");
  });
});

window.addEventListener("keydown", function (event) {
  if (event.key === ESC_KEY) {
    event.preventDefault();
    if (orderPopup.classList.contains("modal--show")) {
      orderPopup.classList.remove("modal--show");
    }
  }
});

window.addEventListener("click", (evt) => {
  if (
    evt.target === orderPopup &&
    orderPopup.classList.contains("modal--show")
  ) {
    orderPopup.classList.add("modal--hide");
  }
});
