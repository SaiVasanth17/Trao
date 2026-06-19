export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-indigo-100">

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
  Plan Your <span className="text-indigo-600">Dream Trip</span>
  <br />
  With AI
</h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Generate personalized itineraries, budget estimates,
            hotel recommendations and travel plans in seconds.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg">
              Start Planning
            </button>

            <button className="border border-gray-300 bg-white px-6 py-3 rounded-xl">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold">
              Paris Vacation
            </h2>

            <p className="text-gray-500 mt-1">
              5 Days • Medium Budget
            </p>

            <div className="mt-6 space-y-4">

              <div className="bg-gray-100 p-4 rounded-xl">
                Day 1 → Eiffel Tower
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                Day 2 → Louvre Museum
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl font-semibold text-indigo-700">
                Estimated Budget → $950
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}