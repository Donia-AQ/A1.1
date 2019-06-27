const mongoose = require('mongoose');


const appraisalFormSchema = mongoose.Schema({
  appraisalFormName: { type: String, required: true },
  questions: {
    type: Array,
    required: true,
    questionName: { type: String, required: true },
    questionType: { type: String, required: true },
  }
});

module.exports = mongoose.model('AppraisalForm', appraisalFormSchema);
