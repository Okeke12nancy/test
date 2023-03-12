import logger from "../config/logger.config.js";
import PostService from "../services/post.service.js";
import handleResponse from "../helpers/response.helpers.js";

//new imports

import cloudinary from "../utils/cloudinary.utils";
import multer from "../utils/multer.utils";

export class PostController {
  async createPost(req, res) {
    logger.debug("Creating post");
    try {
      const user = req.user;
      const data = req.body;
      // create post
      const post = await PostService.createPost({
        title: data.title,
        body: data.body,
        createdBy: user?._id,
        file: {
          id: result.url,
          url: result.public_id,
        },
      });

      // file: data.file,

      return handleResponse(201, "post created successfully", { post }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }

  async findOnePost(req, res) {
    logger.debug("Fetching single post");
    try {
      const postId = req.params.postId;

      const post = await PostService.findById({
        _id: postId,
      });

      return handleResponse(200, "post fetched successfully", { post }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }

  async findAllPosts(req, res) {
    logger.debug("Creating post");
    try {
      const post = await PostService.findAll({});

      return handleResponse(200, "post fetched successfully", { post }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }

  async findAuthorPosts(req, res) {
    logger.debug("Fetching author's posts");
    try {
      const post = await PostService.findAll({
        createdBy: req.user?._id,
      });

      return handleResponse(200, "post fetched successfully", { post }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }

  async updateOnePost(req, res) {
    logger.debug("Updating post");
    try {
      const postExists = await PostService.findById(req.params.postId);

      if (!postExists) {
        return res.json({
          msg: "Post not found",
          success: false,
        });
      }

      await PostService.update(req.params.postId, req.body, { new: true });

      return handleResponse(200, "post updated successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }

  async deleteOnePost(req, res) {
    logger.debug("Deleting post");
    try {
      const postId = req.params.postId;

      const findId = await PostService.findOne({
        _id: postId,
      });

      if (!findId) {
        return res.json({
          msg: "Post not found",
          success: false,
        });
      }

      const res = await PostService.update(postId, {
        $set: {
          deleted: true,
          deletedAt: true,
        },
      });

      return handleResponse(200, "post deleted successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }
}

export default new PostController();
