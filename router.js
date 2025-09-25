const express = require("express");
const router = express.Router();

const { getPhotobooth, uploadPicture, deletePicture } = require("./controllers/photobooth/photobooth.controller");

router.get("/", getPhotobooth);
router.post("/take-picture", uploadPicture);
router.delete("/delete-picture/:key", deletePicture);

module.exports = router;
