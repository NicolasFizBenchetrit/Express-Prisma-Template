import authRoutes from './auth.routes'
import authServices from './auth.services'
import { type IUsuario_create } from './interfaces/IUsuario_create'

const signUp = authServices.signUp

export { authRoutes, signUp, type IUsuario_create }
