import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "Please type your comments"],
    },
    file: {
      type: String,
      default: "",
    },
    createdBy: {
      types: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comments",
      },
    ],

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

postSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret._v;
  },
});

postSchema.plugin(paginate);

// export default Post;

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);

const Post = mongoose.model("Posts", postSchema);

export default Post;
