import { HttpException } from '../exceptions/httpExceptions'
import { verify } from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'

const getAuthorization = (req: Request): string | null => {
  const header = req.header('Authorization')
  if (header) return header.split('Bearer ')[1]
  return null
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorization = getAuthorization(req)
    if (authorization) {
      const jwtPayload = verify(authorization, String(process.env.SECRET_KEY))
      if (jwtPayload) {
        res.locals.user = jwtPayload
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'))
    }
  } catch {
    next(new HttpException(401, 'Wrong authentication token'))
  }
}
