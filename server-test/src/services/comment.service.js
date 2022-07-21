import { CommentModel } from '../models/comment.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const createdComment = await CommentModel.createNew(data)
    const getNewComment = await CommentModel.findOneById(
      createdComment.insertedId.toString()
    )
    return getNewComment
  } catch (error) {
    throw new Error(error)
  }
}

export const CommentService = {
  createNew,
}
