import { Metadata } from "next";
import { api } from "~/trpc/server";
import { FriendRequestListPage } from "~/app/_components/friend/request";

export const metadata: Metadata = {
    title: "友達申請一覧",
    description: "友達申請の一覧を表示します。",
}

export default function Page(){
    void api.friendShip.request.getReceivedRequests.prefetch()
    void api.friendShip.request.getSentRequests.prefetch()

    return <FriendRequestListPage/>
}