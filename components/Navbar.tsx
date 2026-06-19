import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <Link href="/" className="text-xl font-bold tracking-tight">
        🏠 LocalHelp
      </Link>
      <div className="flex gap-4 text-sm font-medium">
        <Link href="/register" className="bg-white text-orange-500 px-3 py-1 rounded-full hover:bg-orange-100 transition">
          + Register as Provider
        </Link>
      </div>
    </nav>
  );
}
