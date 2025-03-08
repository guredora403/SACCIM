"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../../AvatarDisplay";
import { Heading, View, Divider, Text, Flex } from "@adobe/react-spectrum";
import { ContactItemList } from "./contactItemList";
import { FriendAvatarList } from "./friendAvatarList";

export function FriendDetailView({ friendShipId }: { friendShipId: number }) {
  const [detail] = api.friendShip.getDetail.useSuspenseQuery({
    friendShipId,
  });

  return (
    <View>
      <View
        backgroundColor="gray-100"
        padding="size-200"
        borderRadius="medium"
        marginBottom="size-200"
      >
        <Heading level={3}>{detail.friendShip.primaryAvatar.name}</Heading>
        <AvatarDisplay
          name={detail.friendShip.primaryAvatar.name}
          iconFileName={detail.friendShip.primaryAvatar.iconFileName}
          size="L"
        />
      </View>
      <Divider />
      <View marginY="size-200">
        <Heading level={3}>連絡先情報</Heading>
        {detail.contactItems.length === 0 ? (
          <Text>登録されている連絡先情報はありません。</Text>
        ) : (
          <ContactItemList
            contactItems={detail.contactItems.map((item) => ({
              ...item,
              displayText: item.displayText ?? undefined,
            }))}
          />
        )}
      </View>
      <Divider />
      <View marginY="size-200">
        <Heading level={3}>登録アバター一覧</Heading>
        <Text>
          友達が登録しているアバターです。チェックを入れるとホーム画面に表示されます。
        </Text>
        <FriendAvatarList
          friendShipId={friendShipId}
          avatars={detail.avatars}
        />
      </View>
    </View>
  );
}
