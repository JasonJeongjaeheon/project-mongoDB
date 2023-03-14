import { Request, Response } from "express";
import * as userService from '../services/userService'
import { catchAsync } from '../utils/error'

const userLogin = catchAsync(async(req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    
    if(!email || !password){
        throw new Error('missing email or password')
    }
    const accessToken = await userService.userLogin(email, password)
    res.status(200).json({accessToken})
})

export {
    userLogin
}