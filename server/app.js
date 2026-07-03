import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import taskRouter from './routes/taskRoutes.js'

const app = express()

// we run cors here for security reason
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/api/auth',authRouter)
app.use('/api/task',taskRouter)

app.get('/',(req,res) => {
    res.json({
        success:true,
        message:"Task Tracker is running"
    })
})

export default app