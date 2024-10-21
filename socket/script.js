"use strict";

const ws = new WebSocket("https://localhost:8080");
const messagesField = document.querySelector(".messages");

const userListElement = document.querySelector(".users-box");
const messageArea = document.getElementById("messageArea");
const btnSend = document.querySelector(".send-msg");
const btnDisconnect = document.querySelector(".disconnect-btn");

ws.onopen = () => {
  const userName = prompt("Enter your name : ");
  console.log(JSON.stringify({ type: "userName", userName: userName }));
  ws.send(JSON.stringify({ type: "userName", userName: userName }));
};
const printMessage = function (messageText) {
  const li = document.createElement("li");
  li.innerText = messageText;
  messagesField.appendChild(li);
  li.scrollIntoView({ behavior: "smooth" });
};

const updateUsersList = function (users) {
  console.log("once");
  userListElement.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    console.log(user);
    li.textContent = `${user.userName} `;
    userListElement.appendChild(li);
  });
};

btnSend.addEventListener("click", () => {
  const message = messageArea.value;
  ws.send(JSON.stringify({ content: message }));
  messageArea.value = "";
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "onlineUsers") {
    console.log(data);
    updateUsersList(data.users);
  }

  if (data.type === "message") {
    printMessage(`Повідомлення від ${data.from}: ${data.content}`);
    console.log(`Повідомлення від користувача ${data.from}: ${data.content}`);
  }
};

ws.onclose = () => {
  alert("You`re offline");
};

btnDisconnect.addEventListener("click", () =>
  ws.send(JSON.stringify({ exit: "exit" }))
);
