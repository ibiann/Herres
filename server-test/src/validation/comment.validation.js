import Joi from 'joi'
import { HttpStatusCode } from '../utils/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    cardId: Joi.string().required(),
    userId: Joi.string().required(),
    content: Joi.string().required(),
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    })
  }
}

export const CommentValidation = { createNew }
