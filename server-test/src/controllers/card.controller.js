import { CardService } from '../services/card.service'
import { HttpStatusCode } from '../utils/constants'

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}
const getAllComments = async (req, res) => {
  const { id: cardId } = req.params
  try {
    const result = await CardService.getAllComments(cardId)
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
    const result = await CardService.update(id, req.body.card)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}

export const CardController = { createNew, update, getAllComments }
