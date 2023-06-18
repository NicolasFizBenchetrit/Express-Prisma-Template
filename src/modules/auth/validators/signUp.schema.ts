import { z } from 'zod'

const signUpSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required'
    }),
    password: z.string({
      required_error: 'password is required'
    }),
    rol: z.string({
      required_error: 'rol is required'
    })
  })
})

export default signUpSchema
