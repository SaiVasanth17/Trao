const Trip = require("../models/Trip");

const {
  generateTripPlan,
} = require("../services/groqService");

exports.createTrip = async (
  req,
  res
) => {
  try {
    const {
      destination,
      days,
      budgetType,
      interests,
    } = req.body;

    const aiResponse =
      await generateTripPlan(
        destination,
        days,
        budgetType,
        interests
      );

    let tripData;

    try {
      tripData = JSON.parse(
        aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      );
    } catch (error) {
      return res.status(500).json({
        message:
          "Failed to parse Gemini response",
      });
    }

    const trip =
      await Trip.create({
        userId: req.user.id,

        destination,
        days,
        budgetType,
        interests,

        itinerary:
          tripData.itinerary,

        budgetEstimate:
          tripData.budgetEstimate,

        hotels:
          tripData.hotels,
      });

    res.status(201).json(trip);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getTrips = async (
  req,
  res
) => {
  const trips =
    await Trip.find({
      userId: req.user.id,
    });

  res.json(trips);
};

exports.getTripById =
  async (req, res) => {

  const trip =
    await Trip.findById(
      req.params.id
    );

  if (!trip) {
    return res.status(404).json({
      message:
        "Trip not found",
    });
  }

  if (
    trip.userId.toString() !==
    req.user.id
  ) {
    return res.status(403).json({
      message:
        "Unauthorized",
    });
  }

  res.json(trip);
};

exports.updateTrip = async (
  req,
  res
) => {
  try {

    const trip =
      await Trip.findById(
        req.params.id
      );

    if (!trip) {
      return res.status(404).json({
        message:
          "Trip not found",
      });
    }

    if (
      trip.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "Unauthorized",
      });
    }

    const updatedTrip =
      await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedTrip);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getTripStats =
  async (req, res) => {
    try {

      const trips =
        await Trip.find({
          userId:
            req.user.id,
        });

      const totalTrips =
        trips.length;

      let favoriteDestination =
        "N/A";

      if (trips.length > 0) {

        const counts = {};

        trips.forEach(
          (trip) => {
            counts[
              trip.destination
            ] =
              (
                counts[
                  trip.destination
                ] || 0
              ) + 1;
          }
        );

        favoriteDestination =
          Object.keys(
            counts
          ).reduce(
            (a, b) =>
              counts[a] >
              counts[b]
                ? a
                : b
          );
      }

      res.json({
        totalTrips,
        favoriteDestination,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

exports.regenerateDay =
  async (req, res) => {
    try {

      const trip =
        await Trip.findById(
          req.params.id
        );

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found",
          });
      }

      const dayNumber =
        Number(
          req.params.day
        );

      const newActivities = [
        "Hidden Gems Tour",
        "Local Food Experience",
        "City Walking Tour",
        "Photography Spots",
        "Sunset Viewpoint",
      ];

      trip.itinerary[
        dayNumber - 1
      ].activities =
        newActivities;

      await trip.save();

      res.json(trip);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

exports.deleteTrip = async (
  req,
  res
) => {
  try {

    const trip =
      await Trip.findById(
        req.params.id
      );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    if (
      trip.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Trip.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Trip deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};