"use strict";
const UPTODATE = 2;

const selectedTheme = document.getElementById("theme");
const selectedLanguage = document.getElementById("language");

const defaultState = {
  language: "en",
  theme: "light",
  timestamp: Date.now(),
};

const deleteOldData = function (state) {
  const setData = state.timestamp;
  const currentTime = Date.now();
  const dataAge = currentTime - setData;
  if (dataAge > UPTODATE * 24 * 60 * 60 * 1000) {
    localStorage.removeItem("appState");
    return undefined;
  }
  return state;
};

const initialState = function () {
  let isValidState = JSON.parse(localStorage.getItem("appState"));
  let state = isValidState && deleteOldData(isValidState);

  if (!state) {
    state = defaultState;
    saveToLocalStorage(state);
  }
  return state;
};

const updateUI = function (state) {
  selectedTheme.value = state.theme;
  selectedLanguage.value = state.language;
  document.body.className = state.theme;
};
let appState = initialState();
updateUI(appState);

const changeTheme = function () {
  const theme = selectedTheme.value;
  updateState({ theme });
};

const changeLanguage = function () {
  const language = selectedLanguage.value;
  updateState({ language });
};

const updateState = function (newState) {
  const state = { ...appState, ...newState, ...{ timestamp: Date.now() } };
  try {
    saveToLocalStorage(state);
  } catch (err) {
    console.log("Can't cache user's data");
  }
  updateUI(state);
};

const saveToLocalStorage = function (newState) {
  try {
    const dataToSaveKey = new Blob(Object.keys(newState)).size;
    const dataToSaveValue = new Blob(Object.values(newState)).size;
    const totalToSave = dataToSaveKey + dataToSaveValue;
    const currentSotreUSageKeys = new Blob(Object.keys(localStorage)).size;
    const currentSotreUSageValues = new Blob(Object.values(localStorage)).size;
    const totalCurrent = currentSotreUSageKeys + currentSotreUSageValues;

    if (5 * 1024 * 1024 < totalToSave + totalCurrent)
      throw new Error("LocalStorage space exceeded");
    localStorage.setItem("appState", JSON.stringify(newState));
  } catch (err) {
    console.log(err.message);
  }
};

selectedTheme.addEventListener("change", changeTheme);
selectedLanguage.addEventListener("change", changeLanguage);

window.addEventListener("storage", (e) => {
  if (e.key === "appState") {
    appState = JSON.parse(e.newValue);
    updateUI(appState);
  }
});
