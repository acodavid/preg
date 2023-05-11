const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, getAllNonAdminUsers} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.get('/all', protect, getAllNonAdminUsers)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

module.exports = router