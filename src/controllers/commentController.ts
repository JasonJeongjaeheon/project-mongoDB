import { Request, Response } from "express"
import * as commentService from '../services/commentService'
import { catchAsync } from "../utils/error"

const uploadComment = catchAsync(async(req: Request, res: Response): Promise<any> => {
    
    const userId = req.cookies.id
    const postId = req.params.postId as string
    const textByUser = req.body.comment
    
    await commentService.uploadComment(userId, postId, textByUser)
    res.status(200).json({message: 'comment completely uploaded'})
})

const deleteComment = catchAsync(async(req: Request, res: Response): Promise<any> => {

    const userId = req.cookies.id
    const postId = req.params.postId as string 
    const data = await commentService.getCommentInfo(postId, userId)

    const userIdByComment = data?.user_id
    const commentId = data?.id

    if(userId !== userIdByComment){
        throw new Error('INVALID_AUTHORIZATION')
    }
    await commentService.deleteComment(commentId)
    res.status(200).json({message: 'comment completely deleted'})
})

export {
    uploadComment,
    deleteComment
}