import { type NextFunction, type Request, type Response } from 'express'
import authService from './auth.services'
import { type IUsuario_create } from './interfaces/IUsuario_create'
import { type IUsuario_login } from './interfaces/IUsuario_login'
import { type IUsuarios_credenciales } from './interfaces/IUsuarios_credenciales'

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, rol } = req.body
    const userData: IUsuario_create = { email, password, rol }
    const signUpData: IUsuarios_credenciales = await authService.signUp(userData)
    res.status(200).json({ data: signUpData, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

const logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body
    const userData: IUsuario_login = { email, password }
    const { accessToken, refreshToken } = await authService.login(userData)
    res.status(200).json({ data: { accessToken, refreshToken }, message: 'login successful' })
  } catch (error) {
    next(error)
  }
}

export { signUp, logIn }
