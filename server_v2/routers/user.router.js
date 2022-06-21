const router = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    if(!email || !password) res.json({})
    const user = await User.findOne({ email })
    if(user && user.password === password){
        const token =  jwt.sign({user}, process.env.SECRET_KEY)
        res.json({ token, user, success: true })
    }else{
        res.json({ message: 'email or password was wrong!', success: false})
    }
})


router.post('/register', async (req, res, next) => {
    const { name, sername, email, password } = req.body
    if(!name || !sername || !email || !password) res.json({ success: false, message: 'empty field'})
    const isExisted = await checkEmailExisted(email)
    if(isExisted) res.json({ success: false, message: 'Email is exist'})
    await User.create(req.body)
    res.json({ success: true, user: req.body})
})


async function checkEmailExisted(email){
    if(!email) return false
    const user = await User.findOne({email})
    console.log(user)
    if(user) return true
    return false
}

module.exports = router