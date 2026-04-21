export function LandingFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </p>
    </footer>
  );
}
