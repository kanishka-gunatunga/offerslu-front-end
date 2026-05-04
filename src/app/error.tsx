"use client";

import { useEffect } from "react";

import { ServiceUnavailableScreen } from "@/components/site/service-unavailable-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ServiceUnavailableScreen onRetry={reset} />;
}
