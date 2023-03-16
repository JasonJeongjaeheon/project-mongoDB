import express, { Router } from 'express'
import * as postController from '../controllers/postController'
import { loginAuthorization } from '../utils/auth'
import multer from 'multer'

const routes: Router = express.Router()

const upload = multer({dest: 'files/'})

routes.get('', postController.getAllPost)
routes.get('/uploads', loginAuthorization, postController.getPostByUserId)
routes.post('', loginAuthorization, upload.array('image_url', 13), postController.uploadPost)
routes.delete('', loginAuthorization, postController.deletePost)
routes.patch('', loginAuthorization, upload.array('image_url', 13), postController.patchPost)

export { routes }