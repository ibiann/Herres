import Joi from 'joi'
import { HttpStatusCode } from '../utils/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(30).trim(),
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

const update = async (req, res, next) => {
  const condition = Joi.object({
    // title: Joi.string().min(3).max(20).trim(),
    // description: Joi.string(),
    // color: Joi.string(),
    // dueDate: Joi.string(),
    // boardId: Joi.string(),
    // columnId: Joi.string(),
    card: Joi.object().required(),
  })
  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    })
  }
}

export const CardValidation = { createNew, update }
