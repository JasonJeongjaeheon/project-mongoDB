import express, { Router } from 'express'
import * as commentController from '../controllers/commentController'
import { loginAuthorization } from '../utils/auth'

const routes: Router = express.Router()

routes.post('/:postId', loginAuthorization, commentController.uploadComment)
routes.delete('/:postId', loginAuthorization, commentController.deleteComment)

export {
    routes
}
