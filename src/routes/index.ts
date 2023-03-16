import express, { Router } from 'express'
import * as userRouter from './userRouter'
import * as postRouter from './postRouter'

const routes: Router = express.Router()

routes.use('/users', userRouter.routes)
routes.use('/posts', postRouter.routes)

export { routes }