import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'
import { UserModel } from './user.model'
import _, { unset } from 'lodash'
const commentCollectionName = 'comments'
const commentSchema = Joi.object({
  content: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
  userId: Joi.string(),
  cardId: Joi.string(),
})

const validateSchema = async (data) => {
  return await commentSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data)
    const insertValue = {
      ...validateValue,
      userId: ObjectId(validateValue.userId),
      cardId: ObjectId(validateValue.cardId),
    }
    const result = await getDB()
      .collection(commentCollectionName)
      .insertOne(insertValue)

    return result
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(commentCollectionName)
      .findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const CommentModel = {
  commentCollectionName,
  createNew,
  findOneById,
}
