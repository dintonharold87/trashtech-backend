const mongoose = require("mongoose");

// Define a schema
const clientSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client"],
    required: true,
  },
});

// Compile model from schema
const Client = mongoose.model("Client", clientSchema);

module.exports = { Client };