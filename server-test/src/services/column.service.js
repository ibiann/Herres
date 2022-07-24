import { ColumnModel } from '../models/column.model'
import { BoardModel } from '../models/board.model'
import { CardModel } from '../models/card.model'

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)
    const getNewColumn = await ColumnModel.findOneById(
      newColumn.insertedId.toString()
    )
    getNewColumn.cards = []
    // update columnOrder Arr in board collection
    await BoardModel.pushColumns(
      getNewColumn.boardId.toString(),
      getNewColumn._id.toString()
    )

    return getNewColumn
  } catch (error) {
    throw new Error(error)
  }
}
const deleted = async (id) => {
  try {
    const deletedColumn = await ColumnModel.deleted(id)
    return deletedColumn
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
    // if (updateData.cards) delete updateData.cards
    // console.log(updateData)

    const updatedColumn = await ColumnModel.update(id, updateData)
    if (updatedColumn._destroy) {
      // deleting cards in column
      CardModel.deleteCards(updatedColumn.cards)
    }

    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update, deleted }
