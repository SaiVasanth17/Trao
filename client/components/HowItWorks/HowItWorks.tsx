const steps = [
  "Choose Destination",
  "AI Creates Itinerary",
  "Customize Trip",
  "Enjoy Your Journey",
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-indigo-600">
                {index + 1}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}