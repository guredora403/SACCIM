"use client"
import { View, Heading } from "@adobe/react-spectrum"
import { Suspense } from "react"
import { Loading } from "../Loading"
import { InvitationInfo } from "./invitationInfo"

export function InvitationPage({ token }: { token: string }) {
    return <View>
        <Heading level={2}>友達追加</Heading>
        <Suspense fallback={<Loading/>}>
        <InvitationInfo token={token}/>
        </Suspense>
    </View>
}
