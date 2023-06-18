import request from 'supertest'

import app from '../../src/config/app'

describe('GET /api', () => {
  it('should return 200 OK', async () => {
    return await request(app).get('/api/usuarios').expect(200)
  })
})
