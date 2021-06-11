const express = require('express')
const app = express()
require('./db/mongoose')
const quizrouter = require('./routers/quiz') 
const answerrouter=require('./routers/answers')
const cors = require('cors') // includes cors module

require('dotenv').config()

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(quizrouter) // tells the server to use the routes in routes.js
app.use(answerrouter)

const port = process.env.PORT ||3000
app.listen(port, () => {
    console.log("The api is running..." +port)
})