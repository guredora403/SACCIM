import { Metadata } from "next";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";
import { ReceivedFriendRequestDetailPage } from "~/app/_components/friend/request/received";
import { cache, Suspense } from "react";
import { Loading } from "~/app/_components/Loading";
import { TRPCError } from "@trpc/server";

const getReceivedRequest = cache(async (id: number) => {
  return await api.friendShip.request.getReceivedRequest({ id });
});

// generate metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const friendRequestId = parseInt(id, 10);
  if (isNaN(friendRequestId)) {
    notFound();
  }
  try {
    const request = await getReceivedRequest(friendRequestId);
    return {
      title: `${request.senderAvatar.name} - 友達申請`,
    };
  } catch (error) {
    return {
      title: "友達申請",
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const friendRequestId = parseInt(id, 10);
  if (isNaN(friendRequestId)) {
    notFound();
  }
  try {
    await getReceivedRequest(friendRequestId);
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === "NOT_FOUND") {
        notFound();
      }
    }
    throw error;
  }
  void api.friendShip.request.getReceivedRequest.prefetch({
    id: friendRequestId,
  });
  return (
    <HydrateClient>
      <Suspense fallback={<Loading />}>
        <ReceivedFriendRequestDetailPage id={friendRequestId} />
      </Suspense>
    </HydrateClient>
  );
}
