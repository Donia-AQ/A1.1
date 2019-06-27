const mongoose = require('mongoose');


const appraisalSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppraisalForm",
    required: true
  },
  deadline: { type: Date, required: true},
});

module.exports = mongoose.model('Appraisal', appraisalSchema);
