import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Posts",
    },

    body: {
      type: String,
      default: "",
    },

    file: {
      id: {
        type: String,
        default: "",
      },
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
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

// userSchema.plugin(paginate);
// userSchema.plugin(aggregatePaginate);

const Comment = mongoose.model("Comments", commentSchema);

export default Comment;
