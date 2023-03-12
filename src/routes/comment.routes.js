import express from "express";
const commentRouter = express.Router();

import { uploadFiles } from "../utils/index.utils";
import { isAuthorized } from "../middlewares/authorize.middleware.js";
import commentController from "../controllers/comment.controllers.js";

commentRouter.post(
  "/",
  isAuthorized,
  uploadFiles,
  commentController.createComment
);
// commentRouter.get("/", commentController.findAll);
// commentRouter.get("/:id", commentController.findById);
// commentRouter.put("/:id", commentController.update);
// commentRouter.delete("/:id", commentController.delete);

export default commentRouter;
