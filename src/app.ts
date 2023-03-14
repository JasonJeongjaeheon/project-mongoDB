import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Express, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { routes } from './routes'

const createApp = (): Application => {
    const app: Express = express()

    app.use(cors())
    app.use(morgan('combined'))
    app.use(express.json())
    app.use(routes)

    app.get('/ping', (req: Request, res: Response) => {
        res.status(200).json({message: 'pong'})
    })

    return app
}

export { createApp }