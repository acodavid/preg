const mongoose = require('mongoose')

const personalAmnModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    thesisOfDisease: {
        type: String,
        required: [true, 'Please add this field']
    },
    diabetesMellitus: {
        type: String,
        required: [true, 'Please add this field']
    },
    congenitalAnomalies: {
        type: String,
        required: [true, 'Please add this field']
    },
    hypertension: {
        type: String,
        required: [true, 'Please add this field']
    },
    operations: {
        type: String,
        required: [true, 'Please add this field']
    },
    smoking: {
        type: String,
        required: [true, 'Please add this field']
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('PersonalAmn', personalAmnModel)