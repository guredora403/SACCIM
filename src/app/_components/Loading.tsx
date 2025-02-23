"use client"
import { ProgressCircle } from "@adobe/react-spectrum";

export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ProgressCircle isIndeterminate={true} aria-label="Loading…" />
    </div>
  );
}