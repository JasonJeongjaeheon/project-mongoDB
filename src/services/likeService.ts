import Post from '../models/post'
import Like from '../models/like'

const getLikeInfoByUserId = async(userId: string, postId: string): Promise<any> => {
    return await Like.findOne({
        like_users: userId
    })
}

const postLike = async(userId: string, postId: string): Promise<any> => {

    const isExistLike = await Like.findOne({
        user_id: userId,
        post_id: postId,
        like_users: [userId]
    })

    if(isExistLike){
        throw new Error('User already like this post')
    }
        await Like.create({
            user_id: userId,
            post_id: postId,
            like_users: [userId]
        })
        .then(data => console.log('postlike', data))
        .catch((err) => console.log(err.message))

        await Post.findByIdAndUpdate(postId, {
            $inc: { like_count: 1 }
        })
        .then(data => console.log('postlike2', data))
        .catch((err) => console.log(err.message))
}

const deleteLike = async(userId: string, postId: string): Promise<any> => {

    const isExistLike = await Like.findOne({
        user_id: userId,
        post_id: postId,
        like_users: [userId]
    })

    if(isExistLike)
        await Like.findOneAndUpdate(
            {
            post_id: postId
            },
            {
                $pull: {
                    like_users: {
                        $in: [userId]
                    }
                }
            },
            {
                new: true
            }
            )

        await Post.findByIdAndUpdate(postId, { $unset: { like_count: -1 }})
}

export {
    getLikeInfoByUserId,
    postLike,
    deleteLike
}