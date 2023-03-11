import logger from "../config/logger.config";
import handleResponse from "";
import { Post } from "../models/post.models";
import {} from "";
import { postService } from "../services/post.service";
import { findById } from "../services/user.service";

export class PostController {
  constructor() {
    this.logger = logger;
    this.handleResponse = handleResponse;
    this.Post = postService;
  }

  async createPost({ data, user }) {
    this.logger.debug("Creating post");
    try {
      // create post
      const post = await this.Post.create({
        title: data.title,
        body: data.body,
        file: data.file,
      });

      //delete hidden fields

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: { no_of_post: +1 },
        },
        { new: true }
      );
      return this.handleResponse(200, "post created successfully", { post });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
  async findOnePost({ data, id }) {
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

  async findAllPosts({ data, id }) {
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

  async updateOnePost({ data, id }) {
    this.logger.debug("Creating post");
    try {
      const findId = await this.Post.findById(req.params.postId);

      if (!findId) {
        return res.json({
          msg: "Post not found",
          success: false,
        });
      }

      const updatedPost = await this.Post.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { new: true }
      );
      return this.handleResponse(200, "post created successfully", { post });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async deleteOnePost({ data, id }) {
    this.logger.debug("Creating post");
    try {
      // const category = await req.category.findOne({
      //   _id: req.params.categoryId,
      //   deleted: false,
      //   deletedAt: false,
      // });

      const findId = await this.Post.findOne({
        ...req.params.postId,
        deleted: false,
        deletedAt: false,
      });

      if (!findId) {
        return res.json({
          msg: "Post not found",
          success: false,
        });
      }

      const res = await this.Post.findByIdAndUpdate(findById, {
        $set: {
          deleted: true,
          deletedAt: true,
        },
      });

      return res;

      return this.handleResponse(200, "post deleted  successfully", { post });
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
}
