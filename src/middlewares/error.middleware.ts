import { type Request, type Response, type NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorMiddleware = (error: any, req: Request, res: Response, _next: NextFunction): void => {
  try {
    const status: number = error.status || 500
    const message: string = error.message || 'Internal Server Error'

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
    res.status(status).json({ message })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
