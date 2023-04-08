import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

import { createNewUser, signIn } from './handlers/user'
import { protect } from './modules/auth'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
//get the query out of the url
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res) => {
    console.log('hello from express')
    res.status(200)
    res.json({message:'hello'})
})

app.use('/api',protect,router)

app.post('/user',createNewUser)
app.post('/signin',signIn)

export default app