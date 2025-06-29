const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db')
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')
const cors = require('cors')

dotenv.config()
connectDb()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())


app.get('/',(req,res)=>{
    return res.send("Hare Krishna 🙏")
})

app.use('/auth/api',authRouter)
app.use('/products',productRouter)

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})