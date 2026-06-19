const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/authMiddleware"
  );

const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  getTripStats,
  regenerateDay,
  deleteTrip,
} = require(
  "../controllers/tripController"
);

router.get(
  "/stats/summary",
  auth,
  getTripStats
);

router.put(
  "/:id/regenerate/:day",
  auth,
  regenerateDay
);

router.post(
  "/",
  auth,
  createTrip
);

router.get(
  "/",
  auth,
  getTrips
);

router.get(
  "/:id",
  auth,
  getTripById
);

router.put(
  "/:id",
  auth,
  updateTrip
);

router.delete(
  "/:id",
  auth,
  deleteTrip
);


module.exports =
  router;