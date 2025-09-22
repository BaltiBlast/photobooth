const fs = require("fs");

const photobooth = {
  getPhotobooth: (req, res, next) => {
    res.render("photobooth");
  },

  uploadPicture: async (req, res, next) => {
    const picture = await fs.readFileSync("./public/assets/test.jpg");
    try {
      console.log("PICTURE FROM", picture);
      return res.send("BIEN RECU");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Erreur de lecture du fichier");
    }
  },
};

module.exports = photobooth;
