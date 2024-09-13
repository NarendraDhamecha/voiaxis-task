const express = require("express");
const router = express.Router();
const advertisementController = require("../controllers/advertisementController");
const roleMiddleware = require("../middlewares/roleMiddleware");

// POST: Create a new advertisement
router.post("/create", advertisementController.createAdvertisement);

// GET: Get all advertisements
router.get(
  "/getAll",
  roleMiddleware,
  advertisementController.getAdvertisements
);

//GET: Get all advertisements posted by the authenticated user
router.get("/user", advertisementController.getUserAdvertisements);

// GET: Get a single advertisement by ID
router.get("/:id", advertisementController.getAdvertisementById);

// PATCH: Update an advertisement by ID
router.patch("/:id", advertisementController.updateAdvertisement);

// DELETE: Delete an advertisement by ID
router.delete(
  "/:id",
  roleMiddleware,
  advertisementController.deleteAdvertisement
);

module.exports = router;
