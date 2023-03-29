import express, { Router } from 'express'
import * as likeController from '../controllers/likeController'
import { loginAuthorization } from '../utils/auth'

const routes: Router = express.Router()

routes.patch('/:postId', loginAuthorization, likeController.updateLike)

export {
    routes
}