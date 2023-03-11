const express = require("express");
import { CommentController } from "../controllers/comment.contollers";
import { isAuthorized } from "../middlewares/authorize.middleware";

const isAuthorized = new isAuthorized();
const authController = new AuthController();

commentRouter.post("/post", commentController.create);
commentRouter.get("posts", commentController.findAll);
commentRouter.get("/posts/:id", commentController.findById);
commentRouter.put("/posts/:id", commentController.update);
commentRouter.delete("/posts/:id", commentController.delete);

module.exports = commentRouter;
