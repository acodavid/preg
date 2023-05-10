const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const ReproductiveAmn = require("../models/reproductiveAmn");

// @desc Get user reproductive amn
// @route GET /api/reproductive/:id
// @access Private
const getReproductiveAmn = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const reproductiveAmn = await ReproductiveAmn.findOne({ user: req.params.id });

  res.status(200).json(reproductiveAmn);
});

// @desc create user reproductive amn
// @route POST /api/reproductive
// @access Private
const createReproductiveAmn = asyncHandler(async (req, res) => {
  const {
    id,
    durationMenstrualCycle,
    lengthMenstrualCycle
  } = req.body;

  if (
    !durationMenstrualCycle ||
    !lengthMenstrualCycle
  ) {
    res.status(400);
    throw new Error("Molimo popunite sva polja");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const reproductiveAmn = await ReproductiveAmn.create({
    user: id,
    durationMenstrualCycle,
    lengthMenstrualCycle
  });
  res.status(201).json(reproductiveAmn);
});

// @desc delete user reproductive amn
// @route delete /api/reproductive/:id
// @access Private
const deleteReproductiveAmn = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("Korisnik nije pronadjen");
    }
  
    await ReproductiveAmn.deleteOne({ user: req.params.id });
  
    res.status(200).json({success: true});
  });

  // @desc update user personal amn
// @route put /api/personal/:id
// @access Private
const updateReproductiveAmn = asyncHandler(async (req, res) => {
  
    const reproductiveAmn = await ReproductiveAmn.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
    res.status(200).json(reproductiveAmn);
  });

module.exports = {
  getReproductiveAmn,
  createReproductiveAmn,
  deleteReproductiveAmn,
  updateReproductiveAmn
};
