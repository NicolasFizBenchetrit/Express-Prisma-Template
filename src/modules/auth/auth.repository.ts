import usuarios_credenciales from './entities/usuarios_credenciales'
import { type IUsuarios_credenciales } from './interfaces/IUsuarios_credenciales'

const findUser = async (email: string): Promise<IUsuarios_credenciales | null> => await usuarios_credenciales.findUnique({ where: { email } })

const saveUser = async (user: IUsuarios_credenciales): Promise<IUsuarios_credenciales> => await usuarios_credenciales.create({ data: user })

export default { findUser, saveUser }
