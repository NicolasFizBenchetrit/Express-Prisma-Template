export interface IUsuarios_credenciales {
  id?: number
  email: string
  passwordHash: string
  passwordSalt?: string | null
  rol_id: number
  activo: number | null
  usuario_id?: number | null
  fecha?: Date
}
