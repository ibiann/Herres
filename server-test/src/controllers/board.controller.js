import e from 'express'
import { BoardService } from '../services/board.service'
import { HttpStatusCode } from '../utils/constants'
const { cloudinary } = require('../utils/cloudinary')

const createNew = async (req, res) => {
  try {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.image,
        {
          upload_preset: 'jckslymx',
        }
      )
      req.body.image = uploadedResponse.url
      const result = await BoardService.createNew({
        ...req.body,
        user_id: res.locals.user_id,
      })
      console.log(result)
      res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
      console.log(error)
      return res.status(HttpStatusCode.INTERNAL_SERVER).json({ message: error })
    }
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}

const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params
    const result = await BoardService.getFullBoard(id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}

const getAll = async (req, res) => {
  try {
    const { user_id } = res.locals
    const result = await BoardService.getAll(user_id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}
const update = async (req, res) => {
  try {
    const { id } = req.params //destructuring //return về một array hay object rest api
    const result = await BoardService.update(id, req.body)
    console.log(result)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}

export const BoardController = { createNew, getFullBoard, update, getAll }
