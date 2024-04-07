import path from 'path'
import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import commentRoutes from "./routes/commentRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
dotenv.config()
const port = process.env.PORT || 5000

connectDB() // connect to db

const app = express()

// bodyParserMiddleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

app.use('/api/comments', commentRoutes)
app.use('/api/users', userRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else{
    app.get('/',(req, res) => {
        res.send('API is running')
    })
}

app.use(errorHandler)
app.use(notFound)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})