import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-indigo-600">
          TraoTrip
        </h1>

        <div className="hidden md:flex gap-8 font-medium">
          <Link href="/" className="hover:text-indigo-600">
  Home
</Link>
          <Link href="/" className="hover:text-indigo-600">
  Features
</Link>
          <Link href="/" className="hover:text-indigo-600">
  About
</Link>
        </div>

        <div className="flex gap-3">

  <Link href="/login">
    <button className="px-4 py-2 border rounded-xl">
      Login
    </button>
  </Link>

  <Link href="/register">
    <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white">
      Get Started
    </button>
  </Link>

</div>

      </div>

    </nav>
  );
}