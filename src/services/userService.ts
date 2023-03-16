import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import axios from 'axios'

const userLogin = async(email: string, password: string): Promise<any> => {

    const isExistUser = await User.findOne({
        email: email
    })

    const saltRounds = process.env.SALT_ROUNDS as string
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds))

    let accessToken: string = ''

    if(!isExistUser) {
        const user = await User.create({
                        email,
                        password: hashedPassword
                        })
        const payload = {id: user.id}
        const secretPrivateKey: Secret = process.env.JWT_SECRET!
        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        accessToken = jwt.sign(payload, secretPrivateKey, options)
    } else if (isExistUser.password){
        const match = await bcrypt.compare(password, isExistUser.password!)
        
        if(!match){
            throw new Error('INVALID_INPUT_DATA')
        }
        const payload = {id: isExistUser.id}
        const secretOrPrivateKey: Secret = process.env.JWT_SECRET!
        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        accessToken = jwt.sign(payload, secretOrPrivateKey, options)
    } else if (!isExistUser.password){
        return null
    }
    return accessToken
}

const kakaoLogin = async(kakaoCode: string): Promise<string> => {
   
    const kakaoAccessToken = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        params: {
            'grant_type': 'authorization_code',
            'client_id': process.env.KAKAO_REST_API_KEY,
            'redirect_url': process.env.KAKAO_REDIRECT_URI,
            'code': kakaoCode
        },
        withCredentials: true
    })

    const getUserInfoByKakao = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
            Authorization: `Bearer ${kakaoAccessToken.data.access_token}`
        }
    })

    const kakaoId = getUserInfoByKakao.data.id
    const email = getUserInfoByKakao.data.kakao_account.email
    const userName = getUserInfoByKakao.data.properties.nickname
    const profileImage = getUserInfoByKakao.data.properties.profile_image
    const socialTypeId = 1

    const isExistUser = await User.findOne({
        email: email
    })

    let accessToken: string = '';

    if(!isExistUser) {

        await User.create({
            name: userName,
            email,
            profile_image: profileImage,
            social_id: kakaoId,
            social_type_id: socialTypeId
        })

        const payload = {id: kakaoId}
        const secretOrPrivateKey: Secret = process.env.JWT_SECRET!
        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        accessToken = jwt.sign(payload, secretOrPrivateKey, options)
    } else {
        const payload = {id: isExistUser.social_id}
        const secretOrPrivateKey: Secret = process.env.JWT_SECRET!
        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        accessToken = jwt.sign(payload, secretOrPrivateKey, options)
    }
    return accessToken
}

export {
    userLogin,
    kakaoLogin
}