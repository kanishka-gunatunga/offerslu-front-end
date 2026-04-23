import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/offerslu-logo.svg"
            alt={`${siteName} logo`}
            width={150}
            height={35}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
