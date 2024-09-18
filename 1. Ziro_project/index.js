"use strict";

const howitworksContainer = document.querySelector(
  ".how-it-works-block__items"
);
const howitworksTabs = document.querySelectorAll(".how-it-works-block__item");
// const activetabs = document.querySelectorAll(".how-it-works-block__item--text");

console.log(howitworksContainer);

howitworksContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target.closest(".how-it-works-block__item");
  if (!clicked) return;
  howitworksTabs.forEach((item) => {
    item === clicked
      ? item.classList.add("active")
      : item.classList.remove("active");
  });
  //   clicked.classList.toggle("active");
});

// Slider________________________________________________________________

const slides = document.querySelectorAll(".slide");
console.log(slides);
const slider = document.querySelector(".slider");
console.log(slider);

slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
let activeSlide = 0;
const lenghtOfSlider = slides.length;

const sliderFunction = function (side) {
  if (side === "left") {
    if (activeSlide === -1 * (lenghtOfSlider - 1)) activeSlide = 1;
    activeSlide--;
  } else if (side === "right") {
    if (activeSlide === 0) activeSlide = -lenghtOfSlider;
    activeSlide++;
  }
  // console.log(activeSlide)
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index + activeSlide) * 100}%)`)
  );
};

btnRight.addEventListener("click", function () {
  sliderFunction("right");
});

btnLeft.addEventListener("click", function () {
  sliderFunction("left");
});
