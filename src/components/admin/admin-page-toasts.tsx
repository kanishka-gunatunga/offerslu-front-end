"use client";

import { useEffect, useMemo, useRef } from "react";

import { useToast } from "@/components/ui/toast-provider";

type AdminPageToast = {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
};

export function AdminPageToasts({ toasts }: { toasts: AdminPageToast[] }) {
  const { showToast } = useToast();
  const emittedKeyRef = useRef<string>("");
  const visibleToasts = useMemo(() => toasts.filter((item) => item.show), [toasts]);

  useEffect(() => {
    if (visibleToasts.length === 0) return;
    const key = visibleToasts.map((item) => `${item.type}:${item.message}`).join("|");
    if (emittedKeyRef.current === key) return;
    emittedKeyRef.current = key;
    visibleToasts.forEach((item) => showToast(item.message, item.type));
  }, [showToast, visibleToasts]);

  return null;
}

