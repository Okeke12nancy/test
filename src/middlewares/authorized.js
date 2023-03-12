class AuthorizeUsers{
    async authorizeDelete(req, res){
         logger.debug("Creating post");
 const commentId = req.params.id;
  const userId = req.user.id;
  try{
Comment.findById(commentId, (err, comment) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    if (!comment) {
      return res.status(500).json({
        error: "Error not found",
      });
    }
     if (comment.commentId != userId) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    } await PostService.update(req.params.postId, req.body, { new: true });

      return handleResponse(200, "post updated successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, {}, res);
    }
  }
}
    

    
async authorizeCommenters(req, res){
         logger.debug("Creating post");
        try{
    let comment_id = req.params.comment_id
    if(!mongoose.Types.ObjectId.isValid(comment_id)){
        return res.status(400).send({
            message: "Invalid Comment id",
            data:{}
        })
    }
   Comment.findOne({_id: comment_id}).then(async (comment)=>{
    if(!comment){
        return res.status(400).send({
            message: 'No comment found',
            data:{}
        })
    }else{
        let current_user= req.user
        if(comment.user_id != current_user._id){
        return res.status(400).send({
            message:'Access denied',
            data:{}
        })
     } else{
        try{

            await Comment.updateOne({_id:comment})
        }
