"use strict";

// const userData = [
//   {
//     id: "95670",
//     name: "",
//     surname: "",
//     imageUrl:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     number: "+3806783928288",
//     email: "oleg.vitalik94@gmail.com",
//     isFavorite: false,
//   },
//   {
//     id: "99000",
//     name: "S",
//     surname: "",
//     imageUrl:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     number: "+3806783928288",
//     email: "oleg.vitalik94@gmail.com",
//     isFavorite: true,
//   },
//   {
//     id: "98308",
//     name: "Vitalik",
//     surname: "",
//     imageUrl:
//       "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     number: "+3806783928288",
//     email: "oleg.vitalik94@gmail.com",
//     isFavorite: false,
//   },

//   {
//     id: "98311",
//     name: "Vitalik",
//     surname: "",
//     imageUrl:
//       "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     number: "+3806783928288",
//     email: "oleg.vitalik94@gmail.com",
//     isFavorite: true,
//   },
//   {
//     id: "98312",
//     name: "Vitalik",
//     surname: "",
//     imageUrl:
//       "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     number: "+3806783928288",
//     email: "oleg.vitalik94@gmail.com",
//     isFavorite: false,
//   },
// ];

let activeID = null;
let searchedQuery = "";

const deleteBtnHTML = `<button class="contact-delete btn-big">Delete</button>`;

const findContactBtn = document.querySelector(".contact-submit-input");
// const saveContactBtn = document.querySelector(".contact-submit");
const cancelBtn = document.querySelector(".contact-cancel");
const containerForm = document.querySelector(".form-render");

const photoPreview = document.querySelector(".contact-photo");
const inputPhoto = document.querySelector(".contact-photo-input");
const inputName = document.querySelector(".contact-name-input");
const inputSurname = document.querySelector(".contact-surname-input");
const inputTel = document.querySelector(".contact-tel-input");
const inputEmail = document.querySelector(".contact-email-input");
const inputIsFavorite = document.querySelector(".cotact-isFavorite");

inputPhoto.addEventListener("blur", () => {
  resetFormPhoto();
  if (!inputPhoto.value) return;
  updateFormPhoto(inputPhoto.value);
});

const nameLabel = document.querySelector(".contact-name");
const surnameLabel = document.querySelector(".contact-surname");
const telLabel = document.querySelector(".contact-tel");
// const emailLabel = document.querySelector(".contact-email");

const favoriteContactList = document.querySelector(".contacts--favorite");
const contactList = document.querySelector(".contacts--main");

const contactForm = document.querySelector(".contact-form");
const contactSearchField = document.querySelector(".contact-search-input");
const messageHTML = (message) => `<h3>${message}</h3>`;

const close = document.querySelector(".contact-close");

const getUserData = () => JSON.parse(localStorage.getItem("userData") || "[]");
const setDataStorage = function (data) {
  localStorage.setItem("userData", JSON.stringify([...data]));
};

const contactItem = function (contact) {
  const { id, name, surname, imageUrl, number, email, isFavorite } = contact;
  return `<li class="contact__box" data-id=${id}>
            <div class="contact__box--photo"><img src=${
              imageUrl ? imageUrl : "./imgs/default-avatar-icon.jpg"
            }
                    alt="contact avatar" class="photo"></div>
            <div class="contact__box--info">
                <h3 class="contact-fullname">${name}&nbsp;${surname}</h3>
                <p class="contact-email--label">E-mail:&nbsp;&nbsp;
                    <a href="mailto:..." class="contact-email--link">${email}</a>
                </p>
                <p class="contact-phone--label">Phone number:&nbsp;&nbsp;
                    <a href="mailto:..." class="contact-phone--link">${number}</a>
                </p>
            </div>
            <div class="contact__box--buttons">
                <button class="small-btn favorite-button ${
                  isFavorite ? "active" : ""
                }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-star" viewBox="0 0 16 16">
                        <path
                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </button>
            </div>
        </li>`;
};

const spanErrorHTML = function (text) {
  const spanError = document.createElement("span");
  spanError.classList.add("invalid-field");
  spanError.textContent = `${text}`;
  return spanError;
};

const updateFormPhoto = function (link) {
  photoPreview.src = `${link}`;
};

const resetFormPhoto = function () {
  photoPreview.src = "./imgs/default-avatar-icon.jpg";
};

const resetContactLists = () => {
  favoriteContactList.innerHTML = "";
  contactList.innerHTML = "";
};

const resetForm = function () {
  resetFormPhoto();
  resetLabels();
  const deleteBtn = document.querySelector(".contact-delete");
  deleteBtn && deleteBtn.remove();

  inputPhoto.value = "";
  inputName.value = "";
  inputSurname.value = "";
  inputTel.value = "";
  inputEmail.value = "";
  inputIsFavorite.value = "";
};

const resetLabels = () => {
  const invalid = document.querySelectorAll(".invalid-field");
  invalid.length > 0 && invalid.forEach((span) => span.remove());
};

const setFormData = function (contact) {
  const { name, surname, imageUrl, number, email, isFavorite } = contact;
  inputPhoto.value = imageUrl;
  inputName.value = name;
  inputSurname.value = surname;
  inputTel.value = number;
  inputEmail.value = email;
  inputIsFavorite.value = isFavorite;
  // in.value = isFavorite;
};

const getContactData = function (id) {
  const contact = getUserData().filter((contact) => contact.id === id);
  return contact[0];
};

const getFormData = function () {
  const form = contactForm;
  const formData = new FormData(form);
  const imageUrl = formData.get("contact-photo");
  const name = formData.get("contact-name");
  const surname = formData.get("contact-surname");
  const number = formData.get("contact-tel");
  const email = formData.get("contact-email");
  const isFavorite =
    formData.get("cotact-isFavorite") === "false" ? false : true;
  const contact = { name, surname, imageUrl, number, email, isFavorite };
  if (!isValidForm(contact)) return false;
  return contact;
};

const openForm = function (isEdit, id) {
  resetForm();
  if (isEdit) {
    const formValue = isEdit && getContactData(id);
    setFormData(formValue);
    const contactData = getFormData();
    updateFormPhoto(contactData.imageUrl);
    containerForm.insertAdjacentHTML("beforeend", deleteBtnHTML);
    const deleteBtn = document.querySelector(".contact-delete");
    deleteBtn.addEventListener("click", deleteContact);
  }
};

function isValidPhoneNumber(number) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(number);
}
const isNameValid = (name, label, error = "somethinf went wrong") => {
  if (!name) return;
  if (name.length < 2) {
    label.appendChild(spanErrorHTML(error));
    return false;
  }
  return true;
};

const isValidForm = function (contact) {
  const { name, surname, number } = contact;
  if (!name && !surname) {
    nameLabel.appendChild(spanErrorHTML("pls, fill name or surname field"));
    surnameLabel.appendChild(spanErrorHTML("pls, fill name or surname field"));
  }
  isNameValid(name, nameLabel, "pls, enter valid name");
  isNameValid(surname, surnameLabel, "pls, enter valid surname");

  if (!isValidPhoneNumber(number)) {
    telLabel.appendChild(spanErrorHTML("pls, enter valid phone number"));
  }
  const invalidFields = document.querySelectorAll(".invalid-field");
  if (invalidFields.length > 0) return false;
  return true;
};

const dataToSave = () => {
  let beforeUpdate = getUserData();
  if (activeID) {
    beforeUpdate = beforeUpdate.filter((contact) => activeID !== contact.id);
  }
  return beforeUpdate;
};

const createContact = (contact) => {
  const { name, surname, imageUrl, number, email, isFavorite } = contact;
  return {
    id: activeID ? activeID : Number(`${new Date().getTime()}`.slice(7, -1)),
    name,
    surname,
    imageUrl,
    number,
    email,
    isFavorite: activeID ? isFavorite : false,
  };
};

const toggleIsFavorite = function (id) {
  const contactData = getContactData(id);
  const toggledContact = {
    ...contactData,
    isFavorite: contactData.isFavorite ? false : true,
  };
  setDataStorage([...dataToSave(), toggledContact]);
  load();
};

const deleteContact = () => {
  setDataStorage([...dataToSave()]);
  load();
};

const toggleCloseBtn = (hide) =>
  hide ? close.classList.add("hidden") : close.classList.remove("hidden");

const addCloseBtn = () => {
  toggleCloseBtn();
  close.addEventListener("click", closeSearch);
};

const closeSearch = () => {
  searchedQuery = "";
  contactSearchField.value = "";
  load();
};

const reset = () => {
  toggleCloseBtn(true);
  resetContactLists();
  resetForm();
  resetResultsField();
};

const showResults = function (e) {
  e.preventDefault();
  searchedQuery = contactSearchField.value.toLowerCase();
  load();
};

const searchThroughContacts = (searchedData) => {
  const allContacts = getUserData();
  const foundData = allContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchedData) ||
      contact.surname.toLowerCase().includes(searchedData) ||
      contact.number.includes(searchedData)
  );
  return foundData;
};
const messageBox = document.querySelector(".message-box");
const resetResultsField = () => (messageBox.innerHTML = "");

const showMessage = (message) => {
  messageBox.insertAdjacentHTML("afterbegin", messageHTML(message));
};

const load = function () {
  activeID = null;
  reset();
  let userData = "";

  if (searchedQuery === "") {
    userData = getUserData();
  }
  if (searchedQuery !== "") {
    userData = searchThroughContacts(searchedQuery);
    if (userData?.length === 0) return;
    addCloseBtn();
  }
  if (userData.length === 0) {
    showMessage("No contacts yet");
  }
  userData.forEach((contact) => {
    contact.isFavorite
      ? favoriteContactList.insertAdjacentHTML(
          "afterbegin",
          contactItem(contact)
        )
      : contactList.insertAdjacentHTML("afterbegin", contactItem(contact));
  });

  const contactItems = document.querySelectorAll(".contact__box");
  contactItems.forEach((item) =>
    item.addEventListener("click", (e) => {
      if (
        !e.target.closest(".contact__box") ||
        e.target.closest(".contact__box--buttons")
      ) {
        return;
      }
      const contactID = Number(e.target.closest(".contact__box").dataset.id);
      activeID = contactID;
      openForm(true, contactID);
    })
  );

  const favoriteBtns = document.querySelectorAll(".favorite-button");
  favoriteBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      if (!e.target.closest(".favorite-button")) {
        return;
      }
      const contactID = Number(e.target.closest(".contact__box").dataset.id);
      activeID = contactID;
      toggleIsFavorite(contactID);
    })
  );
};

load();

findContactBtn.addEventListener("click", showResults);
cancelBtn.addEventListener("click", () => resetForm());
contactForm.addEventListener("submit", (e) => {
  resetLabels();
  e.preventDefault();
  const contactData = getFormData();
  if (!contactData) return;

  const contactObject = createContact(contactData);
  setDataStorage([...dataToSave(), contactObject]);
  load();
});
