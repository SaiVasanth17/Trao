const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: String,

    days: Number,

    budgetType: String,

    interests: [String],

    itinerary: Array,

    budgetEstimate: Object,

    hotels: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Trip",
  tripSchema
);