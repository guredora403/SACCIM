"use client";
import { Suspense } from "react";
import { Loading } from "../../Loading";
import { FriendDetailView } from "./friendDetailView";
import { api } from "~/trpc/react";
import { Breadcrumbs, Item, View } from "@adobe/react-spectrum";

export function FriendDetailPage({ friendShipId }: { friendShipId: number }) {
  const [result] = api.friendShip.getDetail.useSuspenseQuery({
    friendShipId,
  });
  return (
    <View>
      <nav>
        <Breadcrumbs>
          <Item href="/friend/">友達一覧</Item>
          <Item href={`/friend/${friendShipId}`}>
            {result.friendShip.primaryAvatar.name}
          </Item>
        </Breadcrumbs>
      </nav>
      <h2>友達詳細</h2>
      <Suspense fallback={<Loading />}>
        <FriendDetailView friendShipId={friendShipId} />
      </Suspense>
    </View>
  );
}
