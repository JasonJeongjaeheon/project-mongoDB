import express, { Router } from 'express'
import * as userRouter from './userRouter'
import * as postRouter from './postRouter'
import * as likeRouter from './likeRouter'

const routes: Router = express.Router()

routes.use('/users', userRouter.routes)
routes.use('/posts', postRouter.routes)
routes.use('/likes', likeRouter.routes)

export { routes }