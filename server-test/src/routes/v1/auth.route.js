import verifyMiddleware from '../../middlewares/verify'
import { UserValidation } from '../../validation/user.validation'
const router = require('express').Router()
const { authController } = require('./../../controllers/auth.controller')
router.post('/login', UserValidation.getUser, authController.login)

router.post('/register', UserValidation.createNew, authController.register)
router.use(verifyMiddleware)
router.get('/current_user', authController.getCurrentUser)

export const authRoutes = router
