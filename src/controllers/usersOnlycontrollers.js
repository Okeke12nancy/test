import User from "../models/user.models";
import { UserController } from "./user.controllers";
import { PostController } from "./post.controllers";
import { CommentController } from "./comment.controllers";

export class UserOnlyController extends UserController {
  constructor() {
    super();
  }
  async findUserPostsById(req, res) {
    this.logger.debug("Finding all posts by one user");
    try {
      const userId = req.params.id;
      const user = await this.User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Posts not found" });
      }

      // use the populate method to get all posts by the user
      const Post = PostController;
      const posts = await Post.find({ _id: userId });
      return res.json(posts);
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
  async findOneUserPostById(req, res) {
    this.logger.debug("Finding one post by one user");
    try {
      const userId = req.params.id;
      const postId = req.params.id;
      const Post = PostController;
      const posts = await Post.findOne({ _id: postId, userId: userId });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(posts);
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async findOneUserComments(req, res) {
    this.logger.debug("Finding one comment in a post by one user ");
    try {
      const Comment = CommentController;
      const comment = await Comment.findOne({
        post: req.params.postId,
        user: req.params.userId,
        _id: req.params.commentId,
      });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res.json(posts);
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
  async findUserCommentById(req, res) {
    this.logger.debug("Finding all comments by one user in a post");
    try {
      const comments = await CommentController.find({
        post: req.params.postId,
        user: req.params.userId,
      });

      if (!comments.length) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res.json(comments);
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
  async findUserByUserByUsername(req, res) {
    this.logger.debug("Finding a user by Username");
    try {
      const user = await UserController.find({ userName: req.params.userName });
      if (!comments.length) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res.json(user);
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }

  async findPostsByUserByUsername(req, res) {
    this.logger.debug("Finding posts by Username");
    try {
      const userName = req.params.userName;
      const posts = await PostController.find({ userName: userName });
      if (posts) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res.json(post);
    } catch (e) {
      this.logger.error(e);
      return this.handleResponse(500, e);
    }
  }
}

export default new UserOnlyController();
