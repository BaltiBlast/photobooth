const express = require("express");
const router = express.Router();

const photobooth = require("./controllers/photobooth/photobooth.controller");
const { getPhotobooth, uploadPicture } = photobooth;

router.get("/", getPhotobooth);
router.post("/take-picture", uploadPicture);

module.exports = router;
