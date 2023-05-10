const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Examinations = require("../models/examinationsModel")

// @desc Get user examination
// @route GET /api/examination/:id
// @access Private
const getExamination = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const examination = await Examinations.findOne({ user: req.params.id });

  res.status(200).json(examination);
});

// @desc create user examination
// @route POST /api/examination
// @access Private
const createExamination = asyncHandler(async (req, res) => {
  const {
    id,
    date,
    ng,
    weight,
    x,
    y,
    cervix,
    forerunnersHeight,
    bdp,
    hc,
    ac,
    fl,
    amnioticFluid,
    placenta,
    urine,
    e,
    h5,
    suk,
    Fe,
    specialObservations,
    nextControl
  } = req.body;

  if (
    !date ||
    !ng ||
    !weight ||
    !x ||
    !y ||
    !cervix ||
    !forerunnersHeight ||
    !bdp ||
    !hc ||
    !ac ||
    !fl ||
    !amnioticFluid ||
    !placenta ||
    !urine ||
    !e ||
    !h5 ||
    !suk ||
    !Fe ||
    !specialObservations ||
    !nextControl 
  ) {
    res.status(400);
    throw new Error("Molimo popunite sva polja");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronadjen");
  }

  const examination = await Examinations.create({
    user: id,
    date,
    ng,
    weight,
    x,
    y,
    cervix,
    forerunnersHeight,
    bdp,
    hc,
    ac,
    fl,
    amnioticFluid,
    placenta,
    urine,
    e,
    h5,
    suk,
    Fe,
    specialObservations,
    nextControl
  });
  res.status(201).json(examination);
});

// @desc delete user examination
// @route delete /api/examination/:id
// @access Private
const deleteExamination = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("Korisnik nije pronadjen");
    }
  
    await Examinations.deleteOne({ user: req.params.id });
  
    res.status(200).json({success: true});
  });

  // @desc update user examination
// @route put /api/examination/:id
// @access Private
const updateExamination = asyncHandler(async (req, res) => {
  
    const examination = await Examinations.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
    res.status(200).json(examination);
  });

module.exports = {
  getExamination,
  createExamination,
  deleteExamination,
  updateExamination
};
