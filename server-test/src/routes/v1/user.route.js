import { UserValidation } from '../../validation/user.validation'
const router = require('express').Router()
const { UserController } = require('./../../controllers/user.controller')
router.get('/', UserController.getAll)
router.put('/:id', UserValidation.editUser, UserController.edit)

export const userRoutes = router
