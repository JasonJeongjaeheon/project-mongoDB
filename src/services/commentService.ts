import Post from '../models/post'
import Comment from '../models/comment'

const getCommentInfo = async(postId: string, userId: string) => {
    const data = await Comment.findOne({
        post_id: postId,
        user_id: userId
    })

    return data
}

const uploadComment = async(userId: string, postId: string, textByUser: string) => {

    await Comment.create({
        post_id: postId
    })

    await Comment.findOneAndUpdate(
        { post_id: postId},
        { $set: {
            user_id: userId,
            comment: textByUser
        }},
        { new: true }
        )
        .then(data => console.log(data))
        .catch((err) => console.log(err.message))
}

const deleteComment = async(commentId: string) => {

    await Comment.deleteOne(
        { _id: commentId }
        )
        .then(data => console.log(data))
        .catch((err) => console.log(err.message))
}

export {
    getCommentInfo,
    uploadComment,
    deleteComment
}