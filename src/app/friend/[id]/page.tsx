import { type Metadata } from "next";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";
import { FriendDetailPage } from "~/app/_components/friend/detail";
import { cache } from "react";
import { TRPCError } from "@trpc/server";

const getFriendDetail = cache(async (id: number) => {
  return await api.friendShip.getDetail({ friendShipId: id });
});

// メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const friendShipId = parseInt(id, 10);
  if (isNaN(friendShipId)) {
    notFound();
  }

  try {
    const detail = await getFriendDetail(friendShipId);
    return {
      title: `${detail.friendShip.primaryAvatar.name} - 友達詳細`,
    };
  } catch (error) {
    return {
      title: "友達詳細",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const friendShipId = parseInt(id, 10);
  if (isNaN(friendShipId)) {
    notFound();
  }

  try {
    await getFriendDetail(friendShipId);
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === "NOT_FOUND") {
        notFound();
      }
    }
    throw error;
  }

  void api.friendShip.getDetail.prefetch({ friendShipId });

  return (
    <HydrateClient>
      <FriendDetailPage friendShipId={friendShipId} />
    </HydrateClient>
  );
}
