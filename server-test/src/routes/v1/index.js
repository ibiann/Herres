import express from 'express'
import { HttpStatusCode } from '../../utils/constants'
import { boardRoutes } from './board.route'
import { columnRoutes } from './column.route'
import { cardRoutes } from './card.route'
import { authRoutes } from './auth.route'
import verifyMiddleware from '../../middlewares/verify'
import { userRoutes } from './user.route'
import { commentRoutes } from './comment.route'

const router = express.Router()

//checking status Get v1/status

router.get('/status', (req, res) =>
  res.status(HttpStatusCode.OK).json({
    status: 'Ok',
  })
)

router.use('/auth', authRoutes)
/** Call Board Api */
router.use(verifyMiddleware)
router.use('/boards', boardRoutes)

/** Call Column Api */
router.use('/columns', columnRoutes)

/** Call Card Api */
router.use('/cards', cardRoutes)
router.use('/users', userRoutes)
router.use('/comments', commentRoutes)

export const apiV1 = router
