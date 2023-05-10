const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Notes = require('../models/notesModel')

// @desc Get user notes
// @route GET /api/notes/:id
// @access Private
const getNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const notes = await Notes.findOne({ user: req.params.id });

  res.status(200).json(notes);
});

// @desc create user ntoes
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const {
    id,
    notes
  } = req.body;

  if (
    !notes 
  ) {
    res.status(400);
    throw new Error("Molimo popunite sva polja");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const note = await Notes.create({
    user: id,
    notes
  });
  res.status(201).json(note);
});

// @desc delete user note
// @route delete /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("Korisnik nije pronadjen");
    }
  
    await Notes.deleteOne({ user: req.params.id });
  
    res.status(200).json({success: true});
  });

  // @desc update user note
// @route put /api/personal/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  
    const notes = await Notes.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
    res.status(200).json(notes);
  });

module.exports = {
  getNote,
  createNote,
  deleteNote,
  updateNote
};
