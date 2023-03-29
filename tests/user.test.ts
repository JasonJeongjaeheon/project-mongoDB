import request from 'supertest'
import { createApp } from "../src/app"

const mockAxios = jest.fn()

describe('kakao sign in', () => {
    let app = createApp()

    test('SUCCESS: create new user', async() => {
        
        const mockKakaoUserInfo = {
            sub: '12345',
            nickname: 'user-test',
            email: 'user-test@email.com'
        }

        const mockKakaoTokenData = {
            data: {
                access_token: '12345'
            }
        }
        
        mockAxios.mockResolvedValueOnce(mockKakaoTokenData)
        mockAxios.mockResolvedValueOnce(mockKakaoUserInfo)

        request(app)
            .get('/users/login/kakao')
            .set({
                authorization: 'code'
            })
            .expect(200)
    })

    test('FAILED: invalid code', async() => {
        request(app)
            .get('/users/login/kakao')
            .set({
                Authorization: ''
            })
            .expect(500)
            .expect({
                message: 'missing kakao code'
            })
    })
})

