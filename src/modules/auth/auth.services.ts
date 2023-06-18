import { type IUsuarios_credenciales } from './interfaces/IUsuarios_credenciales'
import authRepository from './auth.repository'
import { HttpException } from '../../exceptions/httpExceptions'
import { type IUsuario_create } from './interfaces/IUsuario_create'
import { compare, hash } from 'bcrypt'
import { type IUsuario_login } from './interfaces/IUsuario_login'
import jwtHelper from '../../common/helpers/jwt.helper'

const signUp = async (userData: IUsuario_create): Promise<IUsuarios_credenciales> => {
  // check if existing user
  const findUser: IUsuarios_credenciales | null = await authRepository.findUser(userData.email)
  if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`)
  // create hash
  const hashedPassword = await hash(userData.password, 10)
  const user: IUsuarios_credenciales = {
    email: userData.email,
    passwordHash: hashedPassword,
    rol_id: userData.rol,
    activo: 1
  }
  // create new user
  const createUserData: IUsuarios_credenciales = await authRepository.saveUser(user)
  return createUserData
}

const login = async (userData: IUsuario_login): Promise<{ accessToken: string; refreshToken: string }> => {
  const findUser: IUsuarios_credenciales | null = await authRepository.findUser(userData.email)
  if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`)

  const isPasswordMatching: boolean = await compare(userData.password, findUser.passwordHash)
  if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching')

  const { accessToken, refreshToken } = jwtHelper.generateTokens(Number(findUser.id))
  return { accessToken, refreshToken }
}

export default { signUp, login }
