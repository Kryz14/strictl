import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App Config
const app = express()

// Initialize DB connection
try {
    await connectDB()
    await connectCloudinary()
} catch (error) {
    console.error('Initialization error:', error)
}

//middleware 
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

// Development server
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000
    app.listen(port, () => console.log('Server started on Port : ' + port))
}

export default app