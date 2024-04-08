import Comment from "../models/commentModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

//@desc Fetch all products
//@route Get /api/products
//@access Public
const getComments = asyncHandler(async (req, res) => { 
  const comments = await Comment.find()

  if (comments) {
    return res.json(comments)
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});


//@desc create products
//@route Get /api/products
//@access Private/Admin
const createComment = asyncHandler(async (req, res) => {

    const { content } = req.body 

  const comment = new Comment({
    user: req.user._id,
    content: content,
  });

  const createComment = await comment.save();

  res.status(201).json(createComment);
});

//@desc updateProduct
//@route Get /api/products
//@access Private Admin
const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (comment) {
    comment.content = content
    const updateComment = await comment.save();
    res.json(updateComment);
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (comment) {
    await Comment.deleteOne({ _id: comment._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const createReply = asyncHandler(async (req, res) => {
  const { content, replyingTo } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (comment) {

    const reply = {
      content,
      user: req.user._id,
      replyingTo
    }

    comment.replies.push(reply)

    await comment.save()

    res.status(200).json({message: 'Reply Added'})

  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

const updateReply = asyncHandler(async (req, res) => {
    const { content, replyId } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (comment) {
      comment.replies.map(reply => {
        if (reply.id === replyId){
          reply.content = content
        } else {
          return reply
        }
      })

      const updateComment = await comment.save();
      res.json(updateComment);
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
});

const deleteReply = asyncHandler(async (req, res) => {
    const { replyId } = req.body;

    const comment = await Comment.findById(req.params.id);
    if (comment) {
        const updatedReplies = comment.replies.filter(reply => reply.id !== replyId)

        comment.replies = updatedReplies
        const updatedComment = await comment.save()
      res.status(200).json(updatedComment);
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  });


export {
    getComments,
    createComment,
    createReply,
    updateComment,
    updateReply,
    deleteComment,
    deleteReply
}