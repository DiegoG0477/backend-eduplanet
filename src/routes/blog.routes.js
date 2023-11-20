const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blogs.controller");
const middlewares = require("../middlewares/auth.middleware");

router.post("/", middlewares.verifyToken, blogControllers.postBlog);
router.get("/blog", blogControllers.getBlogs);
router.put("/blog/:id", middlewares.verifyToken,blogControllers.putBlog);
router.delete("/blog/:id", middlewares.verifyToken,blogControllers.deleteBlog);
router.get("/blog/:id", middlewares.verifyToken, blogControllers.getByIdBlog);

module.exports = router;