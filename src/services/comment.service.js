import { Post } from "../models/post.models";

class postService {
  constructor() {}

  async createPost(newPost) {
    const newPostData = await Post.create(newPost);

    return newPostData;
  }

  async findOne(filter) {
    const post = await Post.findOne(filter);

    return post;
  }

  async findById(id) {
    const post = await Post.findById(id).populate([
      {
        path: "posts",
        select: ["title", "body"],
      },
      {
        path: "user",
        select: ["userName"],
      },
    ]);
    return post;
  }

  async findAll(filter = {}) {
    const posts = await Post.find(filter).populate([
      {
        path: "posts",
        select: ["title", "body"],
      },
      {
        path: "user",
        select: ["userName"],
      },
    ]);
    return post;
  }

  async update(id, updateData = {}) {
    const Post = await Post.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return task;
  }
  async delete(id) {
    const post = await Task.findByIdAndUpdate(id);
    return post;
  }
}

module.exports = new postService();
