import Post from '../models/post'
import Like from '../models/like'

const getPostLikeByUserId = async(userId: string): Promise<any> => {
    return await Like.findOne({
        like_users: userId
    })
}

const postLike = async(userId: string, postId: string): Promise<any> => {

    const isExistLike = await Like.findOne({
        post_id: postId,
        like_users: userId
    })

    if(isExistLike){
        throw new Error('User already like this post')
    }   
        await Like.findOneAndUpdate(
            { post_id: postId },
            { $push: { like_users: userId } },
            { new: true }
        )

        await Post.findByIdAndUpdate(postId, 
            { $inc: { like_count: 1 }
        })
}

const deleteLike = async(userId: string, postId: string): Promise<any> => {

    const isExistLike = await Like.findOne({
        post_id: postId,
        like_users: userId
    })

    if(isExistLike)
        await Like.findOneAndUpdate(
            { post_id: postId },
            { $pull: { like_users: userId } },
            { new: true }
            )

        await Post.findByIdAndUpdate(postId, 
            { $inc: { like_count: -1 }
        })
}

export {
    getPostLikeByUserId,
    postLike,
    deleteLike
}