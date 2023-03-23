import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Express, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { routes } from './routes'
import logger from './utils/winston'

const createApp = (): Application => {
    const app: Express = express()

    app.use(cors())
    app.use(morgan('combined'))
    app.use(express.json())
    app.use(routes)

    logger.info('test')
    logger.error('error', console.error())

    app.get('/ping', (req: Request, res: Response) => {
        res.status(200).json({message: 'pong'})
    })

    return app
}

export { createApp }