const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: { type: String, required: true },
  age: { type: Number, required: true },
  licenseNumber: {
    type: String,
    required: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = { Driver };
