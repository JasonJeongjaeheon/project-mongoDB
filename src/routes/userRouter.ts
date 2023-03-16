import express, { Router } from 'express'
import * as userController from '../controllers/userController'

const routes: Router = express.Router();

routes.post('/login', userController.userLogin)
routes.get('/login/kakao', userController.kakaoLogin)

export { routes }