import Joi, { required } from 'joi'
import { HttpStatusCode } from '../utils/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().min(3).max(30).trim(),
    password: Joi.string().required().min(3).max(30).trim(),
    confirmPassword: Joi.string().required().min(3).max(30).trim(),
  })

  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    const { password, confirmPassword } = condition
    if (password !== confirmPassword)
      res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: "Your password and confirmation didn't match",
      })
    const { confirmPassword: confirm, ...body } = req.body
    req.body = body
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    })
  }
}
const getUser = async (req, res, next) => {
  const condition = Joi.object({
    email: Joi.string().required().min(3).max(30).trim(),
    password: Joi.string().required().min(3).max(30).trim(),
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
export const UserValidation = { createNew, getUser }
