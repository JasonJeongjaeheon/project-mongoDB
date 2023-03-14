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
    } else {
        const payload = {id: isExistUser.id}
        const secretOrPrivateKey: Secret = process.env.JWT_SECRET!
        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        accessToken = jwt.sign(payload, secretOrPrivateKey, options)
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
        url: 'https://kapi.kakao.com/v1/oidc/userinfo',
        headers: {
            'Authorization': `Bearer ${kakaoAccessToken.data.access_token}`
        } 
    })

    const kakaoId = getUserInfoByKakao.data.sub
    const email = getUserInfoByKakao.data.email
    const socialTypeId = 1
    const { profileImage, nickname } = getUserInfoByKakao.data

    const isExistUser = await User.findOne({
        email: email
    })

    let accessToken: string = '';

    if(!isExistUser) {
        await User.create(kakaoId, socialTypeId, email, profileImage, nickname)
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

const naverLogin = async(naverToken: string): Promise<string> => {

    const getUserInfoByNaver = await axios({
        method: 'get',
        url:'https://openapi.naver.com/v1/nid/me',
        headers: {
            'Authorization': `Bearer ${naverToken}`
        }
    })

    const naverId = getUserInfoByNaver.data.response.id;
    const email = getUserInfoByNaver.data.response.email;
    const socialTypeId = 2;
    const { profileImage, name } = getUserInfoByNaver.data.response

    const isExistUser = await User.findOne({
        email: email
    })

    let accessToken: string = '';

    if(!isExistUser) {
        await User.create(naverId, socialTypeId, email, profileImage, name)
        const payload = {id: naverId}
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
    kakaoLogin,
    naverLogin
}