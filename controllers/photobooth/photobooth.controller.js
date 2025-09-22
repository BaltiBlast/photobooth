const { uploadToWasabi, getFormattedPictureName } = require("../../models/wasabi.model.js");
const fs = require("fs");

const photobooth = {
  getPhotobooth: (req, res, next) => {
    res.render("photobooth");
  },

  uploadPicture: async (req, res, next) => {
    const picture = fs.readFileSync("./public/assets/test.jpg");
    const pictureNameFormated = await getFormattedPictureName();

    try {
      const upload = await uploadToWasabi(picture, pictureNameFormated);
      return res.send(upload);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Erreur de lecture du fichier");
    }
  },
};

module.exports = photobooth;
