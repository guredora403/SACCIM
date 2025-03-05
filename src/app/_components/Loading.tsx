"use client";
import { ProgressCircle } from "@adobe/react-spectrum";

export function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ProgressCircle isIndeterminate={true} aria-label="Loading…" />
    </div>
  );
}
