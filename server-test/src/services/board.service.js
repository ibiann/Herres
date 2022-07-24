import { BoardModel } from '../models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data)
    const getNewBoard = await BoardModel.findOneById(
      createdBoard.insertedId.toString()
    )
    return getNewBoard
  } catch (error) {
    throw new Error(error)
  }
}
const getAll = async (user_id, search) => {
  try {
    const boards = await BoardModel.getAll(user_id, search)

    return boards
  } catch (error) {
    throw new Error(error)
  }
}
const getInvitedUsers = async (boardId) => {
  try {
    const boards = await BoardModel.getInvitedUsers(boardId)
    return boards
  } catch (error) {
    throw new Error(error)
  }
}
const getCanInvitedUsers = async (boardId, userId) => {
  try {
    const boards = await BoardModel.canUserInvite(boardId, userId)
    return boards
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
    if (updateData.columns) delete updateData.columns

    const updatedBoard = await BoardModel.update(id, updateData)

    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const { board, originalData } = await BoardModel.getFullBoard(boardId)
    if (!board || !board.columns) {
      throw new Error('Board not found!!! SOS')
    }
    const transformBoard = cloneDeep(board)
    /* Filter deleted columns */
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    )
    originalData.columns = originalData.columns.filter(
      (column) => !column._destroy
    )

    // Add cards to the columns
    // console.log('Origin:', originalData.columns)
    // console.log('Transform:', transformBoard)
    originalData.columns.forEach((column, index) => {
      const cards = []
      column.cards.forEach((cardId) => {
        transformBoard.cards.forEach((card) => {
          // console.log(card._id, cardId)
          if (card._id.toString() === cardId && !card._destroy) cards.push(card)
        })
      })
      column.cards = cards
    })
    transformBoard.columns = originalData.columns
    // sort the column order, card order
    // Remove cards data from boards
    delete transformBoard.cards

    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
}
const invitedUsers = async (boardId, data) => {
  try {
    const boards = await BoardModel.invitedUsers(boardId, data)
    return boards
  } catch (error) {
    throw new Error(error)
  }
}
const deleted = async (id) => {
  try {
    const deletedBoard = await BoardModel.deleted(id)
    return deletedBoard
  } catch (error) {
    throw new Error(error)
  }
}
export const BoardService = {
  createNew,
  update,
  getFullBoard,
  getAll,
  getInvitedUsers,
  getCanInvitedUsers,
  invitedUsers,
  deleted,
}
