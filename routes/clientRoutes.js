const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { ensureAuthenticated, ensureClient } = require("../middleware/authMiddleware");

// Register a new client
router.post("/clients", clientController.createClient);

// Submit garbage request
router.post('/submit-garbage-request', clientController.submitGarbageRequest);

// View response to request
router.get("/responses",clientController.getClientResponse);


module.exports = router;
