import { UserModel } from './../models/user.model'
const { createNew, findOneByEmail, getCurrentUser } = UserModel
export const AuthServices = { createNew, findOneByEmail, getCurrentUser }
