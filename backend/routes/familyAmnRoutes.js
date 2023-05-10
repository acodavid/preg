const express = require('express')
const router = express.Router()
const {createFamilyAmn, getFamilyAmn, deleteFamilyAmn, updateFamilyAmn} = require('../controllers/familyAmnController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createFamilyAmn)
router.route('/:id').get(protect, getFamilyAmn).delete(protect, deleteFamilyAmn).put(protect, updateFamilyAmn)

module.exports = router