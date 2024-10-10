document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const nameHint = document.getElementById("nameHint");
  const emailHint = document.getElementById("emailHint");
  const passwordHint = document.getElementById("passwordHint");

  nameInput.addEventListener("focus", () => {
    nameHint.style.display = "block";
  });
  emailInput.addEventListener("focus", () => {
    emailHint.style.display = "block";
  });
  passwordInput.addEventListener("focus", () => {
    passwordHint.style.display = "block";
  });

  nameInput.addEventListener("blur", () => {
    nameHint.style.display = "none";
    if (nameInput.value.length < 2) {
      nameError.style.display = "block";
    } else {
      nameError.style.display = "none";
    }
  });

  emailInput.addEventListener("blur", () => {
    emailHint.style.display = "none";
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
    }
  });

  passwordInput.addEventListener("blur", () => {
    passwordHint.style.display = "none";
    if (passwordInput.value.length < 6) {
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
  });

  nameInput.addEventListener("input", () => {
    if (nameInput.value.length >= 2) {
      nameError.style.display = "none";
    }
  });

  emailInput.addEventListener("input", () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(emailInput.value)) {
      emailError.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length >= 6) {
      passwordError.style.display = "none";
    }
  });

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    if (nameInput.value.length < 2) {
      nameError.style.display = "block";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
      emailError.style.display = "block";
      isValid = false;
    }

    if (passwordInput.value.length < 6) {
      passwordError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted");
      registrationForm.reset();
    }
  });
});
