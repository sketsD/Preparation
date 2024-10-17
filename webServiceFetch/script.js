if ("serviceWorker" in navigator) {
  console.log(navigator);
  console.log("Service on");
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("./sw.js")
  );
}
const block = document.querySelector(".textBlock");
const btn = document.querySelector(".addText");
const textArea = document.querySelector("textarea");

btn.addEventListener("click", (e) => {
  let textAreaValue = textArea.value;
  const pElement = `<div style="min-height: 30px; width: 100px; margin-bottom: 10px; border:solid 1px black"><p >${textAreaValue}</p></div>`;
  block.insertAdjacentHTML("beforeend", pElement);
  textArea.value = "";
});

async function syncData() {
  if (navigator.onLine) {
    try {
      const response = await fetch("/api/sync", {
        method: "POST",
        body: JSON.stringify({ data: localData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Data synchronized successfully:", data);
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  } else {
    console.log("No internet connection, data will be synced later.");
  }
}

window.addEventListener("online", syncData);
