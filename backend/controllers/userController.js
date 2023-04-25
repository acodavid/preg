const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {

    const {name, email, password, phone, dateOfBirth, isAdmin} = req.body

    // Validation
    if(!name || !email || !password || !phone || !dateOfBirth) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        dateOfBirth,
        isAdmin
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    // check user and password match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {

    res.status(200).json(req.user)
    
})

// generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports  = {
    registerUser,
    loginUser,
    getMe
}