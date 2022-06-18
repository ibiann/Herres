require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user.router')
const { default: mongoose } = require('mongoose')

const app = express();
global.__mongoose = mongoose.connect('')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', userRouter)

app.use((err, req, res, next) => {
    res.json(err)
})

app.listen(process.env.APP_PORT || 5000)
