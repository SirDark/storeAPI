require('dotenv').config()
require('express-async-errors')
const express = require('express')
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const PORT = process.env.PORT || 5000
const app = express()

//middleware
app.use(express.json())

//routes
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Product route</a>')
})

app.use('/api/v1/products', productRouter)

//product route
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const start = async() => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log('app is listening on port '+ PORT + "...")
        })
    } catch (error) {
        console.log(error)
    }
}

start()
