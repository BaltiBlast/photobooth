const modalPicturePreview = document.getElementById("modalPicturePreview");
const busyLoader = document.getElementById("busyLoader");
const img = document.getElementById("pictureTaken");
const busy = (state) => busyLoader.toggleAttribute("hidden", !state);
let currentPicture;
let isCapturing = false;

const photobooth = {
  init: () => {
    startLiveCamera();
    onTakePicture();
  },

  // ============================================================================== //
  // Starting external camera //
  // ============================================================================== //
  startLiveCamera: async () => {
    const video = document.getElementById("video");

    const constraints = {
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        aspectRatio: { ideal: 16 / 9 },
        frameRate: { ideal: 30, max: 60 },
      },
      audio: false,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
  },

  // ============================================================================== //
  // Spacebar event who trigger picture take //
  // ============================================================================== //
  onTakePicture: () => {
    const countdown = document.getElementById("countdown");

    window.addEventListener("keydown", async (event) => {
      if (modalPicturePreview.open || event.code !== "Space" || isCapturing) return;

      event.preventDefault();
      isCapturing = true;

      for (let i = 3; i >= 1; i--) {
        countdown.textContent = i;
        await new Promise((r) => setTimeout(r, 1000));
      }
      countdown.textContent = "";

      try {
        setTimeout(() => {
          busy(true);
        }, 2000);

        const res = await fetch("/take-picture", { method: "POST" });
        const data = await res.json();
        currentPicture = { ...data };

        displayPictureModal(currentPicture);
      } catch (error) {
        console.error("❌ Erreur :", error);
      } finally {
        busy(false);
        isCapturing = false;
      }
    });
  },

  // ============================================================================== //
  // Display modal with picture taken
  // ============================================================================== //
  displayPictureModal: (data) => {
    img.src = data.url;
    modalPicturePreview.showModal();
    pictureTakenValidation();
  },

  // ============================================================================== //
  // Manager form picture
  // ============================================================================== //
  pictureTakenValidation: () => {
    window.addEventListener("keydown", async (event) => {
      if (!modalPicturePreview.open) return;

      if (event.key.toLowerCase() === "y") {
        currentPicture = null;
        modalPicturePreview.close();
      }

      if (event.key.toLowerCase() === "n") {
        await deletePicture(currentPicture.key);
        currentPicture = null;
        modalPicturePreview.close();
      }
    });
  },

  // ============================================================================== //
  // Requete to delete picture with her key
  // ============================================================================== //
  deletePicture: async (key) => {
    try {
      busy(true);
      await fetch(`/delete-picture/${key}`, { method: "DELETE" });
    } catch (err) {
      console.error("Erreur suppression photo :", err);
    } finally {
      img.src = null;
      busy(false);
    }
  },
};

const { startLiveCamera, onTakePicture, displayPictureModal, pictureTakenValidation, deletePicture, countdownTimer } =
  photobooth;

document.addEventListener("DOMContentLoaded", photobooth.init());
