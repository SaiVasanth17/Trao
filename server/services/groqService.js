require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateTripPlan = async (
  destination,
  days,
  budgetType,
  interests
) => {
  const prompt = `
Generate a travel itinerary.

Destination: ${destination}
Days: ${days}
Budget: ${budgetType}
Interests: ${interests}

Return ONLY valid JSON.

{
  "itinerary": [
    {
      "day": 1,
      "activities": [
        "Activity 1",
        "Activity 2",
        "Activity 3"
      ]
    }
  ],
  "budgetEstimate": {
    "flights": 400,
    "accommodation": 300,
    "food": 150,
    "activities": 100,
    "total": 950
  },
  "hotels": [
    {
      "name": "Hotel Example"
    }
  ]
}
`;

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

  return completion.choices[0].message.content;
};

module.exports = {
  generateTripPlan,
};