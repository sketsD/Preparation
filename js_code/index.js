/*Створіть змінну, яка зберігає ім'я користувача. Виведіть значення цієї змінної в консоль.
Створіть змінну, яка зберігає вік користувача. Перетворіть цю змінну на рядок і виведіть тип цієї змінної в консоль.
Створіть змінну, яка зберігає число "10" і додайте до нього рядок "20". Виведіть результат і його тип. */

const fName = "Dmytro";
console.log(fName);
let age = 20;
console.log(typeof age.toString());
const ten = 10;
console.log(ten + "20");
console.log(ten + +"20");

/*Напишіть функцію, яка приймає два числа і повертає їх суму.
Напишіть функцію, яка приймає рядок і повертає його в верхньому регістрі.
Напишіть функцію, яка приймає масив чисел і повертає новий масив з квадратами цих чисел. */

const add = function (a, b) {
  if (!Number(a) || !Number(b)) return "Not a number";
  return Number(a) + Number(b);
};
console.log(add(2, "9"));

function upperCase(text) {
  return text.toUpperCase();
}
console.log(upperCase("Some text"));

const square = function (array) {
  const squared = array.map((num) => num ** 2);
  return squared;
};

console.log(square([1, 5, 7, 7, 9, 10848]));

/*Створіть об'єкт, який представляє книгу з властивостями title, author та year.
Додайте нову властивість genre до об'єкта книги.
Видаліть властивість year з об'єкта книги. */

const book = {
  title: "",
  author: "",
  year: "",
};
book.genre = "";
console.log(book);

delete book.year;
console.log(book);

/* Створіть асинхронну функцію, яка повертає "Hello, World!" через 1 секунду.
Викличте цю функцію і виведіть результат в консоль.
Використовуйте try/catch для обробки помилки в асинхронній функції, яка кидає помилку. */
function helloWorld(sec) {
  try {
    setTimeout(function () {
      console.log("hello world!");
    }, sec * 1000);
  } catch (err) {
    console.log(err);
  }
}

helloWorld(4);
/* Створіть масив з трьох імен. Додайте нове ім'я до кінця масиву і виведіть його.
Видаліть перший елемент масиву і виведіть його.
Знайдіть індекс елемента зі значенням "John" в масиві ["Mike", "John", "Sara"].*/
const names = ["Mike", "John", "Sara", "Vitalik", "Oleg"];
console.log(names);
console.log(names.shift());
console.log(names);
names.forEach((name) => name === "John" && console.log(name));
// __________________________________________________________________________________________

/*Створіть проміс, який резолвиться через 2 секунди з повідомленням "Promise resolved!".
Використовуйте then для виведення повідомлення, коли проміс буде резолвлено.
Створіть проміс, який відхиляється з помилкою "Promise rejected!" та обробіть цю помилку за допомогою catch. */

async function somePromise() {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise resolved!"), 2 * 1000);
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
const oleg = somePromise();

// __________________________________________________________________________________________
const data = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise Solved!"), 3 * 1000);
}).then((res) => console.log(res));
// __________________________________________________________________________________________

const notSolved = async function (seconds) {
  try {
    const rejected = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise not rejected");
      }, seconds * 1000);
      setTimeout(() => {
        reject("Promise rejected");
      }, 5 * 1000);
    });
    console.log(rejected);
  } catch (err) {
    console.error(err);
  }
};
notSolved(4);
notSolved(10);

// __________________________________________________________________________________________
