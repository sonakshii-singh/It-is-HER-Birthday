/* Music */
const music = document.getElementById("bgMusic");
let started = false;

function toggleMusic() {
  if (!started) {
    music.play();
    started = true;
  } else {
    music.paused ? music.play() : music.pause();
  }
}

/* Candle blow */
const flames = document.querySelectorAll(".flame");
const text = document.getElementById("wishText");

if (flames.length > 0 && navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const ctx = new AudioContext();
    const mic = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    mic.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    function listen() {
      analyser.getByteFrequencyData(data);
      let volume = data.reduce((a, b) => a + b) / data.length;

      if (volume > 60) {
        flames.forEach(f => {
          f.classList.add("off");
          const smoke = document.createElement("div");
          smoke.className = "smoke";
          f.parentElement.appendChild(smoke);
        });
        if (text) text.innerText = "✨ Wish made. Happy Birthday.";
      }
      requestAnimationFrame(listen);
    }
    listen();
  });
}
// Music moment: sirf cake page pe auto-start
if (window.location.pathname.includes("cake.html")) {
  setTimeout(() => {
    toggleMusic();
  }, 800);
}
