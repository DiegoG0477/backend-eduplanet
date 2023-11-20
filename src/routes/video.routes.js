const express = require('express');
const router = express.Router()

const videoController = require("../controllers/video.controller")
const {verifyToken} = require("../middlewares/auth.middleware")

router.get("/:id", videoController.getVideos)
router.post("/",verifyToken, videoController.createVideo)
router.delete("/:id",verifyToken, videoController.deleteVideo)
router.put("/:id",verifyToken, videoController.putVideo)
router.get("/:id", videoController.getById)

module.exports = router