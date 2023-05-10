const mongoose = require('mongoose')

const familyAmnModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    diabetesMellitus: {
        type: String,
        required: [true, 'Please add this field']
    },
    congenitalAnomalies: {
        type: String,
        required: [true, 'Please add this field']
    },
    inheritedAnomalies: {
        type: String,
        required: [true, 'Please add this field']
    },
    nervousAndMentalDiseases: {
        type: String,
        required: [true, 'Please add this field']
    },
    multiplePregnancies: {
        type: String,
        required: [true, 'Please add this field']
    },
    chronicSystemicDiseases: {
        type: String,
        required: [true, 'Please add this field']
    },
    other: {
        type: String,
        required: [true, 'Please add this field']
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('FamilyAmn', familyAmnModel)