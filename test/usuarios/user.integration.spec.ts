/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type IUsuarios } from '../../src/modules/usuarios/interfaces/IUsuarios'
import usuariosRepository from '../../src/modules/usuarios/usuarios.repository'

let userId!: number

describe('Integration Tests Usuarios', () => {
  it('CREATE Usuario', async () => {
    const newUsuario: IUsuarios = {
      username: 'Integration Test'
    } as IUsuarios
    const response = await usuariosRepository.create(newUsuario)
    userId = response.id
    expect(response.id).toBeDefined()
  })

  it('UPDATE Usuario', async () => {
    const newUsuario: IUsuarios = {
      username: 'Integration Test updated successfully'
    } as IUsuarios
    const response = await usuariosRepository.update(userId, newUsuario)
    expect(response.id).toBeDefined()
  })

  it('FIND Usuario', async () => {
    const username = 'Integration Test updated successfully'
    const result = await usuariosRepository.find(userId)
    expect(result?.username).toBe(username)
  })

  it('DELETE Usuario', async () => {
    const response = await usuariosRepository.remove(userId)
    expect(response.id).toBeDefined()
  })
})
