import Link from "next/link";

export function Footer() {
  const fullYear = new Date().getFullYear();
  return (
    <footer className="text-white">
      <div className="w-full flex flex-col sm:flex-row gap-6 p-6 sm:px-10 sm:justify-between sm:items-center bg-footer-bg">
        <div>
          <Link href="/" className="font-heading font-semibold text-[15px]">
            Holidaze
          </Link>
          <p className="text-[13px]">Find your next stay</p>
        </div>
        <nav aria-label="Footer" className="flex gap-12 flex-wrap">
          <div>
            <h2 className="text-gold-500 text-[15px] font-semibold mb-1">
              Explore
            </h2>
            <ul className="text-sm flex flex-col gap-1">
              <li>
                <Link href="/">Venues</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-gold-500 text-[15px] font-semibold mb-1">
              Contact
            </h2>
            <ul className="text-sm flex flex-col gap-1">
              <li>
                <Link href="/coming-soon">Help</Link>
              </li>
              <li>
                <Link href="/coming-soon">About us</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="w-full flex items-center bg-footer-bottom px-4 sm:px-10 py-2">
        <p className="text-[13px]">&copy; {fullYear} Holidaze</p>
      </div>
    </footer>
  );
}
