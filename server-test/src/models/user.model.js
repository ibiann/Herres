import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'
import { DEFAULT_AVA } from '../utils/constants'
import _ from 'lodash'
const UserName = 'users'
const UserSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string().default(DEFAULT_AVA),
  email: Joi.string().required().min(3).max(30).trim(),
  password: Joi.string().required().min(3).trim(),
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
    return result.user.insertValue
  } catch (error) {
    throw new Error(error)
  }
}

const editUser = async (id, data) => {
  try {
    const insertValue = {
      ...data,
    }
    let result = await getDB()
      .collection(UserName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: insertValue },
        { returnDocumnet: 'after' }
      )
    return result
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
const getAll = async (id) => {
  try {
    const result = await getDB()
      .collection(UserName)
      .find({ _id: { $ne: id } })
      .toArray()
    return result.map((r) => {
      _.unset(r, 'password')
      return r
    })
  } catch (error) {
    throw new Error(error)
  }
}
const getCurrentUser = async (user_id) => {
  try {
    const result = await getDB()
      .collection(UserName)
      .findOne({ _id: ObjectId(user_id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const UserModel = {
  UserName,
  createNew,
  findOneByEmail,
  editUser,
  getAll,
  getCurrentUser,
}
