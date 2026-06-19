const features = [
  "AI Itinerary Generation",
  "Budget Estimation",
  "Hotel Recommendations",
  "Editable Travel Plans",
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-white"
    >

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Features
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Everything you need to plan your perfect trip.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-4">
                ✈️
              </div>

              <h3 className="font-semibold text-xl">
                {item}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}