import express, { Router } from 'express'
import * as postController from '../controllers/postController'
import { loginAuthorization } from '../utils/auth'
import multer from 'multer'

const routes: Router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, files, cb) {
        cb(null, 'files/')
    },
    filename: function(req, files, cb) {
        cb(null, Date.now() + '-' + files.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, files, cb) {
        if(!files.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only jpg/jpeg/png/gif files are allowed'))
        }
        cb(null, true)
    }
})

//const upload = multer({dest: 'files/'})

routes.get('', postController.getAllPost)
routes.get('/uploads', loginAuthorization, postController.getPostByUserId)
routes.post('', loginAuthorization, upload.array('image_url', 13), postController.uploadPost)
routes.delete('', loginAuthorization, postController.deletePost)
routes.patch('', loginAuthorization, upload.array('image_url', 13), postController.patchPost)

export { routes }