"use client";
import { useState, useEffect } from "react";
import { Link } from "@adobe/react-spectrum";

export function LoginLink() {
  const [currentPath, setCurrentPath] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.location.pathname.endsWith("/login")) {
        setCurrentPath(window.location.pathname);
      }
    }
  }, []);

  return (
    <Link href={`/login?next=${encodeURIComponent(currentPath)}`}>
      ログイン
    </Link>
  );
}
