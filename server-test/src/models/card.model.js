import Joi from 'joi'
import _ from 'lodash'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'
import { CommentModel } from './comment.model'
import { UserModel } from './user.model'

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  finish: Joi.boolean().default(false),
  description: Joi.string().default('Description'),
  cover: Joi.string().default(null),
  todos: Joi.array().items(Joi.object()).default([]),
  comments: Joi.array().items(Joi.string()).default([]),
  dueDate: Joi.date().timestamp().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getAllComments = async (id) => {
  console.log(id)
  try {
    const result = await getDB()
      .collection(CommentModel.commentCollectionName)
      .aggregate([
        {
          //dieu kien loc ( -> lookup)
          $match: {
            cardId: ObjectId(id),
          },
        },
        {
          $lookup: {
            from: UserModel.UserName, //collection name
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ])
      .toArray()
    const comments = [...result]
    comments.forEach((comment) => {
      comment.user = comment.user[0]
      _.unset(comment.user, 'password')
    })
    return comments || []
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data)
    const insertValue = {
      ...validateValue,
      boardId: ObjectId(validateValue.boardId),
      columnId: ObjectId(validateValue.columnId),
    }
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    if (data.boardId) updateData.boardId = ObjectId(data.boardId)
    if (data.columnId) updateData.columnId = ObjectId(data.columnId)

    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 *
 * @param {Array of string card ids} ids
 */
const deleteCards = async (ids) => {
  try {
    const tranformIds = ids.map((i) =>
      ObjectId(i)
    ) /* ham` map se tra ve 1 arr */

    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany(
        { _id: { $in: tranformIds } }, // $in thuoc trong mang id muon update // change ids to ObjectId
        { $set: { _destroy: true } }
      )
  } catch (error) {
    throw new Error(error)
  }
}
const deleted = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { _destroy: true } },
        { returnDocumnet: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
export const CardModel = {
  cardCollectionName,
  createNew,
  update,
  deleteCards,
  findOneById,
  getAllComments,
  deleted,
}
