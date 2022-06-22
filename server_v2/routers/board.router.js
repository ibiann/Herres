const router = require('express').Router()

const Board = require('../models/board.model')

router.post('/create', async (req, res, next) => {
    const { title } = req.body
    if(title){
       await Board.create(req.body)
       res.json({ success: true, message: 'done', board: req.body })
    }
})

router.put('/edit', async (req, res, next) => {
    const { id } = req.params
    let board = await Board.findById(id)
    if(!board) res.json({ success: false, message: 'board not found'})
    await Board.updateOne({ id }, board)
       res.json({ success: true, message: 'done', board: board })
})

router.delete('/delete', async (req, res, next) => {
    const { id } = req.params
    let board = await Board.deleteOne({ id })
    if(!board) res.json({ success: false, message: 'board not found'})
       res.json({ success: true, message: 'done', board: board })
})

router.get('/view', async (req, res, next) => {
    const { textSearch } = req.params
    const cond = textSearch ? { title: { $regex: '/'+textSearch+'/'} } : {}
    let boards = await Board.find(cond)
       res.json({ success: true, message: 'done', data: boards })
})

router.post('/members', async (req, res, next) => {
    const { members = []} = req.body
    let board = await Board.findOne({ id:req.params.id })
    if(board){
        board.members = [...board, ...members]
    }
    await Board.findOneAndUpdate({ id:req.params.id }, board)
       res.json({ success: true, message: 'done', data: board })
})

module.exports = router