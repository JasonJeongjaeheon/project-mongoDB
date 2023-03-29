import { Request, Response } from "express"
import * as postService from '../services/postService'
import { catchAsync } from "../utils/error"

const uploadPost = catchAsync(async(req: Request, res: Response): Promise<void> => {

    const fileData: any = req.files

    if (!req.files){
        res.status(400).json({message: "NULL_VALUES"})
    }

    const userId = req.cookies.id
    const { title, description } = req.body

    const path = fileData[0].path

    if(!title && !description){
        res.status(400).json({message: 'KEY_ERROR'})
    }
        const imageData = await postService.uploadPost(userId, title, description, path)
        res.status(200).json({message: 'image completed uploaded'})
    }
)

const deletePost = catchAsync(async(req: Request, res: Response): Promise<void> => {
    const { postId, title, description } = req.body
    const userId = req.cookies.id

    if(!postId && !title && !description){
        res.status(400).json({message: "KEY_ERROR"})
    }
    const deleteData = await postService.deletePost(userId, postId, title, description)
    res.status(200).json({message: 'delete_completed'})
})

const patchPost = catchAsync(async(req: Request, res: Response): Promise<void> => {

    const userId = req.cookies.id
    const { postId, title, description } = req.body

    const patchFileData: any = req.files
    const patchedPath = patchFileData[0].path

    const patchData = await postService.patchPost(userId, postId, title, description, patchedPath)
    res.status(200).json({patchData})
})

const getAllPost = catchAsync(async(req: Request, res: Response): Promise<void> => {
    // const imageDir = require('./files')
    // console.log(imageDir)
    const data = await postService.getAllPost()
    console.log(data)
    res.status(200).json({data})
})

const getPostByUserId = catchAsync(async(req: Request, res: Response): Promise<void> => {

    const userId = req.cookies.id

    const data = await postService.getPostByUserId(userId)
    res.status(200).json({data})
})

export {
    getAllPost,
    getPostByUserId,
    uploadPost,
    deletePost,
    patchPost
}