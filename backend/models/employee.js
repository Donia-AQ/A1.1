const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  age: { type: Number, min: 18, required: true },
  personalEmail:{ type: String, required: true },
  personalMobile: { type: Number, required: true },
  workEmail: { type: String, required: true },
  workPhone: { type: Number, required: true },
  nationality: { type: String, required: true },
  identificationNo: { type: Number, required: true },
  passportNo: { type: Number, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  imagePath: { type: String, required: true },
  jobPosition: {
    type: mongoose.Schema.Types.String,
    ref: "JobPosition",
    required: true
  },
  status: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: { type: Number, required: true },
  startedDate: { type: Date, required: true },
  certificateLevel: { type: String, required: true },
  fieldsOfStudy: { type: String, required: true },
  school: { type: String, required: true },
  numOfChildren: { type: Number },
});

  module.exports = mongoose.model('Employee', employeeSchema);
