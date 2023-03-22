import { Request, Response } from "express"
import * as likeService from '../services/likeService'
import { catchAsync } from "../utils/error"

const updateLike = catchAsync(async(req: Request, res: Response): Promise<any> => {
    const userId = req.cookies.id
    const postId = req.params.postId as string

    const postLikeByUser = await likeService.getLikeInfoByUserId(userId, postId)
    console.log('controller', postLikeByUser)

    if(!postLikeByUser){
        await likeService.postLike(userId, postId)
        res.status(200).json({message: 'likes completely posted'})
    } else {
        await likeService.deleteLike(userId, postId)
        res.status(200).json({meesage: 'likes completely deleted'})
    }
})

export {
    updateLike
}