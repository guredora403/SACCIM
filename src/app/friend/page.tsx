import { FriendListPage } from "~/app/_components/friend";
import { api, HydrateClient } from "~/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "友達一覧",
};

export default function Page() {
  void api.friendShip.getAll.prefetch();

  return (
    <HydrateClient>
      <FriendListPage />
    </HydrateClient>
  );
}
