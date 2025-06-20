const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db')
const authRouter = require('./routes/authRoute')

dotenv.config()
connectDb()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/',(req,res)=>{
    return res.send("Hare Krishna 🙏")
})

app.use('/auth/api',authRouter)

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})