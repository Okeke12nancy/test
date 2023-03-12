import Post from "../models/post.models.js";

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
        path: "createdBy",
        select: ["firstName", "lastName", "email", "role"],
      },
      {
        path: "commentedBy",
        select: ["userName"],
      },
      {
        path: "comment",
        select: ["userName"],
      },
    ]);
    return post;
  }

  async findAll(filter = {}) {
    const posts = await Post.find(filter).populate([
      {
        path: "createdBy",
        select: ["firstName", "lastName", "email"],
      },
      {
        path: "comments",
        select: ["body", "createdAt", "user"],
      },
    ]);

    return posts;
  }

  async update(id, updateData = {}) {
    const post = await Post.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return post;
  }
  async delete(id) {
    const post = await Task.findByIdAndUpdate(id);
    return post;
  }
}

export default new postService();
