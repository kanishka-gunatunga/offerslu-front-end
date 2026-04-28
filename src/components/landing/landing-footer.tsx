import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export function LandingFooter({ siteName }: { siteName: string }) {
  return (
    <footer className={`${inter.className} mt-2 bg-[#0666E8] text-white`}>
      <div className="mx-auto max-w-[1400px] px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
          <div>
            <Image
              src="/footer-logo.svg"
              alt={`${siteName} footer logo`}
              width={168}
              height={40}
              className="h-auto w-auto"
            />
            <p className="mt-4 max-w-[28ch] text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              Your one-stop destination for the best offers in Sri Lanka.
            </p>
          </div>
          <div>
            <p className="text-[clamp(0.95rem,1.05vw,1rem)] font-bold leading-6 tracking-normal text-white">
              Categories
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              <li>Food &amp; Dining</li>
              <li>Fashion &amp; Clothing</li>
              <li>Electronics</li>
              <li>Travel</li>
              <li>Health &amp; Beauty</li>
              <li>Entertainment</li>
              <li>Other</li>
            </ul>
          </div>
          <div>
            <p className="text-[clamp(0.95rem,1.05vw,1rem)] font-bold leading-6 tracking-normal text-white">
              Offer Types
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              <li>Card Offers</li>
              <li>Buy 1 Get 1</li>
              <li>Flash Sales</li>
              <li>Cashback</li>
              <li>Flash Sale</li>
            </ul>
          </div>
          <div>
            <p className="text-[clamp(0.95rem,1.05vw,1rem)] font-bold leading-6 tracking-normal text-white">
              Quick Links
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              <li>Latest Promotions</li>
              <li>Offers by Bank</li>
              <li>About Us</li>
              <li>Connect with us</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-[clamp(0.86rem,1vw,0.95rem)] font-normal text-white/70">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
