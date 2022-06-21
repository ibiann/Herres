const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    sername: String,
    email: String,
    password: String
})


module.exports = model('users',userSchema)


