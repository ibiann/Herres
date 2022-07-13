import express from 'express'
import { BoardController } from '../../controllers/board.controller'
import verifyMiddleware from '../../middlewares/verify'
import { BoardValidation } from '../../validation/board.validation'

const router = express.Router()
router.use(verifyMiddleware)
router
  .route('/')
  //   .get((req, res) => console.log("GET boards"))
  .get(BoardController.getAll)
  .post(BoardValidation.createNew, BoardController.createNew)

router
  .route('/:id')
  .get(BoardController.getFullBoard)
  .put(BoardValidation.update, BoardController.update)
export const boardRoutes = router
