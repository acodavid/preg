const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to my app'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/personal', require('./routes/personalAmnRoutes'))
app.use('/api/family', require('./routes/familyAmnRoutes'))
app.use('/api/reproductive', require('./routes/reproductiveAmnRoutes'))
app.use('/api/notes', require('./routes/notesRoutes'))
app.use('/api/info', require('./routes/infoPregnantWomanRoutes'))
app.use('/api/examinations', require('./routes/examinationsRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})