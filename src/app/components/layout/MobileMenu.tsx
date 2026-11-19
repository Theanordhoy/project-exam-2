"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { useState } from "react";

type Props = {
  isLoggedIn: boolean;
};

export function MobileMenu({ isLoggedIn }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        className={`z-50 bg-primary absolute left-0 right-0 top-full flex-col gap-4 items-center text-lg font-normal font-heading p-4 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <Link href="/venues" onClick={() => setIsOpen(false)}>
          Venues
        </Link>
        {isLoggedIn && (
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
        )}
        {!isLoggedIn ? (
          <Link href="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        ) : (
          <form action={logout}>
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            >
              Log out
            </button>
          </form>
        )}
      </nav>
    </div>
  );
}
