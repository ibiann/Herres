import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'
const UserName = 'users'
const UserSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string(),
  email: Joi.string().required().min(3).max(30).trim(),
  password: Joi.string().required().min(3).max(30).trim(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
  return await UserSchema.validateAsync(data, {
    abortEarly: false,
  })
}

const findOneByEmail = async (email) => {
  try {
    const result = await getDB().collection(UserName).findOne({ email })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data)
    const insertValue = {
      ...validateValue,
    }
    let result = await getDB().collection(UserName).insertOne(insertValue)
    result = { ...result, user: { ...result.user, insertValue } }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const UserModel = {
  UserName,
  createNew,
  findOneByEmail,
}
