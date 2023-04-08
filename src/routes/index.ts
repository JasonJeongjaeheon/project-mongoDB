import express, { Router } from 'express'
import * as userRouter from './userRouter'
import * as postRouter from './postRouter'
import * as likeRouter from './likeRouter'
import * as commentRouter from './commentRouter'

const routes: Router = express.Router()

routes.use('/users', userRouter.routes)
routes.use('/posts', postRouter.routes)
routes.use('/likes', likeRouter.routes)
routes.use('/comments', commentRouter.routes)

export { routes }