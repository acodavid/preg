const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const FamilyAmn = require("../models/familyAmnModel")

// @desc Get user family amn
// @route GET /api/family/:id
// @access Private
const getFamilyAmn = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const familyAmn = await FamilyAmn.findOne({ user: req.params.id });

  res.status(200).json(familyAmn);
});

// @desc create user family amn
// @route POST /api/family
// @access Private
const createFamilyAmn = asyncHandler(async (req, res) => {
  const {
    id,
    diabetesMellitus,
    congenitalAnomalies,
    inheritedAnomalies,
    nervousAndMentalDiseases,
    multiplePregnancies,
    chronicSystemicDiseases,
    other
  } = req.body;

  if (
    !diabetesMellitus ||
    !congenitalAnomalies ||
    !inheritedAnomalies ||
    !nervousAndMentalDiseases ||
    !multiplePregnancies ||
    !chronicSystemicDiseases ||
    !other
  ) {
    res.status(400);
    throw new Error("Molimo popunite sva polja");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const familyAmn = await FamilyAmn.create({
    user: id,
    diabetesMellitus,
    congenitalAnomalies,
    inheritedAnomalies,
    nervousAndMentalDiseases,
    multiplePregnancies,
    chronicSystemicDiseases,
    other
  });
  res.status(201).json(familyAmn);
});

// @desc delete user family amn
// @route delete /api/family/:id
// @access Private
const deleteFamilyAmn = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("Korisnik nije pronadjen");
    }
  
    await FamilyAmn.deleteOne({ user: req.params.id });
  
    res.status(200).json({success: true});
  });

  // @desc update user family amn
// @route put /api/family/:id
// @access Private
const updateFamilyAmn = asyncHandler(async (req, res) => {
  
    const familyAmn = await FamilyAmn.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
    res.status(200).json(familyAmn);
  });

module.exports = {
    getFamilyAmn,
    createFamilyAmn,
    deleteFamilyAmn,
    updateFamilyAmn
};
