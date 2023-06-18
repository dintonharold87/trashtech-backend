const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
  ensureAuthenticated,
  ensureAdmin,
} = require("../middleware/authMiddleware");

// Register a new admin
router.post("/admins", adminController.createAdmin);

// Register driver
router.post("/drivers", adminController.createDriver);

// Delete driver by ID
router.delete(
  "/drivers/:id",
  ensureAuthenticated,
  ensureAdmin,
  adminController.deleteDriver
);

// Update driver data
router.put(
  "/drivers/:id",
  ensureAuthenticated,
  ensureAdmin,
  adminController.updateDriver
);

// Get all drivers
router.get("/drivers", adminController.getAllDrivers);

// Get a specific Driver details
router.get(
  "/drivers/:id",

  adminController.getDriverById
);

// Register garbage truck
router.post(
  "/garbage-trucks",

  adminController.createTruck
);

// View all trucks
router.get(
  "/garbage-trucks",

  adminController.getAllTrucks
);
// view details of a specific truck
router.get(
  "/garbage-trucks/:id",

  adminController.getGarbageTruckById
);

// delete a truck
router.delete(
  "/garbage-trucks/:id",

  adminController.deleteTruck
);

// View garbage requests from clients
router.get(
  "/client-requests",
  adminController.getClientRequests
);

// Respond to a request
router.post(
  "/client-requests/:requestId/respond",
  
  adminController.respondToRequest
);

module.exports = router;
