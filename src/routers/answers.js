const express = require('express')
const router = express.Router()
const Answer = require('../models/Answer')
const Quiz =require('../models/Quiz')
const Score=require('../models/score')


//save answers 
//in this router we will get in req.body  
// {
//     "quizID":"60bd11d476baba02f43615f7",
//     "Answers":[
//         {
//             "question":"how are you",
//             "answer":"fine"
//         },{
//             "question":"how old are you",
//             "answer":"23"
//         }
//     ]
    
    
// }
// and the answers and score will save in the database ,then i return the total score
router.post('/submit',async (req, res) =>{
    
    try {
    
        const { Answers } = req.body
        const { quizID } = req.body
  
        const answer = await Answer.create({
            Answers,
            quizID
        })



        const quiz= await Quiz.findOne({_id:quizID})
        var sum=0
        quiz.questions.forEach(element => {
            
            Answers.forEach(ans=>{
                
                if(element.question===ans.question){

                    if(element.answer===ans.answer){
                        sum+=1

                    }
                     
                }
                
            })

        })
        const totalscore =await  Score.create({
                    quiz_id:quizID,
                    score:sum
                })
        
        
     
       
        
        
         res.status(201).send(totalscore)

    } catch (error) {
         res.status(500).send(error)
         
    }
})
//edit answers and send the total score
router.patch('/edit',async (req,res)=>{
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ["Answers","quizID"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'})
    }
    const {quizID }= req.body
    const{ Answers }=req.body
    const score =await Score.deleteMany({quiz_id:quizID})
        

    try{
        const answer = await Answer.findOne({quizID})
        
        updates.forEach((update) => answer[update] = req.body[update])
        await answer.save()

        const quiz= await Quiz.findOne({_id:quizID})
        var sum=0
        quiz.questions.forEach(element => {
            
            Answers.forEach(ans=>{
                
                if(element.question===ans.question){

                    if(element.answer===ans.answer){
                        sum+=1

                    }
                     
                }
                
            })

        })
        const totalscore =await  Score.create({
                    quiz_id:quizID,
                    score:sum
                })
        
        
     

        if(!answer){
            return res.status(404).send()
        }

        res.status(201).send(totalscore)


    }catch(e){
        res.status(400).send(e)

    }
})




module.exports = router
