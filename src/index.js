require("dotenv").config();
require("./configs/db.config")
const express = require("express");
const app = express();
const cors = require('cors');

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const blogRouter = require("./routes/blog.routes")
const videosRouter = require("./routes/video.routes")
const comentariosRouter = require("./routes/comments.routes")


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./blog_imagen",
}));

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/blogs", blogRouter);
app.use("/v1/videos", videosRouter);
app.use("/v1/comentarios", comentariosRouter);

app.listen(PORT, () => {
  console.log("corriendo en el puerto " + PORT);
});