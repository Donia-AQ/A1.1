const express = require("express");
const multer = require('multer');
const Employee = require('../models/employee');

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + "." + ext);
  }
});

router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    age: req.body.age,
    personalEmail: req.body.personalEmail,
    personalMobile: req.body.personalMobile,
    workEmail: req.body.workEmail,
    workPhone: req.body.workPhone,
    nationality: req.body.nationality,
    identificationNo: req.body.identificationNo,
    passportNo: req.body.passportNo,
    address: req.body.address,
    gender: req.body.gender,
    maritalStatus: req.body.maritalStatus,
    imagePath: url + "/images/" + req.file.filename,
    jobPosition: req.body.jobPosition,
    status: req.body.status,
    jobType: req.body.jobType,
    salary: req.body.salary,
    startedDate: req.body.startedDate,
    certificateLevel: req.body.certificateLevel,
    fieldsOfStudy: req.body.fieldsOfStudy,
    school: req.body.school,
    numOfChildren: req.body.numOfChildren
  });

  employee.save().then(createdEmployee => {
    res.status(201).json({
      message: 'Employee added successfully!',
      employee: {
        id: createdEmployee._id,
        firstName: createdEmployee.firstName,
        lastName: createdEmployee.lastName,
        birthDate: createdEmployee.birthDate,
        age: createdEmployee.age,
        personalEmail: createdEmployee.personalEmail,
        personalMobile: createdEmployee.personalMobile,
        workEmail: createdEmployee.workEmail,
        workPhone: createdEmployee.workPhone,
        nationality: createdEmployee.nationality,
        identificationNo: createdEmployee.identificationNo,
        passportNo: createdEmployee.passportNo,
        address: createdEmployee.address,
        gender: createdEmployee.gender,
        maritalStatus: createdEmployee.maritalStatus,
        imagePath: createdEmployee.imagePath,
        jobPosition: createdEmployee.jobPosition,
        status: createdEmployee.status,
        jobType: createdEmployee.jobType,
        salary: createdEmployee.salary,
        startedDate: createdEmployee.startedDate,
        certificateLevel: createdEmployee.certificateLevel,
        fieldsOfStudy: createdEmployee.fieldsOfStudy,
        school: createdEmployee.school,
        numOfChildren: createdEmployee.numOfChildren
      }
    });
    });
  });

router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const employee = new Employee({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    age: req.body.age,
    personalEmail: req.body.personalEmail,
    personalMobile: req.body.personalMobile,
    workEmail: req.body.workEmail,
    workPhone: req.body.workPhone,
    nationality: req.body.nationality,
    identificationNo: req.body.identificationNo,
    passportNo: req.body.passportNo,
    address: req.body.address,
    gender: req.body.gender,
    maritalStatus: req.body.maritalStatus,
    imagePath: imagePath,
    jobPosition: req.body.jobPosition,
    status: req.body.status,
    jobType: req.body.jobType,
    salary: req.body.salary,
    startedDate: req.body.startedDate,
    certificateLevel: req.body.certificateLevel,
    fieldsOfStudy: req.body.fieldsOfStudy,
    school: req.body.school,
    numOfChildren: req.body.numOfChildren
  });
  Employee.updateOne({ _id: req.params.id }, employee).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: 'Employees fetched successfully!',
      employees: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Employee.findById(req.params.id).then(employee => {
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found!' });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Employee Deleted!" });
  });
});

module.exports = router;
