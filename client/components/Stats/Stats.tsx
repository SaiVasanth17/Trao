export default function Stats() {
  return (
    <section className="bg-white py-16">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="text-center">
            <h2 className="text-5xl font-bold text-indigo-600">
              50K+
            </h2>

            <p className="mt-2 text-gray-600">
              Trips Planned
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-indigo-600">
              120+
            </h2>

            <p className="mt-2 text-gray-600">
              Destinations
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-indigo-600">
              95%
            </h2>

            <p className="mt-2 text-gray-600">
              User Satisfaction
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}