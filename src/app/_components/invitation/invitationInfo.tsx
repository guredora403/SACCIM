"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../AvatarDisplay";
import { View, ActionButton, Text, DialogTrigger } from "@adobe/react-spectrum";
import { FriendRequestDialog } from "./friendRequestDialog";
import { useAtomValue } from "jotai";
import { friendRequestTokenAtom } from "~/store";
import { type RelationshipStatus } from "~/models";

export function InvitationInfo() {
  const token = useAtomValue(friendRequestTokenAtom);
  const [result] = api.friendShip.request.getAvatarByToken.useSuspenseQuery({
    token,
  });

  return (
    <View>
      <AvatarDisplay name={result.name} iconFileName={result.iconFileName} />
      <RelationshipStatusActions
        isOwned={result.isOwned}
        relationshipStatus={result.relationshipStatus}
      />
    </View>
  );
}

// RelationshipStatusによって表示を出し分ける
function RelationshipStatusActions({
  isOwned,
  relationshipStatus,
}: {
  isOwned: boolean;
  relationshipStatus: RelationshipStatus;
}) {
  if (isOwned) {
    return (
      <View>
        <Text>
          これはあなたのアバターです。このURLを友達に教えることで、友達申請してもらうことができます。
        </Text>
      </View>
    );
  }
  switch (relationshipStatus) {
    case "NONE":
      return <FriendRequestButton />;

    case "REQUEST_SENT":
      return (
        <View>
          <Text>友達申請の結果を待っています…</Text>
          <ActionButton>詳細を確認</ActionButton>
        </View>
      );
    case "REQUEST_RECEIVED":
      return (
        <View>
          <Text>
            このアバターのユーザーからはすでに友達申請を受け取っています。
          </Text>
          <ActionButton>詳細を確認</ActionButton>
        </View>
      );

    case "FRIEND":
      return (
        <View>
          <Text>このアバターのユーザーとはすでに友達です。</Text>
        </View>
      );

    default:
      return (
        <View>
          <Text>エラーが発生しました。</Text>
        </View>
      );
  }
}

// 友達申請ボタン
function FriendRequestButton() {
  return (
    <DialogTrigger type="modal">
      <ActionButton>友達申請する</ActionButton>
      {(close) => <FriendRequestDialog close={close} />}
    </DialogTrigger>
  );
}
