"use client";
import { Suspense } from "react";
import { Link, View } from "@adobe/react-spectrum";
import { Loading } from "../Loading";
import { FriendList } from "./friendList";

export function FriendListPage() {
  return (
    <View>
      <h2>友達一覧</h2>
      <Link href="/friend/request/">友達申請一覧を見る</Link>
      <Suspense fallback={<Loading />}>
        <FriendList />
      </Suspense>
    </View>
  );
}
