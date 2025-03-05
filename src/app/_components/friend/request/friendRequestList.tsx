"use client"
import { api } from "~/trpc/react"
import { AvatarDisplay } from "../../AvatarDisplay"
import { ActionButton, View, Text, Divider } from "@adobe/react-spectrum"
import { useRouter } from "next/navigation"

export function ReceivedFriendRequestList() {
    const [receivedRequests] = api.friendShip.request.getReceivedRequests.useSuspenseQuery()
    const router = useRouter();

    return <View>
        {receivedRequests.length === 0 && <Text>届いている友達申請はありません。</Text>}
        {receivedRequests.map((request) => {
            return <View key={request.id}>
                <AvatarDisplay name={request.senderAvatar.name} iconFileName={request.senderAvatar.iconFileName}/>
                <ActionButton onPress={() => {
                    router.push(`/friend/request/received/${request.id}`)
                }}>確認</ActionButton>
                <Divider/>
            </View>
        })}
    </View>
}