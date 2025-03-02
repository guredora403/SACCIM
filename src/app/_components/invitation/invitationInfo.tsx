"use client"
import { api } from "~/trpc/react"
import { AvatarDisplay } from "../AvatarDisplay"
import { View, ActionButton } from "@adobe/react-spectrum"

export function InvitationInfo({ token }: { token: string }) {
    const [result] = api.friendShip.request.getAvatarByToken.useSuspenseQuery({ token })

    return <View>
        <AvatarDisplay name={result.name} iconFileName={result.iconFileName}/>
        <View>
        <ActionButton >友達申請する</ActionButton>
        </View>
    </View>
}
