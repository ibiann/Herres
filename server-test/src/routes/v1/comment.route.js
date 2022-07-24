import express from 'express'
import { CommentController } from '../../controllers/comment.controller'
import { CommentValidation } from '../../validation/comment.validation'

const router = express.Router()

router.route('/').post(CommentValidation.createNew, CommentController.createNew)

export const commentRoutes = router
