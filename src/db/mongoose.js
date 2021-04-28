const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mai:mai.2207@cluster0.gthna.mongodb.net/quizDatabase?retryWrites=true&w=majority',{
    useNewUrlParser : true , 
    useCreateIndex : true,
    useFindAndModify:false
})


 

