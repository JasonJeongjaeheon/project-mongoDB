import express, { Router } from 'express'
import * as userRouter from './userRouter'

const routes: Router = express.Router()

routes.use('/users', userRouter.routes)

export { routes }