import { Request, Response } from "express";
import * as userService from '../services/userService'
import { catchAsync } from '../utils/error'

const userLogin = catchAsync(async(req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    
    if(!email || !password){
        throw new Error('missing email or password')
    }
    const accessToken = await userService.userLogin(email, password)
    if(!accessToken){
        res.status(401).json({message: 'please login by social id'})
    }
    res.status(200).json({accessToken})
})

const kakaoLogin = catchAsync(async(req: Request, res: Response): Promise<void> => {
    const kakaoCode = req.query.code as string

    if(!kakaoCode){
        throw new Error('missing kakao code')
    }
    const accessToken = await userService.kakaoLogin(kakaoCode)
    res.status(200).json({accessToken})
})

export {
    userLogin,
    kakaoLogin
}