import { Router } from 'express'
import { logIn, signUp } from './auth.use-cases'

import validate from '../../middlewares/validator.middleware'

import loginSchema from './validators/login.schema'
import signUpSchema from './validators/signUp.schema'

const router: Router = Router()

router.post('/signUp', validate(signUpSchema), signUp)
router.post('/logIn', validate(loginSchema), logIn)

export default router
