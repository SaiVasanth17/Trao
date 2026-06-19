const generateTripPlan = (
  destination,
  days
) => {
  const itinerary = [];

  for (
    let day = 1;
    day <= days;
    day++
  ) {
    itinerary.push({
      day,
      activities: [
        `Explore ${destination}`,
        `Visit local attractions`,
        `Enjoy local cuisine`,
      ],
    });
  }

  return {
    itinerary,

    budgetEstimate: {
      flights: 400,
      accommodation: 300,
      food: 150,
      activities: 100,
      total: 950,
    },

    hotels: [
      {
        name: `${destination} Budget Inn`,
      },
      {
        name: `${destination} Grand Hotel`,
      },
      {
        name: `${destination} Luxury Suites`,
      },
    ],
  };
};

module.exports = {
  generateTripPlan,
};