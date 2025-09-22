const express = require("express");
const router = express.Router();

const photobooth = require("./controllers/photobooth/photobooth.controller");
const { getPhotobooth, uploadPicture, deletePicture } = photobooth;

router.get("/", getPhotobooth);
router.post("/take-picture", uploadPicture);
router.delete("/delete-picture/:key", deletePicture);

module.exports = router;
