const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const InfoPregnant = require('../models/infoPregnantWomanModel')

// @desc Get user info
// @route GET /api/info/:id
// @access Private
const getInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const info = await InfoPregnant.findOne({ user: req.params.id });

  res.status(200).json(info);
});

// @desc create user info
// @route POST /api/info
// @access Private
const createInfo = asyncHandler(async (req, res) => {
  const {
    id,
    pm,
    tp,
    factors
  } = req.body;

  if (
    !pm ||
    !tp ||
    !factors
  ) {
    res.status(400);
    throw new Error("Molimo popunite sva polja");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const info = await InfoPregnant.create({
    user: id,
    pm,
    tp,
    factors
  });
  res.status(201).json(info);
});

// @desc delete user info
// @route delete /api/info/:id
// @access Private
const deleteInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("Korisnik nije pronadjen");
    }
  
    await InfoPregnant.deleteOne({ user: req.params.id });
  
    res.status(200).json({success: true});
  });

  // @desc update user info
// @route put /api/info/:id
// @access Private
const updateInfo = asyncHandler(async (req, res) => {
  
    const info = await InfoPregnant.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
    res.status(200).json(info);
  });

module.exports = {
  getInfo,
  createInfo,
  deleteInfo,
  updateInfo
};
