import { UserServices } from '../services/user.service'
import { cloudinary } from '../utils/cloudinary'
import { HttpStatusCode } from '../utils/constants'
import _ from 'lodash'
const edit = async (req, res) => {
  try {
    const { id } = req.params //destructuring //return về một array hay object rest api
    const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'gzboky4y',
    })
    req.body.image = uploadedResponse.url
    const result = await UserServices.update(id, req.body)
    _.unset(result.value, 'password')
    res.status(HttpStatusCode.OK).json(result.value)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}
const getAll = async (req, res) => {
  try {
    const { user_id } = res.locals
    let result = await UserServices.getAll(user_id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}
export const UserController = { edit, getAll }
