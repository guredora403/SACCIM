"use client";
import {
  Breadcrumbs,
  Item,
  TabList,
  TabPanels,
  Tabs,
  View,
} from "@adobe/react-spectrum";
import { ReceivedFriendRequestList } from "./friendRequestList";
import { Suspense, useState } from "react";
import { Loading } from "../../Loading";

export function FriendRequestListPage() {
  return (
    <View>
      <nav>
        <Breadcrumbs>
          <Item href="/friend/">友達一覧</Item>
          <Item href="/friend/request/">友達申請一覧</Item>
        </Breadcrumbs>
      </nav>
      <h2>友達申請一覧</h2>
      <Tabs defaultSelectedKey={"received"} orientation="vertical">
        <TabList>
          <Item key="received">受け取った</Item>
          <Item key="sent">送った</Item>
        </TabList>
        <TabPanels>
          <Item key="received">
            <Suspense fallback={<Loading />}>
              <ReceivedFriendRequestList />
            </Suspense>
          </Item>
          <Item key="sent">
            <Suspense fallback={<Loading />}>
              <p>準備中。。。</p>
            </Suspense>
          </Item>
        </TabPanels>
      </Tabs>
    </View>
  );
}
