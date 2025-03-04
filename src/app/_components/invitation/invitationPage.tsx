"use client";
import { View, Heading } from "@adobe/react-spectrum";
import { Suspense } from "react";
import { Loading } from "../Loading";
import { InvitationInfo } from "./invitationInfo";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { friendRequestTokenAtom } from "~/store";

export function InvitationPage({ token }: { token: string }) {
  useHydrateAtoms([[friendRequestTokenAtom, token]]);
  return (
    <View>
      <Heading level={2}>友達追加</Heading>
      <Suspense fallback={<Loading />}>
        <InvitationInfo />
      </Suspense>
    </View>
  );
}
