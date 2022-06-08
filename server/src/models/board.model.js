import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(30).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB().collection(boardCollectionName).insertOne(value);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateDate = { ...data }
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateDate },
        { returnDocumnet: 'after' }
      );
    return result.value
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @param {string} boardId 
 * @param {string} columnId 
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $push: { columnOrder: columnId }},
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error);
  }
}

//using mongodb doc to query data (lookup)
const getFullBoard = async (boardId) => {
  try {
    const result = await getDB().collection(boardCollectionName).aggregate([
      {
        //dieu kien loc ( -> lookup)
        $match: {
          _id: ObjectId(boardId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: ColumnModel.columnCollectionName, //collection name
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: CardModel.cardCollectionName, //collection name
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      },
    ]).toArray(); //tra ve gia tri la 1 array data 

    return result[0] || {}
  } catch (error) {
    throw new Error(error);
  }
};


export const BoardModel = { createNew, update, findOneById, pushColumnOrder, getFullBoard };
