import express from "express";
const userRouter = express.Router();
import userController from "../controllers/user.controllers.js";
import { isAuthorized } from "../middlewares/authorize.middleware.js";
import userOnlyController from "../controllers/usersOnlycontrollers";
import { UserValidator } from "../validations/user.validations";

const userValidator = new UserValidator();
userRouter.post("/post", userValidator.createUser(), userOnlyController.create);

userRouter.get("posts", isAuthorized, userOnlyController.findAll);
userRouter.get("/posts/:id", isAuthorized, userOnlyController.findById);
userRouter.put(
  "/posts/:id",
  isAuthorized,
  userValidator.updateUser(),
  userOnlyController.update
);
userRouter.delete(
  "/posts/:id",
  isAuthorized,
  userValidator.deleteUser,
  userOnlyController.delete
);

//Check this
userRouter.get("/users/:id/posts", userOnlyController.findOneUserPostById);
userRouter.get("/users/:id/posts/:id", userOnlyController.findUserPostsById);
userRouter.get(
  "/users/:id/posts/comments",
  userOnlyController.findOneUserComments
);
userRouter.get(
  "/users/:id/posts/comments/:id",
  userController.findUserCommentById
);

userRouter.get("/users/@user", userController.findUserByHandle);
userRouter.get("/users/@user/posts", userController.findUserPostsByHandle);

export default userRouter;
