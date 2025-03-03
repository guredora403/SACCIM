"use client"
import { api } from "~/trpc/react"
import { AvatarDisplay } from "../AvatarDisplay"
import { View, ActionButton, Text, DialogTrigger } from "@adobe/react-spectrum"
import { FriendRequestDialog } from "./friendRequestDialog"
import { useAtomValue } from "jotai"
import { friendRequestTokenAtom } from "~/store"


export function InvitationInfo() {
    const token = useAtomValue(friendRequestTokenAtom)
    const [result] = api.friendShip.request.getAvatarByToken.useSuspenseQuery({ token })

    return <View>
        <AvatarDisplay name={result.name} iconFileName={result.iconFileName}/>
        <View>
        {result.isOwned ? 
            <Text>
                これはあなたのアバターです。このURLを友達に教えることで、友達申請してもらうことができます。
            </Text>
            : <FriendRequestButton/>
        }
        </View>
    </View>
}

function FriendRequestButton() {
    return <DialogTrigger type="modal">
        <ActionButton>友達申請する</ActionButton>
        {(close) => (
            <FriendRequestDialog close={close}/>
        )}
    </DialogTrigger>
}
