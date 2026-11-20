import Link from "next/link";
import { getProfile } from "@/app/lib/session";
import { logout } from "@/app/actions/auth";
import { MobileMenu } from "@/app/components/layout/MobileMenu";

export async function Header() {
  const profile = await getProfile();
  const isLoggedIn = !!profile;
  return (
    <header className="relative bg-linear-to-b from-forest-700 flex to-forest-900 text-white  items-center justify-between px-4 sm:px-8 py-3">
      <div>
        <Link href="/" className="text-3xl font-bold">
          Holidaze
        </Link>
      </div>
      <nav
        aria-label="Main"
        className="hidden sm:flex text-lg sm:text-xl font-normal font-heading"
      >
        <ul className="gap-6 items-center flex">
          <li>
            <Link href="/">Venues</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          <li>
            {!isLoggedIn ? (
              <Link href="/login">Login</Link>
            ) : (
              <form action={logout}>
                <button type="submit" className="cursor-pointer">
                  Log out
                </button>
              </form>
            )}
          </li>
        </ul>
      </nav>
      <MobileMenu isLoggedIn={isLoggedIn} />
    </header>
  );
}
