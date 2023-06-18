const { Client } = require('../models/clientModel');
const { GarbageRequest } = require('../models/garbageRequestModel');
const { ClientResponse } = require('../models/responseToClientModel');
const bcrypt = require('bcrypt');

// Register client
exports.createClient = async (req, res) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    console.log('Salt:', salt);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log('Hashed Password:', hashedPassword);

    // Create client object
    const client = new Client({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role || 'client',
      password: hashedPassword
    });

    // Save admin to database
    await client.save();

    res.status(201).json({ message: 'Client registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Create garbage request
exports.submitGarbageRequest = async (req, res) => {
  try {
    const { name, contact, location, requestedDate, requestedTime } = req.body;

    const garbageRequests = new GarbageRequest({
      name,
      contact,
      location,
      requestedDate,
      requestedTime
    });
    await garbageRequests.save();
    res
      .status(201)
      .json({ message: 'Request created successfully', garbageRequests });
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'An error occurred while creating the garbage request.'
    });
  }
};

// Controller to get the response from admin to a client's request
exports.getClientResponse = async (req, res) => {
  try {
    // Find the response for the client's request
    const response = await ClientResponse.find();

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    // Return the response to the client
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
