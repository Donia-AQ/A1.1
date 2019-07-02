const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  age: { type: Number, min: 18, required: true },
  personalEmail:{ type: String },
  personalMobile: { type: Number },
  workEmail: { type: String },
  workPhone: { type: Number},
  nationality: { type: String },
  identificationNo: { type: Number },
  address: { type: String },
  gender: { type: String },
  maritalStatus: { type: String },
  imagePath: { type: String },
  jobPosition: {
    type: mongoose.Schema.Types.String,
    ref: "JobPosition",
  },
  status: { type: String },
  jobType: { type: String},
  salary: { type: Number },
  startedDate: { type: Date },
  certificateLevel: { type: String },
  fieldsOfStudy: { type: String },
  school: { type: String },
  numOfChildren: { type: Number },
});

  module.exports = mongoose.model('Employee', employeeSchema);
