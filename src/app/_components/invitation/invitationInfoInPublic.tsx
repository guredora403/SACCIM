"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../AvatarDisplay";
import { View, Text } from "@adobe/react-spectrum";
import { useAtomValue } from "jotai";
import { friendRequestTokenAtom } from "~/store";
import { LoginLink } from "../LoginLink";

export function InvitationInfoInPublic() {
  const token = useAtomValue(friendRequestTokenAtom);
  const [result] =
    api.friendShip.request.getAvatarByTokenInPublic.useSuspenseQuery({
      token,
    });

  return (
    <View>
      <AvatarDisplay name={result.name} iconFileName={result.iconFileName} />
      <View>
        <p>友達追加するにはログインしてください。</p>
        <LoginLink />
      </View>
    </View>
  );
}
