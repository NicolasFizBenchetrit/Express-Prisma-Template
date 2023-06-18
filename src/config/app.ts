import express, { type Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes'
import dotenv from 'dotenv'
import { ErrorMiddleware } from '../middlewares/error.middleware'

// Create Express server
const app: Application = express()

// Express configuration
const cfg = dotenv.config()
if (cfg.error) {
  throw cfg.error
}
app.set('port', process.env.PORT ?? 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('json', {
  replacer: (_key: unknown, value: unknown) => (typeof value === 'bigint' ? value.toString() : value)
})

// Static files
app.use('/public', express.static('public'))

// Dependencies configuration
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/api', routes)
// Error middleware
app.use(ErrorMiddleware)

export default app
