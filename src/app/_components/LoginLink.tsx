"use client";
import { useState, useEffect } from "react";
import { Link } from "@adobe/react-spectrum";

export function LoginLink() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.location.href.endsWith("/login")) {
        setCurrentUrl(window.location.href);
      }
    }
  }, []);

  return (
    <Link href={`/login?next=${encodeURIComponent(currentUrl)}`}>ログイン</Link>
  );
}
