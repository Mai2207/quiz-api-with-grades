const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    quizID:{
        type:String,
        required:true
    },
    Answers:[{
       
        question :{
            type:String,
            required:true,
            trim:true
        },
        answer:{
            type:String,
            required:true,
            trim:true
        }
    }   
    ]
   
   
})


module.exports = mongoose.model('Answer', AnswerSchema)