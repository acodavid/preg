const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please add a date of birth']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    job: {
        type: String,
        required: [true, 'Please add a job']
    },
    maritalStatus: {
        type: String,
        required: [true, 'Please add a your status']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)