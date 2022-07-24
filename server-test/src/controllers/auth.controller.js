const jwt = require('jsonwebtoken')
import { AuthServices } from '../services/auth.service'
import _ from 'lodash'

const login = async (req, res, next) => {
  const { email, password } = req.body
  console.log(req.body)
  if (!email || !password) res.json({})
  try {
    let user = await AuthServices.findOneByEmail(email)
    if (user && user.password === password) {
      const token = jwt.sign({ user }, process.env.SECRET_KEY)
      _.unset(user, 'password')
      res.json({ token, user, success: true })
    } else {
      res
        .status(400)
        .json({ message: 'email or password was wrong!', success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}

const register = async (req, res, next) => {
  const { name, username, email, password } = req.body
  if (!name || !username || !email || !password)
    return res.json({ success: false, message: 'empty field' })
  const isExisted = await checkEmailExisted(email, username)
  if (isExisted)
    return res.json({ success: false, message: 'Email or username existed' })
  try {
    const user = await AuthServices.createNew(req.body)
    const token = jwt.sign({ user }, process.env.SECRET_KEY)
    _.unset(user, 'password')
    console.log(user)
    res.json({ success: true, user: user, token: token })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error })
  }
}
async function checkEmailExisted(email, username) {
  if (!email || !username) return false
  const user = await AuthServices.findOneByEmail(email)
  if (user && username === user.username) return true
  return false
}

const getCurrentUser = async (req, res) => {
  const { user_id } = res.locals

  try {
    const user = await AuthServices.getCurrentUser(user_id)
    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error })
  }
}
export const authController = { login, register, getCurrentUser }
