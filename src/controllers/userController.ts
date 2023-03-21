import { Request, Response } from "express";
import * as userService from '../services/userService'
import { catchAsync } from '../utils/error'

const userLogin = catchAsync(async(req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body
    
    const pwValidation = new RegExp(
        '^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
    )

    const emailValidation = new RegExp(
        '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
    )

    if(!email || !password)
    {
        return res.status(400).json({ message : 'KEY_ERROR' })
    } else if(!pwValidation.test(password) || !emailValidation.test(email)) 
    {
        return res.status(409).json({ message : 'INVALID_INPUT_DATA' })
    }

    const accessToken = await userService.userLogin(email, password)
    if(!accessToken){
        res.status(409).json({message: 'please login by social id'})
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