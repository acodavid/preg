const express = require('express')
const router = express.Router()
const {createReproductiveAmn, getReproductiveAmn, deleteReproductiveAmn, updateReproductiveAmn} = require('../controllers/reproductiveAmnController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createReproductiveAmn)
router.route('/:id').get(protect, getReproductiveAmn).delete(protect, deleteReproductiveAmn).put(protect, updateReproductiveAmn)

module.exports = router