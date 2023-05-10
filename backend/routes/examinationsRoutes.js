const express = require('express')
const router = express.Router()
const {getExamination, createExamination, deleteExamination, updateExamination} = require('../controllers/examinationController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createExamination)
router.route('/:id').get(protect, getExamination).delete(protect, deleteExamination).put(protect, updateExamination)

module.exports = router