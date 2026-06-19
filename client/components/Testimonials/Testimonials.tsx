export default function Testimonials() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          What Travelers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="p-8 rounded-3xl shadow-lg">
            <p>
              Amazing travel plans generated in seconds.
            </p>

            <h4 className="mt-4 font-bold">
              Sarah
            </h4>
          </div>

          <div className="p-8 rounded-3xl shadow-lg">
            <p>
              Saved me hours of trip planning.
            </p>

            <h4 className="mt-4 font-bold">
              John
            </h4>
          </div>

          <div className="p-8 rounded-3xl shadow-lg">
            <p>
              Best AI travel assistant I have used.
            </p>

            <h4 className="mt-4 font-bold">
              Emma
            </h4>
          </div>

        </div>

      </div>

    </section>
  );
}