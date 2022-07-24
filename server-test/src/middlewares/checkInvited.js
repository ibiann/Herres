const { UserModel } = require('./../models/user.model')

const verifyInvitedMiddleware = async (req, res, next) => {
  const currentUser = await UserModel.getCurrentUser(res.locals.user_id)
  console.log(currentUser, req.params)
  next()
}
module.exports = verifyInvitedMiddleware
