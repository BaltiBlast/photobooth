const modalPicturePreview = document.getElementById("modalPicturePreview");
let currentPicture;
let isCapturing = false;

const photobooth = {
  init: () => {
    startLiveCamera();
    spaceBarEvent();
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
  spaceBarEvent: () => {
    window.addEventListener("keydown", async (event) => {
      if (modalPicturePreview.open || event.code !== "Space" || isCapturing) return;

      event.preventDefault();
      isCapturing = true;

      try {
        const res = await fetch("/take-picture", { method: "POST" });
        const data = await res.json();
        currentPicture = { ...data };
        displayPictureModal(currentPicture);
      } catch (error) {
        console.error("❌ Erreur :", error);
      } finally {
        isCapturing = false;
        console.log("final trigger");
      }
    });
  },

  // ============================================================================== //
  // Display modal with picture taken
  // ============================================================================== //
  displayPictureModal: (data) => {
    const img = document.getElementById("pictureTaken");
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
  // Manager form picture
  // ============================================================================== //
  deletePicture: async (key) => {
    fetch(`/delete-picture/${key}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((msg) => console.log(msg))
      .catch((err) => console.error("Erreur suppression photo :", err));
  },
};

const { startLiveCamera, spaceBarEvent, displayPictureModal, pictureTakenValidation, deletePicture } = photobooth;

document.addEventListener("DOMContentLoaded", photobooth.init());
