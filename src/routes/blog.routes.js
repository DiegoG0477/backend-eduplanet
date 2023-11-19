const express = require("express")
const router = express.Router()
const blogControllers = require("../controllers/blogs.controller")

const {verifyToken} = require("../middlewares/auth.middleware")

router.post("/",verifyToken,blogControllers.postBlog)
router.get("/", blogControllers.getBlogs)
router.put("/:id",verifyToken,blogControllers.putBlog)
router.delete("/:id",verifyToken,blogControllers.deleteBlog)
router.get("/:id",verifyToken, blogControllers.getByIdBlog)

module.exports = router