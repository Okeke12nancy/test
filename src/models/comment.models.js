import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    posts: {
      type: mongoose.Types.ObjectId,
      ref: "Posts",
    },

    comments: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },

    deletedAt: {
      type: timestamps,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

commentSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);

const Comment = mongoose.model("Comments", commentSchema);

export default Comment;
