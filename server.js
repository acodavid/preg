const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./backend/middleware/errorMiddleware')
const connectDB = require('./backend/config/db')
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
app.use('/api/users', require('./backend/routes/userRoutes'))
app.use('/api/personal', require('./backend/routes/personalAmnRoutes'))
app.use('/api/family', require('./backend/routes/familyAmnRoutes'))
app.use('/api/reproductive', require('./backend/routes/reproductiveAmnRoutes'))
app.use('/api/notes', require('./backend/routes/notesRoutes'))
app.use('/api/info', require('./backend/routes/infoPregnantWomanRoutes'))
app.use('/api/examinations', require('./backend/routes/examinationsRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})