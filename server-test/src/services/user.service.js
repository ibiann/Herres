import { UserModel } from '../models/user.model'
const { editUser, getAll } = UserModel

export const UserServices = { update: editUser, getAll }
