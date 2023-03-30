import Like from '../models/like'
import Post from '../models/post'
import { getUserById } from './userService'

const uploadPost = async(userId: string, title: string, description: string, path: string) => {

        const userInfo = await getUserById(userId)

        const postData =  await Post.create({
            user_id: userId,
            user_email: userInfo.email,
            title,
            description,
            image_url: path
        }) 

        await Like.create({
            user_id: userId,
            post_id: postData.id
        })

        return postData
    }

const deletePost = async(userId: string, postId: number, title: string, description: string) => {
    return await Post.deleteOne({
        user_id: userId,
        post_id: postId,
        title,
        description
    })
}

const patchPost = async(userId: string, postId: number, title: string, description: string, path: string) => {
    
    return await Post.findOneAndUpdate(
        {
            user_id: userId, 
            _id: postId
        },
        {
            title, 
            description, 
            image_url: path
        },
        {new: true})
}

const getAllPost = async(pageNumber: number) => {

    const pageSize = 10
    const skip = (pageNumber -1) * pageSize
    const sortField = 'post_date'
    const sortOrder = -1

    const imageDataBypage = await Post.find()
                                .limit(pageSize)
                                .skip(skip)
                                .sort({[sortField]: sortOrder})

    return imageDataBypage
}

const getPostByUserId = async(userId: string) => {
    return await Post.find({
        user_id: userId
    })
}

export {
    getAllPost,
    getPostByUserId,
    uploadPost,
    deletePost,
    patchPost
}