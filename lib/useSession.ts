"use client";

import { useEffect, useState } from "react";

export function useSession() {
  const [email, setEmail] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    async function fetchEmail() {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        setEmail(data.email || null);
      } catch {
        setEmail(null);
      } finally {
        setIsPending(false);
      }
    }

    fetchEmail();
  }, []);

  return { email, isPending };
}
