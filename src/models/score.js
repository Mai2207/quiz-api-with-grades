const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    quiz_id:{
        type:String,
    },
    
    score:{
        type:Number
    }

})
module.exports = mongoose.model('Score', scoreSchema)