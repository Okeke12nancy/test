import logger from "../helpers/logger.helpers";
import handleResponse from "../helpers/response.helpers";
import { Post } from "../models/post.models";
import { commentService } from "../services/comment.service";

export class CommentController {
  constructor() {
    this.logger = logger;
    this.handleResponse = handleResponse;
    this.Comment = commentService;
  }

  async createComment({ data, user }) {
    this.logger.debug("Creating post");
    try {
      // create post
      const comment = await this.Comment.create({
        title: data.title,
        body: data.body,
        user: user._id,
        file: data.file,
      });

      //delete hidden fields

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: { no_of_comment: +1 },
        },
        { new: true }
      );
      return this.handleResponse(200, "post created successfully", { comment });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
  async findOneComment({ data, id }) {
    this.logger.debug("Creating post");
    try {
      const post = await this.Post.findById({
        createdBy: req.user,
      }).populate();

      return this.handleResponse(200, "post created successfully", { post });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async findAllComment({ data, id }) {
    this.logger.debug("Creating post");
    try {
      const post = await this.Post.find({
        createdBy: req.user,
      }).populate();

      return this.handleResponse(200, "post created successfully", { post });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async updateOneComment({ data, id }) {
    this.logger.debug("Updating Comment");
    try {
      const findId = await this.Comment.findById(req.params.commentId);

      if (!findId) {
        return res.json({
          msg: "Post not found",
          success: false,
        });
      }

      await this.Comment.findByIdAndUpdate(req.params.commentId, req.body, {
        new: true,
      });
      return this.handleResponse(200, "Comment created successfully", {
        comment,
      });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async delete({ data, id }) {
    this.logger.debug("Deleting comment");
    try {
      const findId = await this.Comment.findById(req.params.postId);

      if (!findId) {
        return res.json({
          msg: "Comment not found",
          success: false,
        });
      }

      await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
        new: true,
      });
      return this.handleResponse(200, "comment deleted  successfully", {
        comment,
      });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
}
