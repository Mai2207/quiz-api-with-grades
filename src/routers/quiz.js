const express = require('express')
const router = express.Router()
const Quiz = require('../models/Quiz')


//create quiz
router.post('/create', async (req, res) => {
    
    try {
    
        const { _id }=req.body
        const { title } = req.body
        const { total_marks } = req.body
        const { time } = req.body
        const { questions } = req.body
        

        const quiz = await Quiz.create({
            
            title,
            time,
            total_marks,
            questions,
            
        })

        return res.status(201).json(quiz)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
 //edit quiz
 router.patch('/edit/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["title","time","total_marks","questions","id"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'})
    }
    const _id = req.params.id

    try{
        const quiz = await Quiz.findOne({_id})
        
        updates.forEach((update) => quiz[update] = req.body[update])
        await quiz.save()

        if(!quiz){
            return res.status(404).send()
        }
        res.send(quiz)


    }catch(e){
        res.status(400).send(e)

    }
})
//delete quiz
router.delete('/delete/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const quiz = await Quiz.findOneAndDelete(_id)
        if(!quiz){
            res.status(404).send()
        }
        res.send()
        

    }catch(e){
        res.status(500).send(e)

    }
})
 












module.exports = router