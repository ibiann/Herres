import Joi from 'joi'
import { HttpStatusCode } from '../utils/constants'
const isBase64 = require('is-base64')

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    image: Joi.string(),
    color: Joi.string(),
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    if (!isBase64(req.body.image, { allowMime: true }))
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'File type didnt valid,must be base64 URL',
      })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    })
  }
}

const update = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(20).trim(),
    columns: Joi.array().items(Joi.string()),
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
const inviteUsers = async (req, res, next) => {
  const condition = Joi.object({
    invitedUsers: Joi.array().items(Joi.string()),
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
export const BoardValidation = { createNew, update, inviteUsers }
