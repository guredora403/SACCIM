"use client";
import { Suspense } from "react";
import { InviteInformationView } from "./InviteInformationView";
import { Loading } from "../../Loading";

export function InvitePage({ avatarId }: { avatarId: number }) {
  return (
    <div>
      <h2>招待情報</h2>
      <Suspense fallback={<Loading />}>
        <InviteInformationView avatarId={avatarId} />
      </Suspense>
    </div>
  );
}
