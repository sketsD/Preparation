const SIX_WEEKS = 42;
const DATE = new Date();
const CURRENT_DAY = DATE.getDate();
const CURRENT_MONTH = DATE.getMonth();
const CURRENT_YEAR = DATE.getFullYear();

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SHORTWEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const updateWeekDaysSize = function () {
  const weekdaysCalendar = document.querySelectorAll(".calendar-body-weekday");
  const isSmallScreen = window.innerWidth <= 780;
  weekdaysCalendar.forEach((day, index) => {
    if (isSmallScreen) {
      day.textContent = SHORTWEEKDAYS[index];
    } else {
      day.textContent = WEEKDAYS[index];
    }
  });
};

// let data = [
//   {
//     "2024/7/30": [
//       {
//         id: 62306,
//         title: "Birthday",
//         todos: "Feel good",
//         done: false,
//       },
//     ],
//   },
//   {
//     "2024/8/24": [
//       {
//         id: 56472,
//         title: "Take Bobby",
//         todos: "Feel good kdkdkd",
//         done: true,
//       },
//     ],
//   },
//   {
//     "2024/8/28": [
//       {
//         id: 95921,
//         title: "Birthday 2024 25",
//         todos: "Feel good",
//         done: false,
//       },
//       {
//         id: 91198,
//         title: "Go to the clinic",
//         todos: "Be strong",
//         done: false,
//       },
//     ],
//   },
//   {
//     "2024/8/14": [
//       {
//         id: 91504,
//         title: "Birthday 2024 25",
//         todos: "Feel good",
//         done: false,
//       },
//       {
//         id: 95078,
//         title: "Go to the clinic",
//         todos: "Be strong",
//         done: false,
//       },
//       {
//         id: 95690,
//         title: "Birthday 2024 25",
//         todos: "Feel good",
//         done: false,
//       },
//       {
//         id: 94508,
//         title: "Go to the clinic",
//         todos: "Be strong",
//         done: false,
//       },
//       {
//         id: 63789,
//         title: "Mother's Birthday",
//         todos: "Buy a gift",
//         done: true,
//       },
//     ],
//   },
//   {
//     "2024/8/30": [
//       {
//         id: 62490,
//         title: "Mother's Birthday",
//         todos:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente obcaecati beatae, quod suscipit enim deleniti? Hic eaque labore aperiam minus, molestiae perferendis animi perspiciatis odio, fugit id quos sequi quidem!",
//         done: true,
//       },
//     ],
//   },
//   {
//     "2024/9/10": [
//       {
//         id: 60446,
//         title: "Mother's Birthday",
//         todos: "Buy a gift",
//         done: true,
//       },
//     ],
//   },
//   {
//     "2024/9/1": [
//       {
//         id: 49494,
//         title: "Mother's Birthday",
//         todos: "Buy a gift",
//         done: true,
//       },
//     ],
//   },
// ];

let yearChange = 0;
let monthChange = 0;
let dayChange = 0;
let clicked = null;
let id = null;
let sortedTodos = null;

let data = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.querySelector(".calendar-body--days-container");
const toDosContainer = document.querySelector(
  ".task-container__to-scroll--box"
);
const toDos = document.querySelectorAll(".tasks-container_todo");
const btnOpenForm = document.querySelector(".add-new-event");
const addNewTask = document.querySelector(".task-add-form__container");
const buttonToAdd = document.querySelector(".add-new-event");
const buttonCloseForm = document.querySelector(".close-btn");

const todosSelectedDay = document.querySelector(".tasks-main__plans-to-do");

const formAddEvent = document.querySelector(".task-add-form__container");
const titleNewTodo = document.querySelector(".name-event--input");
const bodyNewTodo = document.querySelector(".description-event--textarea");

const buttonsSort = document.querySelector(".todo-sort-buttons");
const btnSorted = document.querySelector(".sort-btn");
const btnDefault = document.querySelector(".default-btn ");
const hiddenDone = document.querySelector(".hidden-done--input");

const openForm = function () {
  toDos.forEach((todo) => todo.classList.add("hidden"));
  // debugger;
  addNewTask.classList.add("active");
  buttonToAdd.classList.remove("active");
  // dayCalendar.removeEventListener("click", callForm);
};

const closeForm = function () {
  toDos.forEach((todo) => todo.classList.remove("hidden"));
  addNewTask.classList.remove("active");
  buttonToAdd.classList.add("active");
  id = null;
  titleNewTodo.value = "";
  bodyNewTodo.value = "";
  hiddenDone.value = "false";
};

const isEvent = function (date) {
  const checkedDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  const response = data.find((dateDate) => dateDate[checkedDate])
    ? "event"
    : "";

  return response;
};

const insertTodo = function (id, title, todos, done = false) {
  return `<div data-id="${id}" class="tasks-container_todo ${
    done ? "active" : ""
  }">
            <div class="tasks-container_todo--left">
  
            <button class="tasks-container_todo-done done-btn-check btn-small">
              <svg class="check"
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                class="bi bi-check-lg" viewBox="0 0 16 16">
                <path
                  d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
              </svg>
                  </button>
                  <div class="tasks-container_todo-textbox">

                      <textarea name="todo-title" id="todo-title"
                          class="tasks-container_todo--title textarea-todo"readonly>${title}</textarea>

                      <textarea name="todo-content" id="todo-content" class="tasks-container_todo--content textarea-todo"
                          readonly>${todos}</textarea>
                  </div>
              </div>
              <div class="tasks-container_todo-buttons">
                  <button class="tasks-container_todo-delete close-delete-btn btn-small"><svg
                          class="delete" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                          fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                          <path
                              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg></button>
                  <button class="tasks-container_todo-edit edit-btn btn-small"><svg class="edit"
                          xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                          class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg></button>
              </div>
          </div>`;
};

const dayHTML = function (day, className1 = "", className2 = "") {
  return `<div class="day__box ${className1} ${className2}">
                <h4 class="day__box--num ">${day}</h4>
            </div>`;
};

const findTodoByDate = function (date) {
  const tasksForDate = data.find((tasks) => tasks[date]);
  return tasksForDate;
};

const createTodo = function (date, title = "", todos = "", idDone = false) {
  const isTodo = findTodoByDate(date);
  if (!isTodo) {
    data.push({
      [date]: [
        {
          id: Number(`${new Date().getTime()}`.slice(7, -1)),
          title,
          todos,
          done: false,
        },
      ],
    });
    localStorage.setItem("events", JSON.stringify(data));
    return;
  }
  if (isTodo) {
    if (id) {
      isTodo[date].forEach((dayEvent, i) => {
        if (dayEvent.id === id) {
          isTodo[date].splice(i, 1, {
            id,
            title,
            todos,
            done: idDone,
          });
        }
      });
      localStorage.setItem("events", JSON.stringify(data));
      id = null;
      return;
    }
    isTodo[date].push({
      id: Number(`${new Date().getTime()}`.slice(7, -1)),
      title,
      todos,
      done: idDone,
    });
    localStorage.setItem("events", JSON.stringify(data));
    return;
  }
};

const checkTodo = function (date, currentID) {
  let isTodo = findTodoByDate(date);
  isTodo[date] = isTodo[date].map((dayEvent) =>
    dayEvent.id === currentID
      ? { ...dayEvent, done: !dayEvent.done }
      : { ...dayEvent }
  );
  localStorage.setItem("events", JSON.stringify(data));
  // console.log(data);
  console.log(currentID);
  console.log(id);
  id = null;
};

const deleteTodo = function (date, currentID) {
  let isTodo = findTodoByDate(date);
  console.log(isTodo[date].length);
  if (isTodo[date].length === 1) {
    data = data.filter((el) => el[date] === isTodo.date);
  } else {
    isTodo[date] = isTodo[date].filter(
      (dayEvent) => dayEvent.id !== currentID && { ...dayEvent }
    );
  }
  localStorage.setItem("events", JSON.stringify(data));
  id = null;
};

const editTodo = function (currentID) {
  const thisTodo = findTodoByID(currentID, clicked);
  openForm();

  setDataToForm(thisTodo.title, thisTodo.todos, thisTodo.done);
  id = currentID;
};

const findTodoByID = function (id, date) {
  const todoArray = findTodoByDate(date);
  const toDoByID = todoArray[date].find((todo) => todo.id === id);
  return toDoByID;
};

const updateTodos = function (form, date) {
  form && closeForm();
  const events = findTodoByDate(date);
  todosSelectedDay.textContent = !events
    ? "You have no plans yet"
    : events[date].length > 1
    ? `You have ${events[date].length} things to do`
    : "One thing to do";

  events !== undefined && showSortedButns(events[date].length <= 1);
  events === undefined && openForm();
  if (!events) return;

  if (!sortedTodos) {
    btnSorted.classList.remove("active");
    toDosContainer.innerHTML = "";
    events[date].forEach((event) =>
      toDosContainer.insertAdjacentHTML(
        "afterbegin",
        insertTodo(event.id, event.title, event.todos, event.done)
      )
    );
  }
  const editBtn = document.querySelectorAll(".tasks-container_todo-edit");
  const deleteBtn = document.querySelectorAll(".close-delete-btn");
  const checkBtn = document.querySelectorAll(".done-btn-check");

  checkBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      if (!e.target.closest(".tasks-container_todo")) return;
      id = Number(e.target.closest(".tasks-container_todo").dataset.id);
      console.log("edit " + id);
      e.target.closest(".tasks-container_todo").classList.toggle("active");
      // setDoneTodo(id);

      checkTodo(clicked, id);
      sortedTodos && sortTodo();
    })
  );

  deleteBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      if (!e.target.closest(".tasks-container_todo")) return;
      const id = Number(e.target.closest(".tasks-container_todo").dataset.id);
      deleteTodo(clicked, id);
      let isSorted = sortedTodos;
      load();
      sortedTodos = isSorted;
      sortedTodos && sortTodo();
      console.log("here");
    })
  );

  editBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      if (!e.target.closest(".tasks-container_todo")) return;
      const id = Number(e.target.closest(".tasks-container_todo").dataset.id);
      editTodo(id);
    })
  );

  const textareas = document.querySelectorAll(".tasks-container_todo--content");
  textareas.forEach((textarea) => {
    textarea.addEventListener("click", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

    textarea.addEventListener("blur", function () {
      this.style.height = "";
    });
  });
};

const showSortedButns = function (value) {
  value
    ? buttonsSort.classList.add("hidden")
    : buttonsSort.classList.remove("hidden");
};
const update = function (date, form = false, isLoad = true) {
  const [day, month, year] = date;
  toDosContainer.innerHTML = "";
  calculateDifference(day, month, year);
  isLoad && load();
  showSortedButns(form);
  form && openForm();
};

const calculateDifference = function (day, month, year) {
  yearChange = year - CURRENT_YEAR;
  monthChange = month - CURRENT_MONTH;
  dayChange = day - CURRENT_DAY;
};

const changeMonthButtons = function () {
  document.querySelector(".prev-month").addEventListener("click", () => {
    dayChange = 0;
    monthChange--;
    load();
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    dayChange = 0;
    monthChange++;
    load();
  });
};

const changeDayButtons = function () {
  document.querySelector(".prev-day").addEventListener("click", () => {
    dayChange--;
    load();
  });

  document.querySelector(".next-day").addEventListener("click", () => {
    dayChange++;
    load();
  });
};

const addNewEvent = function (e) {
  e.preventDefault();
  if (!getDataFromForm()) return;
  const [titleEvent, todo, done] = getDataFromForm();
  createTodo(clicked, titleEvent, todo, done);
  // titleNewTodo.value = "";
  // bodyNewTodo.value = "";
  // done.value = "false";
  let isSorted = sortedTodos;
  load();
  sortedTodos = isSorted;
  // sortedTodos && btnSorted.addEventListener(".active");
  sortedTodos && sortTodo();
  closeForm();
};

const getDataFromForm = function () {
  const form = formAddEvent;
  const formData = new FormData(form);
  const titleEvent = formData.get("name-event");
  const todo = formData.get("description-event");
  const done = formData.get("hidden-done") === "false" ? false : true;
  if (!titleEvent || !todo) {
    alert("Please, enter all required fields!");
    return undefined;
  }
  return [titleEvent, todo, done];
};

const setDataToForm = function (titleByID, todoByID, doneByID) {
  titleNewTodo.value = titleByID;
  bodyNewTodo.value = todoByID;
  hiddenDone.value = doneByID;
};

const defaultLoad = function () {
  sortedTodos = null;
  updateTodos(true, clicked);
};

const sortTodo = function () {
  let sorting = btnSorted.classList.contains("down");
  let sorted = [];
  btnSorted.classList.add("active");
  const activeTodos = document.querySelectorAll(".tasks-container_todo");
  activeTodos.forEach((el) =>
    sorting
      ? el.classList.contains("active")
        ? sorted.unshift(el)
        : sorted.push(el)
      : el.classList.contains("active")
      ? sorted.push(el)
      : sorted.unshift(el)
  );
  toDosContainer.innerHTML = "";
  sorted.forEach((el) =>
    toDosContainer.insertAdjacentHTML("beforeend", el.outerHTML)
  );
  updateTodos(true, clicked);
};

const sortTodoToggle = function (e) {
  const btn = e.target.closest(".sort-btn");
  if (!btn) return;
  btn.classList.contains("up") && btn.classList.contains("down")
    ? btn.classList.remove("down")
    : btn.classList.add("down");

  sortedTodos = true;
  sortTodo();
};

const load = function () {
  todosSelectedDay.textContent = "You have no plans yet";
  sortedTodos = null;
  const currentDate = new Date();
  if (yearChange !== 0) {
    currentDate.setFullYear(currentDate.getFullYear() + yearChange);
  }
  if (monthChange !== 0) {
    currentDate.setMonth(currentDate.getMonth() + monthChange);
  }
  if (dayChange !== 0) currentDate.setDate(currentDate.getDate() + dayChange);

  const toDoDate = document.querySelector(".plans-to-do--date");
  toDoDate.textContent = `${currentDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })}`;

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  clicked = `${year}/${month}/${day}`;

  const fullLastDayOfCurrentMonth = new Date(year, month + 1, 0);
  const lastDayOfCurrentMonth = fullLastDayOfCurrentMonth.getDate();
  const fullFirstDayOfMonth = new Date(year, month, 1);

  const dateString = fullFirstDayOfMonth.toLocaleString("en-GB", {
    // Taking the day of the week
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const prevMonthDays = WEEKDAYS.indexOf(dateString.split(", ")[0]) || 7;
  // first day of the month and its dayweek allows to determine the amount of the days from prev month,
  // lets say first day of the month is tuesday, in the weekdays array its 1 so 1 day to be displayed from prev month
  // friday is 4 so should be 4 days from prev months.
  // To avoid to have two weeks of the next month in case the prev months ends exactly on monday and otherwise nothing is going to be displayed

  const nextMonthDays = SIX_WEEKS - lastDayOfCurrentMonth - prevMonthDays;

  const currentMonth = document.querySelector(".current-month");
  currentMonth.textContent = "";
  calendar.innerHTML = "";

  currentMonth.textContent = `${fullFirstDayOfMonth.toLocaleString("en-GB", {
    month: "long",
  })}  ${year}`;

  for (let i = 1; i <= SIX_WEEKS; i++) {
    // While index is less than days in six weeks which is 42days
    if (i <= prevMonthDays) {
      // while there are days in prev month from 1 to 7
      const thisDate = new Date(
        year,
        month,
        -prevMonthDays + i
        // Here is minus to count backwards in prev month -5+1 -5+2 ... -5-5
      );
      const lastDayOfMonth = thisDate.getDate();
      calendar.insertAdjacentHTML(
        "beforeend",
        dayHTML(lastDayOfMonth, "inactive", isEvent(thisDate))
      );
    } else if (i > prevMonthDays && i <= SIX_WEEKS - nextMonthDays) {
      // So the prevmonth days are ended now the main point is to segregate active month from the next month
      // Here are displayed days of the current month whatever it is
      const thisDate = new Date(
        year,
        month,
        i - prevMonthDays
        // Here is index which is (e.g. i = 5 and total prevMonthDays =3) 5 - 3 = 2 which is 2nd of the active month 29-3 = 26 33-3=30...
      );
      const currentDaysOfMonth = thisDate.getDate();
      const currentMonth = thisDate.getMonth();
      const currentYear = thisDate.getFullYear();

      if (
        currentDaysOfMonth === CURRENT_DAY &&
        currentMonth === CURRENT_MONTH &&
        currentYear === CURRENT_YEAR
        // This check for an exact day to be only one active day
      ) {
        calendar.insertAdjacentHTML(
          "beforeend",
          dayHTML(currentDaysOfMonth, "active", isEvent(DATE))
        );
      } else if (currentDaysOfMonth === day && currentMonth === month) {
        // currentDaysOfMonth which is done by the logic of icreased or decreased date depend on the day
        // and the month avoid dublicating of the selected days
        calendar.insertAdjacentHTML(
          "beforeend",
          dayHTML(currentDaysOfMonth, "selected", isEvent(thisDate))
        );
      } else {
        calendar.insertAdjacentHTML(
          "beforeend",
          dayHTML(currentDaysOfMonth, isEvent(thisDate))
        );
      }

      const date = [currentDaysOfMonth, currentMonth, currentYear];
      const dayCalendar = calendar.lastChild;
      console.log("Checking");
      if (
        (dayCalendar.classList.contains("active") &&
          dayChange === 0 &&
          dayCalendar.classList.contains("event")) ||
        (dayCalendar.classList.contains("selected") &&
          dayCalendar.classList.contains("event"))
      ) {
        console.log("here?");
        updateTodos(
          true,
          `${currentYear}/${currentMonth}/${currentDaysOfMonth}`
        );
        // } else if (
        //   dayCalendar.classList.contains("active") &&
        //   !dayCalendar.classList.contains("event")
        // ) {
        //   console.log("depth");
        //   update(date, true, false);
      } else if (
        (dayCalendar.classList.contains("selected") ||
          (dayCalendar.classList.contains("active") && dayChange === 0)) &&
        !dayCalendar.classList.contains("event")
      ) {
        console.log("step wrong");
        update(date, true, false);
      }

      dayCalendar.classList.contains("event")
        ? dayCalendar.addEventListener("click", (e) => {
            update(date);
            updateTodos(
              true,
              `${currentYear}/${currentMonth}/${currentDaysOfMonth}`
            );
          })
        : dayCalendar.addEventListener("click", (e) => update(date, true));
    } else {
      const thisDate = new Date(year, month, i - prevMonthDays);
      const nextDaysOfMonth = thisDate.getDate();
      calendar.insertAdjacentHTML(
        "beforeend",
        dayHTML(nextDaysOfMonth, "inactive", isEvent(thisDate))
      );
    }
  }
};

changeDayButtons();
changeMonthButtons();
load();

btnSorted.addEventListener("click", sortTodoToggle);

btnDefault.addEventListener("click", defaultLoad);
btnOpenForm.addEventListener("click", openForm);
buttonCloseForm.addEventListener("click", closeForm);
formAddEvent.addEventListener("submit", addNewEvent);
window.addEventListener("resize", updateWeekDaysSize);
window.addEventListener("load", updateWeekDaysSize);
