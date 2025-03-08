"use client";
import { Suspense } from "react";
import { Loading } from "../Loading";
import { FriendDetailView } from "../friend/detail/friendDetailView";
import { api } from "~/trpc/react";
import { Breadcrumbs, Item, View } from "@adobe/react-spectrum";

export function ContactDetailPage({
  contactAvatarId,
}: {
  contactAvatarId: number;
}) {
  const [result] = api.contact.getById.useSuspenseQuery({
    contactAvatarId,
  });
  return (
    <View>
      <nav>
        <Breadcrumbs>
          <Item href="/">ホーム</Item>
          <Item href={`/contact/${contactAvatarId}`}>
            {result.friendShip.primaryFriendAvatar.name}
          </Item>
        </Breadcrumbs>
      </nav>
      <h2>友達詳細</h2>
      <Suspense fallback={<Loading />}>
        <FriendDetailView friendShipId={contactAvatarId} />
      </Suspense>
    </View>
  );
}
