const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const PersonalAmn = require("../models/personalAmnModel");

// @desc Get user personal amn
// @route GET /api/personal/:id
// @access Private
const getPeronalAmn = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const personalAmn = await PersonalAmn.findOne({ user: req.params.id });

  res.status(200).json(personalAmn);
});

// @desc create user personal amn
// @route POST /api/personal
// @access Private
const createPersonalAmn = asyncHandler(async (req, res) => {
  const {
    id,
    thesisOfDisease,
    diabetesMellitus,
    congenitalAnomalies,
    hypertension,
    operations,
    smoking,
  } = req.body;

  if (
    !thesisOfDisease ||
    !diabetesMellitus ||
    !congenitalAnomalies ||
    !hypertension ||
    !operations ||
    !smoking
  ) {
    res.status(400);
    throw new Error("Molimo popunite sva polja");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const personalAmn = await PersonalAmn.create({
    user: id,
    thesisOfDisease,
    diabetesMellitus,
    congenitalAnomalies,
    hypertension,
    operations,
    smoking
  });
  res.status(201).json(personalAmn);
});

// @desc delete user personal amn
// @route delete /api/personal/:id
// @access Private
const deletePeronalAmn = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("Korisnik nije pronadjen");
    }
  
    await PersonalAmn.deleteOne({ user: req.params.id });
  
    res.status(200).json({success: true});
  });

  // @desc update user personal amn
// @route put /api/personal/:id
// @access Private
const updatePeronalAmn = asyncHandler(async (req, res) => {
  
    const personalAmn = await PersonalAmn.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
    res.status(200).json(personalAmn);
  });

module.exports = {
  getPeronalAmn,
  createPersonalAmn,
  deletePeronalAmn,
  updatePeronalAmn
};
