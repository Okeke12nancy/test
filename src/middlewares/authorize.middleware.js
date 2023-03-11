// exports.authenticateCommenter = async (req, res, next) => {
//   const commentId = req.params.id;
//   const userId = req.user.id;

//   Comment.findById(commentId, (err, comment) => {
//     if (err) {
//       return res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//     if (!comment) {
//       return res.status(500).json({
//         error: "Error not found",
//       });
//     }

//     if (comment.commentId != userId) {
//       return res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//     req.comment = comment;
//     next();
//   });
// };

// exports.delete=(req,res)=>{
//     let comment_id = req.params.comment_id
//     if(!mongoose.Types.ObjectId.isValid(comment_id)){
//         return res.status(400).send({
//             message: "Invalid Comment id",
//             data:{}
//         })
//     }
//    PostComment.findOne({_id: comment_id}).then(async (comment)=>{
//     if(!comment){
//         return res.status(400).send({
//             message: 'No comment found',
//             data:{}
//         })
//     }else{
//         let current_user= req.user
//         if(comment.user_id != current_user._id){
//         return res.status(400).send({
//             message:'Access denied',
//             data:{}
//         })
//      } else{
//         try{

//             await PostComment.updateOne({_id:comment})
//         }
//     }
//    }
// }

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const userService = require("../services/user.service");

// Confirm it is an admin
exports.isAuthorized = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        statuscode: 401,
        status: "error",
        thetoken: `${req.headers.authorization}`,
        message: "No token provided",
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (token === undefined) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Token not found in the header",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // confirm that the token is valid
    if (!decodedToken) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Token is not valid",
      });
    }

    const userId = decodedToken.userId;

    // Check if Admin Id Exists in the admin database
    const user = await User.findById(userId);

    if (req.user !== user) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message:
          "Unauthorized Request! You are not allowed to make request to this endpoint",
      });
    } else {
      req.a;
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
