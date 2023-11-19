const express = require('express');
const router = express.Router();

const commentController = require("../controllers/comments.controller")
const {verifyToken} = require("../middlewares/auth.middleware")

router.get("/comentarios/:id", commentController.getAllCommentBlog)
router.get("/comentario/:id",verifyToken,commentController.getById)
router.post("/comentario/:id", verifyToken,commentController.postComment)
router.delete("/comentario/:id",verifyToken,commentController.deletedComment)
module.exports = router;