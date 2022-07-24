import { CommentService } from '../services/comment.service'
import { HttpStatusCode } from '../utils/constants'

const createNew = async (req, res) => {
  try {
    const result = await CommentService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}

export const CommentController = { createNew }
