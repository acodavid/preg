const express = require('express')
const router = express.Router()
const {getInfo, createInfo, deleteInfo, updateInfo} = require('../controllers/infoPregnantWomanController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createInfo)
router.route('/:id').get(protect, getInfo).delete(protect, deleteInfo).put(protect, updateInfo)

module.exports = router