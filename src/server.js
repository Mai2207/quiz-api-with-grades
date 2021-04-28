const express = require('express')
const app = express()
require('./db/mongoose')
const routes = require('./routes') // includes the routes.js file
const cors = require('cors') // includes cors module

require('dotenv').config()

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js


const port = process.env.PORT ||3000
app.listen(port, () => {
    console.log("The api is running..." +port)
})