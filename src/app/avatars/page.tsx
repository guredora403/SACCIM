"use client";
import { ActionButton, DialogTrigger, Heading, View } from "@adobe/react-spectrum";
import { CreateAvatarDialog } from "../_components/CreateAvatarDialog";
import { api } from "~/trpc/react";
import { ListAvatars } from "../_components/ListAvatars";


export default function Avatars() {
    return <div>
        <h2>アバター一覧</h2>
        <DialogTrigger type="modal">
            <ActionButton>アバターを新規作成</ActionButton>
            {(close) => (
                <CreateAvatarDialog close = {close}/>
            )}
        </DialogTrigger>
        <ListAvatars/>
    </div>
}
