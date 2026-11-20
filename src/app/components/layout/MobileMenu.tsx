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
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        aria-label="Main"
        className={`z-50 bg-primary absolute left-0 right-0 top-full text-lg font-normal font-heading p-4 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <ul className="flex-col gap-4 items-center flex w-full">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Venues
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </li>
          )}
          <li>
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
          </li>
        </ul>
      </nav>
    </div>
  );
}
