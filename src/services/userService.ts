import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'

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

export {
    userLogin
}