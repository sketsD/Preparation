"use strict";

const playAudio = function (audioUrl) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  fetch(audioUrl)
    .then((response) => response.arrayBuffer())
    .then((buffer) => audioContext.decodeAudioData(buffer))
    .then((decodedData) => {
      const source = audioContext.createBufferSource();
      source.buffer = decodedData;
      source.connect(audioContext.destination);
      source.start(0);
    })
    .catch((error) => console.error("Error loading audio:", error));
};

const getAudioTrackForLocation = function (latitude, longitude) {
  if (latitude > 50 && longitude > 30) {
    return "audio/track1.wav";
  } else if (latitude > 40 && longitude > 20) {
    return "audio/track2.wav";
  }
  console.log("You are out of any audio zone");
  return null;
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    console.log(`Current location: ${latitude}, ${longitude}`);
    playAudio(getAudioTrackForLocation(latitude, longitude));
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Service Worker Registered", reg))
    .catch((err) => console.log("Service Worker registration failed: ", err));
}
