const mongoose = require("mongoose");

const garbageTruckSchema = new mongoose.Schema({
  truckNumber: {
    type: String,
    required: true,
    unique: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
});

const GarbageTruck = mongoose.model("GarbageTruck", garbageTruckSchema);

module.exports = {GarbageTruck};
