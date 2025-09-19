const express = require("express");
const router = express.Router();

const photobooth = require("./controllers/photobooth/photobooth.controller");
const { getPhotobooth } = photobooth;

router.get("/", getPhotobooth);

module.exports = router;
