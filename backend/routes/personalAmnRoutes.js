const express = require('express')
const router = express.Router()
const {getPeronalAmn, createPersonalAmn, deletePeronalAmn, updatePeronalAmn} = require('../controllers/personalAmnController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createPersonalAmn)
router.route('/:id').get(protect, getPeronalAmn).delete(protect, deletePeronalAmn).put(protect, updatePeronalAmn)

module.exports = router