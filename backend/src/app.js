import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'

const app = express();


app.use(cors({
    origin : process.env.CORS_ORIGIN, 
    Credential: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true, limit :"16kb"}))
app.use(express.static("public"))
app.use(cookiesParser())

// import router
import userRouter from './routes/user.router.js'

app.use("/api/v1/users", userRouter)


//http://localhost:8000/api/v1/users/register

export {app};