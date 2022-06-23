import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";

const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOne({ _id: ObjectId(id) });
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
      boardId: ObjectId(validateValue.boardId)
    }
    const result = await getDB().collection(columnCollectionName).insertOne(insertValue);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @param {string} columnId
 * @param {string} cardId
 */
 const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(columnId) },
      { $push: { cardOrder: cardId }},
      { returnDocumnet: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error);
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    if (data.boardId) updateData.boardId = ObjectId(data.boardId)

    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnDocumnet: 'after' }
      );
    return result.value
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = { columnCollectionName, createNew, findOneById, pushCardOrder, update };
