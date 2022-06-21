const mongoose = require('mongoose')
const { Schema, model } = mongoose

const boardSchema = new Schema({
    title: String,
    createdBy: String,
    members: [String],
    file: String,
    color: String,
})


module.exports = model('boards',boardSchema)


