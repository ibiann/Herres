import express from 'express'
import { CardController } from '../../controllers/card.controller'
import { CardValidation } from '../../validation/card.validation'

const router = express.Router()

router.route('/').post(CardValidation.createNew, CardController.createNew)

router
  .route('/:id')
  .put(CardValidation.update, CardController.update)
  .delete(CardController.deleted)
router.route('/:id/comments').get(CardController.getAllComments)

export const cardRoutes = router
