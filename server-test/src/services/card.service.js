import { CardModel } from '../models/card.model'
import { ColumnModel } from '../models/column.model'
import { TYPES } from '../utils/constants'

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data)
    const getNewCard = await CardModel.findOneById(
      newCard.insertedId.toString()
    )

    await ColumnModel.pushCards(
      getNewCard.columnId.toString(),
      getNewCard._id.toString()
    )

    return getNewCard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    }
    if (updateData._id) delete updateData._id
    const updatedCard = await CardModel.update(id, updateData)

    return updatedCard
  } catch (error) {
    throw new Error(error)
  }
}
const getAllComments = async (id) => {
  try {
    const comments = await CardModel.getAllComments(id)

    return comments
  } catch (error) {
    throw new Error(error)
  }
}
const deleted = async (id) => {
  try {
    const deletedColumn = await CardModel.deleted(id)
    return deletedColumn
  } catch (error) {
    throw new Error(error)
  }
}
export const CardService = { createNew, update, getAllComments, deleted }
