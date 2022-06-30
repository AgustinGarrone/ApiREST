import cookieParser from 'cookie-parser'
import 'dotenv/config'
import "./database/connect.js"
import express from "express"
import authRouter from './routes/Auth.route.js'
import { urlencoded } from 'express'


const app=express()
/* app.use(express.urlencoded()) */
app.use(express.json()) //lee el body en formato JSON. luego hay que hacer el urlencoded
app.use(cookieParser())
app.use('/api/V1',authRouter)




    //LISTENING
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log("server running 😘"))