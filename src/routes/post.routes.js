import express from "express";
const postRouter = express.Router();
import commentController from "../controllers/comment.controllers.js";

import postController from "../controllers/post.controllers.js";
import { isAuthorized } from "../middlewares/authorize.middleware.js";

postRouter.post("/", isAuthorized, uploadFiles, postController.createPost);
postRouter.get("/", postController.findAllPosts);
postRouter.get("/all/by-author", isAuthorized, postController.findAuthorPosts);
postRouter.get("/:postId", postController.findOnePost);
postRouter.patch("/:postId", postController.updateOnePost);
postRouter.delete("/:postId", postController.deleteOnePost);

export default postRouter;
