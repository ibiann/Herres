import express from 'express'
import { BoardController } from '../../controllers/board.controller'
import { BoardValidation } from '../../validation/board.validation'

const router = express.Router()
router
  .route('/')
  //   .get((req, res) => console.log("GET boards"))
  .get(BoardController.getAll)
  .post(BoardValidation.createNew, BoardController.createNew)

router
  .route('/:id')
  .get(BoardController.getFullBoard)
  .put(BoardValidation.update, BoardController.update)

router
  .route('/invited_users/:id')
  .get(BoardController.getInvitedUsers)
  .post(BoardValidation.inviteUsers, BoardController.inviteUsers)
router.route('/can_invited_users/:id').get(BoardController.getCanInvitedUsers)
export const boardRoutes = router
