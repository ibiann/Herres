import { BoardModel } from "../models/board.model";
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data)
    const getNewBoard = await BoardModel.findOneById(createdBoard.insertedId.toString())
    return getNewBoard
  } catch (error) {
    throw new Error(error);
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    }
    if (updateData._id) delete updateData._id
    if (updateData.columns) delete updateData.columns

    const updatedBoard = await BoardModel.update(id, updateData)

    return updatedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    if (!board || !board.columns) {
      throw new Error('Board not found!!! SOS')
    }

    const transformBoard = cloneDeep(board)
    /* Filter deleted columns */
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)

    // Add cards to the columns
    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    
    // sort the column order, card order
    // Remove cards data from boards
    delete transformBoard.cards
    
    return transformBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, update, getFullBoard };
