import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";

const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(cardCollectionName).findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validateValue = await validateSchema(data);
    const insertValue = {
      ...validateValue,
      boardId: ObjectId(validateValue.boardId),
      columnId: ObjectId(validateValue.columnId)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    if (data.boardId) updateData.boardId = ObjectId(data.boardId)
    if (data.columnId) updateData.columnId = ObjectId(data.columnId)

    const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
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
 * 
 * @param {Array of string card ids} ids 
 */
const deleteCards = async (ids) => {
  try {
    const tranformIds = ids.map(i => ObjectId(i)) /* ham` map se tra ve 1 arr */

    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: tranformIds }}, // $in thuoc trong mang id muon update // change ids to ObjectId
      { $set: { _destroy: true }}
    )
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { cardCollectionName, createNew, update, deleteCards, findOneById };
