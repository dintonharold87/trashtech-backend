const mongoose = require("mongoose");

const responseToClientSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GarbageRequest",
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  truckLicenseNumber: {
    type: String,
    required: true,
  },
  driverContact: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending",
  },
});

const ClientResponse = mongoose.model(
  "ResponseToClient",
  responseToClientSchema
);
module.exports ={ClientResponse}
