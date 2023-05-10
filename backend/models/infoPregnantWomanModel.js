const mongoose = require('mongoose')

const infoPregnantWomanModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    pm: {
        type: String,
        required: [true, 'Please add this field']
    },
    tp: {
        type: String,
        required: [true, 'Please add this field']
    },
    factors: {
        type: String,
        required: [true, 'Please add this field']
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('infoPregnant', infoPregnantWomanModel)