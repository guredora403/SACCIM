"use client";
import { api } from "~/trpc/react";
import { Dialog, View, ActionButton, Content, Divider, Heading, Header } from "@adobe/react-spectrum";
import { AvatarSelecter } from "../avatarSelector";
import { useState } from "react";
import { Avatar } from "~/models/AvatarSchema";
import { useAtomValue } from "jotai";
import { friendRequestTokenAtom } from "~/store";

export function FriendRequestDialog({ close }: { close: () => void }) {
    const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
    const token = useAtomValue(friendRequestTokenAtom)

    return <Dialog>
        <ActionButton onPress={() => close() }>閉じる</ActionButton>
        <Heading>友達申請利用アバター選択</Heading>
        <Header>申請しようとしている友達に表示されるアバターを選択してください。</Header>
        <Divider/>
        <Content>
            <AvatarSelecter onAvatarSelected={setSelectedAvatar}/>
        </Content>
    </Dialog>
}
