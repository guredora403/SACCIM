import { type Metadata } from "next";
import AvatarPage from "~/app/_components/avatars/AvatarPage";
import { api, HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "アバター一覧",
};

export const dynamic = "force-dynamic";
export default function Avatars() {
  void api.avatar.getAll.prefetch();

  return (
    <HydrateClient>
      <AvatarPage />
    </HydrateClient>
  );
}
