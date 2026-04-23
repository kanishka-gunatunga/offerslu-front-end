export function LandingFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="mt-2 bg-[#0f67e8] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-sm font-semibold">{siteName}</p>
          <p className="mt-2 max-w-[26ch] text-xs text-blue-100">
            Curated local promotions across banks and merchants in Sri Lanka.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Quick Links</p>
          <ul className="mt-2 space-y-1 text-xs text-blue-100">
            <li>Home</li>
            <li>Latest Promotions</li>
            <li>Categories</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Other Pages</p>
          <ul className="mt-2 space-y-1 text-xs text-blue-100">
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Get in touch</p>
          <ul className="mt-2 space-y-1 text-xs text-blue-100">
            <li>info@offerslu.lk</li>
            <li>+94 11 000 0000</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 py-3 text-center text-[11px] text-blue-100">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}
