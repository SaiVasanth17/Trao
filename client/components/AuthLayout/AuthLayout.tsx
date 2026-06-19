export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-10">

        <div>
          <h1 className="text-5xl font-bold">
            TraoTrip
          </h1>

          <p className="mt-6 text-xl">
            AI Powered Travel Planning
          </p>

          <div className="mt-10 space-y-4">
            <p>✈ Personalized Itineraries</p>
            <p>🏨 Hotel Recommendations</p>
            <p>💰 Budget Planning</p>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8">

        <div className="w-full max-w-md">

          <h2 className="text-4xl font-bold">
            {title}
          </h2>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}