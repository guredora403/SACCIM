import { FriendListPage } from "~/app/_components/friend";
import { api, HydrateClient } from "~/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "友達一覧",
};

export const dynamic = "force-dynamic";
export default function Page() {
  void api.friendShip.getAll.prefetch();

  return (
    <HydrateClient>
      <FriendListPage />
    </HydrateClient>
  );
}
