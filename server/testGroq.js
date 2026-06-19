require("dotenv").config();

const {
  generateTripPlan,
} = require("./services/groqService");

(async () => {
  try {
    const result =
      await generateTripPlan(
        "Tokyo",
        5,
        "Medium",
        "Food, Anime"
      );

    console.log(result);

  } catch (error) {

    console.log(error);

  }
})();