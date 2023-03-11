const express = require("express");

import { PostController } from "../controllers/post.contollers";
import { isAuthorized } from "../middlewares/authorize.middleware";

const postRouter = express.Router();

const isAuthorized = new isAuthorized();
const postController = new PostController();

postRouter.post("/post", postItController.create);
postRouter.get("posts", postItController.findAll);
postRouter.get("/posts/:id", postItController.findById);
postRouter.put("/posts/:id", postItController.update);
postRouter.delete("/posts/:id", postItController.delete);

module.exports = postRouter;
