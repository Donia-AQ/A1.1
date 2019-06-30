const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const employeeRoutes = require("./routes/employees");
const appraisalRoutes = require("./routes/appraisals");
const appraisalFormRoutes = require("./routes/appraisalForms");

const app = express();

mongoose.connect('mongodb://localhost/ErpDb')
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/employees", employeeRoutes);
app.use("/appraisals", appraisalRoutes);
app.use("/appraisalForms", appraisalFormRoutes);
module.exports = app;
