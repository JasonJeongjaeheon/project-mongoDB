import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as userService from '../services/userService'

const loginAuthorization = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const access_token = req.headers.authorization

    if(!access_token){
        const error = new Error('NEED_ACCESS_TOKEN')
        return res.status(401).json({message: error.message})
    }
    const decoded: string | JwtPayload = jwt.verify(access_token, process.env.JWT_SECRET!)
    
    if(typeof decoded !== 'string'){
        
        const user = await userService.getUserById(decoded.id)

        if(!user){
        const error = new Error('USER_DOES_NOT_EXIST')
        return res.status(404).json({message:error.message})
        }
    req.cookies = user
    next()
    }
}

export {
    loginAuthorization
}