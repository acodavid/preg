const express = require('express')
const router = express.Router()
const {createNote, getNote, deleteNote, updateNote} = require('../controllers/notesController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, createNote)
router.route('/:id').get(protect, getNote).delete(protect, deleteNote).put(protect, updateNote)

module.exports = router