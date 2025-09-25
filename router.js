const express = require("express");
const router = express.Router();

const { getPhotobooth, uploadPicture, deletePicture } = require("./controllers/photobooth/photobooth.controller");
const { getGame } = require("./controllers/game/game.controller");

router.get("/", getPhotobooth);
router.post("/take-picture", uploadPicture);
router.delete("/delete-picture/:key", deletePicture);

router.get("/game", getGame);

module.exports = router;
