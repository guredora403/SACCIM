"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../AvatarDisplay";
import { Link, View } from "@adobe/react-spectrum";

export function FriendList() {
  const [friends] = api.friendShip.getAll.useSuspenseQuery();

  return (
    <View>
      {friends.map((friend) => {
        return (
          <View>
            <Link href={`/friend/${friend.id}`}>
              <AvatarDisplay
                name={friend.primaryFriendAvatar.name}
                iconFileName={friend.primaryFriendAvatar.iconFileName}
              />
            </Link>
          </View>
        );
      })}
    </View>
  );
}
