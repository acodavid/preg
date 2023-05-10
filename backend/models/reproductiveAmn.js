const mongoose = require('mongoose')

const reproductiveAmnModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    durationMenstrualCycle: {
        type: String,
        required: [true, 'Please add this field']
    },
    lengthMenstrualCycle: {
        type: String,
        required: [true, 'Please add this field']
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('ReproductiveAmn', reproductiveAmnModel)