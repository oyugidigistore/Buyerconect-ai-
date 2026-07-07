export default function Navbar() {
  return (
    <nav className="border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-cyan-400">
          BuyerConnect AI
        </h1>

        <div className="flex gap-4 text-sm md:text-base">
          <a href="/" className="hover:text-cyan-400">
            Home
          </a>

          <a href="/login" className="hover:text-cyan-400">
            Login
          </a>

          <a href="/register" className="hover:text-cyan-400">
            Register
          </a>

          <a
            href="/dashboard"
            className="rounded-lg bg-cyan-500 px-4 py-2 hover:bg-cyan-600"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}
