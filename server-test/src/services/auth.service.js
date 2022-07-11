import { UserModel } from './../models/user.model'
const { createNew, findOneByEmail } = UserModel
export const AuthServices = { createNew, findOneByEmail }
