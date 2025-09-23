const { uploadToWasabi, getFormattedPictureName, deleteFromWasabi } = require("../../models/wasabi.model.js");
const { spawn } = require("child_process");

const photobooth = {
  getPhotobooth: (req, res, next) => {
    res.render("photobooth");
  },

  uploadPicture: async (req, res, next) => {
    const pictureNameFormated = await getFormattedPictureName();

    try {
      const picture = await photobooth.capturePicture();
      const upload = await uploadToWasabi(picture, pictureNameFormated);
      return res.send(upload);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Erreur de lecture du fichier");
    }
  },

  deletePicture: async (req, res, next) => {
    const key = req.params.key;

    try {
      await deleteFromWasabi(key);
      res.send("SUPPRESSION OK");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression");
    }
  },

  capturePicture: async () => {
    return new Promise((resolve, reject) => {
      const gphoto = spawn("gphoto2", ["--capture-image-and-download", "--stdout"]);
      const chunks = [];

      gphoto.stdout.on("data", (chunk) => chunks.push(chunk));
      gphoto.on("error", reject);

      gphoto.on("close", (code) => {
        code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(`gphoto2 exited with code ${code}`));
      });
    });
  },
};

module.exports = photobooth;
