import { UserValidation } from '../../validation/user.validation'
const router = require('express').Router()
const { authController } = require('./../../controllers/auth.controller')
router.post('/login', UserValidation.getUser, authController.login)

router.post('/register', UserValidation.createNew, authController.register)

export const authRoutes = router
