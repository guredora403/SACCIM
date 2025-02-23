"use client";
import { ActionButton, DialogTrigger, Heading, View } from "@adobe/react-spectrum";
import { CreateAvatarDialog } from "../_components/CreateAvatarDialog";
import { api } from "~/trpc/react";


export default function Avatars() {
    return <View>
        <Heading level={2}>アバター一覧</Heading>
        <DialogTrigger type="modal">
            <ActionButton>アバターを新規作成</ActionButton>
            {(close) => (
                <CreateAvatarDialog close = {close}/>
            )}
        </DialogTrigger>
    </View>
}
