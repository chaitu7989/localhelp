import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white px-4 py-2 flex items-center justify-between shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <Logo size={42} />
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight">LocalHelp</p>
          <p className="text-xs text-orange-100">భీమవరం · Bhimavaram</p>
        </div>
      </Link>
      <div className="flex gap-4 text-sm font-medium">
        <Link href="/register" className="bg-white text-orange-500 px-3 py-1.5 rounded-full hover:bg-orange-100 transition font-semibold">
          + Register
        </Link>
      </div>
    </nav>
  );
}
