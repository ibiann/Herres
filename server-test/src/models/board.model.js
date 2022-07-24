import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'
import { UserModel } from './user.model'
import _, { unset } from 'lodash'
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(30).trim(),
  columns: Joi.array().items(Joi.string()).default([]),
  image: Joi.string(),
  color: Joi.string(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
  invitedUsers: Joi.array().items(Joi.string()).default([]).unique(),
  user_id: Joi.string(),
})

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async (user_id, search) => {
  try {
    // const result = await getDB()
    //   .collection(boardCollectionName)
    //   .find({
    //     $or: [{ user_id: user_id }, { invitedUsers: { $in: [user_id] } }],
    //   })
    //   .toArray()
    console.log(search)

    let result = []
    if (search) {
      result = await getDB()
        .collection(boardCollectionName)
        .aggregate([
          {
            $match: {
              $or: [{ user_id: user_id }, { invitedUsers: { $in: [user_id] } }],
              title: { $regex: search, $options: 'i' },
              _destroy: false,
            },
          },
          {
            $addFields: {
              user_id: { $toObjectId: '$user_id' },
            },
          },
          {
            $lookup: {
              from: UserModel.UserName,
              localField: 'user_id',
              foreignField: '_id',
              as: 'user',
            },
          },
        ])
        .toArray()
    } else {
      result = await getDB()
        .collection(boardCollectionName)
        .aggregate([
          {
            $match: {
              $or: [{ user_id: user_id }, { invitedUsers: { $in: [user_id] } }],
              _destroy: false,
            },
          },
          {
            $addFields: {
              user_id: { $toObjectId: '$user_id' },
            },
          },
          {
            $lookup: {
              from: UserModel.UserName,
              localField: 'user_id',
              foreignField: '_id',
              as: 'user',
            },
          },
        ])
        .toArray()
    }

    // const allBoards = await getDB()
    //   .collection(boardCollectionName)
    //   .find({})
    //   .toArray()
    // console.log(allBoards)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnDocumnet: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
const deleted = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
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

/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumns = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columns: columnId } },
        { returnDocument: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

//using mongodb doc to query data (lookup)
const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          //dieu kien loc ( -> lookup)
          $match: {
            _id: ObjectId(boardId),
            _destroy: false,
          },
        },
        {
          $addFields: {
            user_id: { $toObjectId: '$user_id' },
          },
        },
        {
          $lookup: {
            from: UserModel.UserName,
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, //collection name
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns',
          },
        },

        {
          $lookup: {
            from: CardModel.cardCollectionName, //collection name
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards',
          },
        },
        // { $set: { cards: { $arrayElemAt: ['$cards', 0] } } },
        // { $sort: { index: 1 } },
        // {
        //   $group: {
        //     _id: '$_id',
        //     cards: { $push: '$cards' },
        //   },
        // },
      ])
      .toArray() //tra ve gia tri la 1 array data
    const originalData = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          //dieu kien loc ( -> lookup)
          $match: {
            _id: ObjectId(boardId),
            _destroy: false,
          },
        },
        {
          $addFields: {
            user_id: { $toObjectId: '$user_id' },
          },
        },
        {
          $lookup: {
            from: UserModel.UserName,
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, //collection name
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns',
          },
        },
      ])
      .toArray()
    return { board: result[0], originalData: originalData[0] } || {}
  } catch (error) {
    throw new Error(error)
  }
}
const invitedUsers = async (boardId, data) => {
  try {
    const users = [...data]
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { invitedUsers: { $each: users } } },
        { returnDocumnet: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
const getInvitedUsers = async (boardId) => {
  try {
    let result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          //dieu kien loc ( -> lookup)
          $match: {
            _id: ObjectId(boardId),
            _destroy: false,
          },
        },
        { $unwind: '$invitedUsers' },
        { $addFields: { userObjectId: { $toObjectId: '$invitedUsers' } } },
        {
          $lookup: {
            from: UserModel.UserName,
            localField: 'userObjectId',
            foreignField: '_id',
            as: 'users',
          },
        },
      ])
      .toArray()
    result = result.map((r, index) => {
      _.unset(r.users[0], 'password')
      return r.users[0]
    })
    return result || []
  } catch (error) {
    throw new Error(error)
  }
}
const canUserInvite = async (boardId, userId) => {
  try {
    let invitedUsers = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          //dieu kien loc ( -> lookup)
          $match: {
            _id: ObjectId(boardId),
            _destroy: false,
          },
        },
        { $unwind: '$invitedUsers' },
        { $addFields: { userObjectId: { $toObjectId: '$invitedUsers' } } },
        {
          $lookup: {
            from: UserModel.UserName,
            localField: 'userObjectId',
            foreignField: '_id',
            as: 'users',
          },
        },
      ])
      .toArray()
    invitedUsers = invitedUsers.map((r, index) => {
      return r.users[0]
    })
    const allUsers = await getDB()
      .collection(UserModel.UserName)
      .find({ _id: { $ne: ObjectId(userId) } })
      .toArray()
    let result = []
    if (invitedUsers.length === 0) {
      result = allUsers
    } else {
      const invitedUserIds = whoAreInvited(allUsers, invitedUsers)
      result = allUsers
        .filter((u) => invitedUserIds.includes(u._id.toString()))
        .map((r) => {
          _.unset(r, 'password')
          return r
        })
    }
    return result || []
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
const whoAreInvited = (users, invitedUsers) => {
  const userIds = users.map((u) => u._id.toString())
  const invitedUserIds = invitedUsers.map((u) => u._id.toString())

  return userIds.filter((u) => !invitedUserIds.includes(u))
}
export const BoardModel = {
  boardCollectionName,
  createNew,
  update,
  findOneById,
  pushColumns,
  getFullBoard,
  getAll,
  invitedUsers,
  getInvitedUsers,
  canUserInvite,
  deleted,
}
