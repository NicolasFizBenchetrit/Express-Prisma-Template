/* eslint-disable @typescript-eslint/consistent-type-assertions */
import usuariosService from '../../src/modules/usuarios/usuarios.service'
import usuariosEntity from '../../src/modules/usuarios/entities/usuarios.entity'
import { type IUsuarios } from '../../src/modules/usuarios/interfaces/IUsuarios'
import { HttpException } from '../../src/exceptions/httpExceptions'

describe('Unit Tests Usuarios', () => {
  // FIND
  it('FIND Usuarios', async () => {
    // Obtener entidad
    const users = usuariosEntity
    // resultado de la llamada
    const result: IUsuarios[] = [
      {
        id: 1,
        dni: '35425453',
        nombre: 'test1'
      },
      {
        id: 2,
        dni: '134121134',
        nombre: 'test2'
      }
    ] as IUsuarios[]
    // mockear resultado de la llamda
    users.findMany = jest.fn().mockReturnValue(result)
    // Resultado
    const res = usuariosService.findUsuarios()
    await expect(res).resolves.toEqual(result)
  })

  // FIND BY ID
  it('FIND BY ID Usuario', async () => {
    const users = usuariosEntity
    const result = {
      id: 1,
      dni: '1234568',
      nombre: 'testFindById'
    }
    users.findUnique = jest.fn().mockReturnValue(result)
    const serviceResult = usuariosService.findUsusarioById(1)
    await expect(serviceResult).resolves.toEqual(result)
  })

  it('FIND BY ID Usuario -> NOT FOUND', async () => {
    const users = usuariosEntity
    const result = null
    users.findUnique = jest.fn().mockReturnValue(result)
    const serviceResult = usuariosService.findUsusarioById(1)
    await expect(serviceResult).rejects.toThrow(new HttpException(409, 'User not found'))
  })

  // CREATE
  it('CREATE Usuario', async () => {
    const users = usuariosEntity
    const result: IUsuarios = { username: 'Test', dni: '123456789' } as IUsuarios
    users.findUnique = jest.fn().mockReturnValue(null)
    users.create = jest.fn().mockReturnValue(result)
    const serviceResult = usuariosService.createUsuario(result)
    await expect(serviceResult).resolves.toEqual(result)
  })

  it('CREATE Usuario -> username already exists', async () => {
    const users = usuariosEntity
    const newUser: IUsuarios = { id: 2, username: 'test' } as IUsuarios
    const oldUser: IUsuarios = { id: 1, username: 'test' } as IUsuarios
    users.findUnique = jest.fn().mockReturnValue(oldUser)
    const serviceResult = usuariosService.createUsuario(newUser)
    await expect(serviceResult).rejects.toThrow(new HttpException(404, `This username ${oldUser.username} already exists`))
  })

  // UPDATE
  it('UPDATE Usuario', async () => {
    const users = usuariosEntity
    const result: IUsuarios = { username: 'Test', dni: '123456789' } as IUsuarios
    users.findUnique = jest.fn().mockReturnValue(result)
    users.update = jest.fn().mockReturnValue(result)
    const serviceResult = usuariosService.updateUsuario(1, result)
    await expect(serviceResult).resolves.toEqual(result)
  })

  it('UPDATE Usuario -> NOT FOUND', async () => {
    const users = usuariosEntity
    const result: IUsuarios = { username: 'Test', dni: '123456789' } as IUsuarios
    users.findUnique = jest.fn().mockReturnValue(null)
    users.update = jest.fn().mockReturnValue(result)
    const serviceResult = usuariosService.updateUsuario(1, result)
    await expect(serviceResult).rejects.toThrow(new HttpException(409, `User doesn't exist`))
  })

  // DELETE
  it('DELETE Usuario', async () => {
    const users = usuariosEntity
    const result: IUsuarios = { id: 1, username: 'Test' } as IUsuarios
    users.findUnique = jest.fn().mockReturnValue(result)
    users.delete = jest.fn().mockReturnValue(result)
    const serviceResult = usuariosService.deleteUsuario(1)
    await expect(serviceResult).resolves.toEqual(result)
  })
})
