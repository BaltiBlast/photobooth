const photobooth = {
  init: () => {
    startLiveCamera();
  },

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
};

const { startLiveCamera } = photobooth;

document.addEventListener("DOMContentLoaded", photobooth.init());
