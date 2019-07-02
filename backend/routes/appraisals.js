const express = require("express");
const Appraisal = require('../models/appraisal');

const router = express.Router();

router.post("", (req, res, next) => {
  const appraisal = new Appraisal({
    employee: req.body.employee,
    form: req.body.form,
    deadline: req.body.deadline,
  });

  appraisal.save().then(createdAppraisal => {
    res.status(201).json({
      message: 'Appraisal added successfully!',
      appraisalId: createdAppraisal._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const appraisal = new Appraisal({
    _id: req.body.id,
    employee: req.body.employee,
    form: req.body.form,
    deadline: req.body.deadline,
  });
  Appraisal.updateOne({ _id: req.params.id }, appraisal).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Appraisal.find()
  .populate('employee')
  .then(documents => {
    res.status(200).json({
      message: 'Appraisal fetched successfully!',
      appraisals: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Appraisal.findById(req.params.id).then(appraisal => {
    if (appraisal) {
      res.status(200).json(appraisal);
    } else {
      res.status(404).json({ message: 'Appraisal not found!' });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Appraisal.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Appraisal Deleted!" });
  });
});

module.exports = router;
