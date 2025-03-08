"use client";
import { View, Heading } from "@adobe/react-spectrum";
import { Suspense } from "react";
import { Loading } from "../Loading";
import { ContactAvatarList } from "./contactAvatarList";

export function HomePage() {
  return (
    <View>
      <Heading level={2}>連絡先一覧</Heading>
      <Suspense fallback={<Loading />}>
        <ContactAvatarList />
      </Suspense>
    </View>
  );
}
