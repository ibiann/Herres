const router = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

router.post('/login',  (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) res.json({})
    const user = User.findOne({ email })
    if(user && user.password === password){
        const token =  jwt.sign(user, SECRET_KEY)
        res.json({ token })
    }else{
        res.json({ message: 'email or password was wrong!'})
    }
})


router.post('/register', async (req, res, next) => {
    const { name, sername, email, password } = req.body
    if(!name || !sername || !email || !password) res.json({})
    await User.create(req.body)
    res.json(req.body)
})

module.exports = router