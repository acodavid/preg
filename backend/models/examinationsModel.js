

const mongoose = require('mongoose')

const examinationsModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: [true, 'Please add this field']
    },
    ng: {
        type: String,
        required: [true, 'Please add this field']
    },
    weight: {
        type: String,
        required: [true, 'Please add this field']
    },
    x: {
        type: String,
        required: [true, 'Please add this field']
    },
    y: {
        type: String,
        required: [true, 'Please add this field']
    },
    cervix: {
        type: String,
        required: [true, 'Please add this field']
    },
    forerunnersHeight: {
        type: String,
        required: [true, 'Please add this field']
    },
    bdp: {
        type: String,
        required: [true, 'Please add this field']
    },
    hc: {
        type: String,
        required: [true, 'Please add this field']
    },
    ac: {
        type: String,
        required: [true, 'Please add this field']
    },
    fl: {
        type: String,
        required: [true, 'Please add this field']
    },
    amnioticFluid: {
        type: String,
        required: [true, 'Please add this field']
    },
    placenta: {
        type: String,
        required: [true, 'Please add this field']
    },
    urine: {
        type: String,
        required: [true, 'Please add this field']
    },
    e: {
        type: String,
        required: [true, 'Please add this field']
    },
    h5: {
        type: String,
        required: [true, 'Please add this field']
    },
    suk: {
        type: String,
        required: [true, 'Please add this field']
    },
    Fe: {
        type: String,
        required: [true, 'Please add this field']
    },
    specialObservations: {
        type: String,
        required: [true, 'Please add this field']
    },
    nextControl: {
        type: Date,
        required: [true, 'Please add this field']
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('examinations', examinationsModel)