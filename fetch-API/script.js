console.log(navigator);
const btn = document.querySelector(".cachecPercent");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
    console.log(navigator.serviceWorker);
  });
  btn.addEventListener("click", () => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      console.log("Received response from Service Worker:", event.data);
    };

    navigator.serviceWorker.controller.postMessage(
      ["percentage"],
      [messageChannel.port2]
    );
    console.log("Send percentage request");
  });
}
