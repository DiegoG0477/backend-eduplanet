const express = require('express');
const router = express.Router();
const videoController = require("../controllers/video.controller")
const middlewares = require("../middlewares/auth.middleware")


router.get("/videos/:id", videoController.getVideos)
router.post("/video", middlewares.verifyToken, videoController.createVideo)
router.delete("/video/:id", middlewares.verifyToken, videoController.deleteVideo)
router.put("/video/:id", middlewares.verifyToken, videoController.putVideo)
router.get("/video/:id", videoController.getById)

module.exports = router;