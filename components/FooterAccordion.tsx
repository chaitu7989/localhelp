"use client";

import { useState } from "react";
import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
  icon?: string;
}

interface Props {
  title: string;
  links: LinkItem[];
}

export default function FooterAccordion({ title, links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-800 md:border-none pt-1 md:pt-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 group"
        aria-expanded={open}
      >
        <p className="text-white font-bold text-sm group-hover:text-orange-400 transition-colors">
          {title}
        </p>
        <span
          className={`text-gray-400 text-xl font-light transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <ul
        className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-gray-400 text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
            >
              {link.icon && <span>{link.icon}</span>}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
