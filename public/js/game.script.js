const asteroideData = {
  life: 2,
  props: document.getElementById("propsAsteroide"),
};

const countdown = {
  duration: 60,
  container: document.getElementById("gameCountdown"),
};

const game = {
  init: () => {
    kickAsteroide();
    startCountdown(60);
  },

  // ============================================================================== //
  // Asteroide hit animation //
  // ============================================================================== //
  kickAsteroide: () => {
    document.addEventListener("keyup", (e) => {
      if (asteroideData.life === 0) return;
      if (e.code === "Space") {
        decreaseAsteroideLife();
        asteroideData.props.style.transition = "scale 100ms ease-out";
        asteroideData.props.style.scale = "0.9";

        setTimeout(() => {
          asteroideData.props.style.scale = "1";
        }, 120);
      }
    });
  },

  // ============================================================================== //
  // Manager asteroide's life //
  // ============================================================================== //
  decreaseAsteroideLife: () => {
    if (asteroideData.life === 0) {
      // TRIGGER END GAME & REBOOT STATE
      return console.log("ASTEROID KILLED");
    }
    asteroideData.life = asteroideData.life - 1;
    console.log(asteroideData.life);
  },

  // ============================================================================== //
  // COUNTDOWN //
  // ============================================================================== //
  startCountdown: (duration) => {
    let remaining = duration;
    countdown.container.textContent = remaining;

    const tick = setInterval(() => {
      remaining--;
      countdown.container.textContent = remaining;
      if (remaining <= 0) clearInterval(tick);
    }, 1000);
  },
};

const { kickAsteroide, decreaseAsteroideLife, startCountdown } = game;

document.addEventListener("DOMContentLoaded", game.init());
