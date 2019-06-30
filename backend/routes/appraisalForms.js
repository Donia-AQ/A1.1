const express = require("express");
const AppraisalForm = require('../models/appraisalForm');

const router = express.Router();

router.post("", (req, res, next) => {
  const appraisalForm = new AppraisalForm({
    appraisalFormName: req.body.appraisalFormName,
    questions: req.body.questions
  });
  appraisalForm.save().then(createdAppraisalForm => {
    res.status(201).json({
      message: 'Appraisal Form added successfully!',
      appraisalFormId: createdAppraisalForm._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const appraisalForm = new AppraisalForm({
    _id: req.body.id,
    appraisalFormName: req.body.appraisalFormName,
    questions: req.body.questions
  });
  AppraisalForm.updateOne({ _id: req.params.id }, appraisalForm).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  AppraisalForm.find().then(documents => {
    res.status(200).json({
      message: 'Appraisal Form fetched successfully!',
      appraisalForms: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  AppraisalForm.findById(req.params.id).then(appraisalForm => {
    if (appraisalForm) {
      res.status(200).json(appraisalForm);
    } else {
      res.status(404).json({ message: 'Appraisal Form not found!' });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  AppraisalForm.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Appraisal Form Deleted!" });
  });
});

module.exports = router;
