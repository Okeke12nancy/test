import logger from "../helpers/logger.helpers.js";
import handleResponse from "../helpers/response.helpers.js";
import CommentService from "../services/comment.service.js";
import PostService from "../services/post.service.js";
import UserService from "../services/user.service.js";

// new imports
import cloudinary from "../utils/cloudinary.utils";
import multer from "../utils/multer.utils";

export class CommentController {
  async createComment(req, res) {
    logger.debug("Creating comment");
    try {
      const data = req.body;
      const user = req.user;

      // add comment to a post
      const comment = await CommentService.createOne({
        body: data.body,
        user: user._id,
        post: data.post,
        file: {
          id: result.url,
          url: result.public_id,
        },
      });

      if (comment) {
        await PostService.update(data.post, {
          $push: { comments: comment?.id },
        });
      }

      // if the comment has an image upload the image and update the comment model

      return handleResponse(
        201,
        "comment created successfully",
        { comment },
        res
      );
    } catch (e) {
      console.log(e);
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findOneComment(req, res) {
    logger.debug("Fetching comment");
    try {
      const { commentId } = req.params;

      const comment = await CommentService.findById(commentId);

      if (!comment) {
        return handleResponse(
          200,
          "comment does not exist or has been deleted",
          null,
          res
        );
      }

      return handleResponse(
        200,
        "comment fetched successfully",
        { comment },
        res
      );
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e);
    }
  }

  async findAllComment(req, res) {
    logger.debug("Fetching comments");
    try {
      const post = await this.Post.find({
        createdBy: req.user,
      }).populate();

      return handleResponse(200, "comment created successfully", { post });
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e);
    }
  }

  async updateOneComment(req, res) {
    logger.debug("Updating Comment");
    try {
      const findId = await CommentService.findById(req.params.commentId);

      if (!findId) {
        return res.json({
          msg: "comment not found",
          success: false,
        });
      }

      await CommentService.findByIdAndUpdate(req.params.commentId, req.body, {
        new: true,
      });
      return handleResponse(200, "Comment created successfully", {
        comment,
      });
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e);
    }
  }

  async delete(req, res) {
    logger.debug("Deleting comment");
    try {
      const findId = await CommentService.findById(req.params.postId);

      if (!findId) {
        return res.json({
          msg: "Comment not found",
          success: false,
        });
      }

      await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
        new: true,
      });
      return handleResponse(200, "comment deleted  successfully", {
        comment,
      });
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e);
    }
  }
}

export default new CommentController();
