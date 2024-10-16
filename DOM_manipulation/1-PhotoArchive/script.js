"use strict";
let serverData = [
  {
    id: 1,
    src: "./img/alexis-antoine-1tqpzFw1fS4-unsplash.jpg",
    comment:
      "Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest. Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh.",
  },
  {
    id: 2,
    src: "./img/anton-filatov-O_5SJuSOxZA-unsplash.jpg",
    comment:
      "Cottage out enabled was entered greatly prevent message. No procured unlocked an likewise. Dear but what she been over gay felt body. Six principles advantages and use entreaties decisively. Eat met has dwelling unpacked see whatever followed. Court in of leave again as am. Greater sixteen to forming colonel no on be. So an advice hardly barton. He be turned sudden engage manner spirit. ",
  },
  {
    id: 3,
    src: "./img/arkadiusz-zet-zbX449WfMss-unsplash.jpg",
    comment:
      "Offices parties lasting outward nothing age few resolve. Impression to discretion understood to we interested he excellence. Him remarkably use projection collecting. Going about eat forty world has round miles. Attention affection at my preferred offending shameless me if agreeable. Life lain held calm and true neat she. Much feet each so went no from. Truth began maids linen an mr to after.",
  },
  {
    id: 4,
    src: "./img/ashim-d-silva-S2Q5mdOrrVc-unsplash.jpg",
    comment:
      "In entirely be to at settling felicity. Fruit two match men you seven share. Needed as or is enough points. Miles at smart ﻿no marry whole linen mr. Income joy nor can wisdom summer. Extremely depending he gentleman improving intention rapturous as.",
  },
  {
    id: 5,
    src: "./img/boliviainteligente-_75VdeLT3BI-unsplash.jpg",
    comment:
      "Not far stuff she think the jokes. Going as by do known noise he wrote round leave. Warmly put branch people narrow see. Winding its waiting yet parlors married own feeling. Marry fruit do spite jokes an times. Whether at it unknown warrant herself winding if. Him same none name sake had post love. An busy feel form hand am up help. Parties it brother amongst an fortune of. Twenty behind wicket why age now itself ten.",
  },
  {
    id: 6,
    src: "./img/brady-corps-zjaWzPj9WjM-unsplash.jpg",
    comment:
      "Satisfied conveying an dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do mr prevailed. Mr feeling do chiefly cordial in do. Water timed folly right aware if oh truth. Imprudence attachment him his for sympathize. Large above be to means. Dashwood do provided stronger is. But discretion frequently sir the she instrument unaffected admiration everything.",
  },
  {
    id: 7,
    src: "./img/breno-machado-in9-n0JwgZ0-unsplash.jpg",
    comment:
      "He do subjects prepared bachelor juvenile ye oh. He feelings removing informed he as ignorant we prepared. Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye. Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware.",
  },
  {
    id: 8,
    src: "./img/daryan-shamkhali-wEYiIJGKSyc-unsplash.jpg",
    comment:
      "It real sent your at. Amounted all shy set why followed declared. Repeated of endeavor mr position kindness offering ignorant so up. Simplicity are melancholy preference considered saw companions. Disposal on outweigh do speedily in on. Him ham although thoughts entirely drawings. Acceptance unreserved old admiration projection nay yet him. Lasted am so before on esteem vanity oh.",
  },
];

// Initial loading:
const gridContainer = document.querySelector(".images-box-element");

function render() {
  gridContainer.innerHTML = ` 
                 <div class="image-box">
                    <button class="image-add-button">&#43;</button>
                </div>`;
  serverData.forEach((img, i) => {
    gridContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="image-box boxed-image" role="button" >
                  <img src="${img.src}" alt="" id="${i + 1}">
              </div>`
    );
  });
}

render();

// Open/Close From_____________________________________________________________________________

let buttonShowModal = document.querySelector(".image-add-button");
const modalForm = document.querySelector(".form-add-photo");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".form-add-photo--close");
const addPhotoForm = document.querySelector(".form-add-photo--block");
const descriptionForm = document.querySelector(".photo-description-input");
const addPhoto = document.querySelector(".photo-upload--input");

buttonShowModal.addEventListener("click", functionShowModal);
overlay.addEventListener("click", closeModalForm);
btnCloseModal.addEventListener("click", closeModalForm);
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && closeModalForm()
);

addPhotoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = addPhotoForm;
  const formData = new FormData(form);

  const commentUser = formData.get("description");
  const imageUser = formData.get("photo");
  console.log(commentUser);
  console.log(imageUser);
  serverData.push({ src: imageUser, comment: commentUser });
  addPhotoForm.reset();
  updateImages();
  closeModalForm();
});
function updateImages() {
  render();
  reset();
}

function functionShowModal() {
  modalForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModalForm() {
  overlay.classList.add("hidden");
  modalForm.classList.add("hidden");
}

function reset() {
  buttonShowModal = document.querySelector(".image-add-button");
  buttonShowModal.addEventListener("click", functionShowModal);
  imagesToOpen = document.querySelectorAll(".boxed-image");
  slider = document.querySelector(".slider-slide");
  imagesToOpen.forEach((image) =>
    image.addEventListener("click", openImageFunction)
  );
}

// Drag and drop____________________________________________________________________________________

// const dragNDropWindow = document.querySelector(
//   ".block-element-input--drag-area"
// );

// dragNDropWindow.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   dragNDropWindow.classList.add("dragover");
// });

// dragNDropWindow.addEventListener("dragleave", (e) => {
//   e.preventDefault();
//   dragNDropWindow.classList.remove("dragover");
// });
// const files = null;
// dragNDropWindow.addEventListener("drop", (e) => {
//   e.preventDefault();
//   dragNDropWindow.classList.remove("dragover");
//   const files = e.dataTransfer.files[0];
//   console.log(files);
// });

// Open/Close/Move Image____________________________________________________________________________

const modalImage = document.querySelector(".image-to-show-full-size");
let imagesToOpen = document.querySelectorAll(".boxed-image");
const btnCloseModalImage = document.querySelector(
  ".image-to-show-full-size--close"
);
let slider = document.querySelector(".slider-slide");
const comment = document.querySelector(".description-reveal--comment");
const btnRight = document.querySelector(".slide-right");
const btnLeft = document.querySelector(".slide-left");

const btndeleteImage = document.querySelector(".description-reveal--delete");

function openPhoto(id) {
  serverData.forEach((img, i) => {
    if (i + 1 === Number(id)) {
      slider.setAttribute("src", img.src);
      slider.dataset.currentId = i + 1;
      comment.textContent = img.comment;
    }
  });
}

function deletePhoto() {
  const id = Number(slider.dataset.currentId);
  serverData = serverData.filter((el, i) => i + 1 !== id);
  render();
  reset();
  sliderMove();
}

function sliderMove(e = "available") {
  if (!serverData.length) closeModalImage();
  const side = e.target?.dataset.side || e;
  const currentId = Number(slider.dataset.currentId);
  if (side === "right" && currentId < serverData.length)
    return openPhoto(currentId + 1);
  if (side === "left" && currentId > 1) return openPhoto(currentId - 1);
  if (side === "right" && currentId == serverData.length) return openPhoto(1);
  if (side === "left" && currentId == 1) return openPhoto(serverData.length);
  if (side === "available" && currentId - 1 !== serverData.length)
    openPhoto(currentId);
  if (side === "available" && currentId - 1 === serverData.length)
    openPhoto(serverData.length);
}

function arrowsKey(e) {
  if (e.key === "ArrowRight") sliderMove("right");
  if (e.key === "ArrowLeft") sliderMove("left");
}

function openImageFunction(e) {
  e.preventDefault();
  const target = e.target.id;
  openPhoto(target);
  btnRight.addEventListener("click", sliderMove);
  btnLeft.addEventListener("click", sliderMove);
  btndeleteImage.addEventListener("click", deletePhoto);
  modalImage.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.addEventListener("keydown", arrowsKey);
}

imagesToOpen.forEach((image) =>
  image.addEventListener("click", openImageFunction)
);

function closeModalImage() {
  overlay.classList.add("hidden");
  modalImage.classList.add("hidden");
  btndeleteImage.removeEventListener("click", deletePhoto);
  btnRight.removeEventListener("click", sliderMove);
  btnLeft.removeEventListener("click", sliderMove);
  document.removeEventListener("keydown", arrowsKey);
}

overlay.addEventListener("click", closeModalImage);
btnCloseModalImage.addEventListener("click", closeModalImage);
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && closeModalImage()
);
