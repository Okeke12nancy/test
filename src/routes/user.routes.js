const express = require("express");

import { UserController } from "../controllers/user.controllers";
import { isAuthorized } from "../middlewares/authorize.middleware";

const userRouter = express.Router();

const isAuthorized = new isAuthorized();
const userController = new userController();

userRouter.post("/post", userController.create);
userRouter.get("posts", userController.findAll);
userRouter.get("/posts/:id", userController.findById);
userRouter.put("/posts/:id", userController.update);
userRouter.delete("/posts/:id", userController.delete);

//Check this
userRouter.get("/users/:id/posts", userController.findOneUserPostById);
userRouter.get("/users/:id/posts/:id", userController.findUserPostsById);
userRouter.get("/users/:id/posts/comments", userController.findOneUsercomment);
userRouter.get(
  "/users/:id/posts/comments/:id",
  userController.findUserCommnetById
);

userRouter.get("/users/@user", userController.findUserByHandle);
userRouter.get("/users/@user/posts", userController.findUserPostsByHandle);
module.exports = userRouter;
