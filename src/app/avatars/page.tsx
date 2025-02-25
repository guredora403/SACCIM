import AvatarPage  from "~/app/_components/AvatarPage"
import { api, HydrateClient } from "~/trpc/server"

export default function Avatars() {
    void api.avatar.getAll.prefetch()

    return <HydrateClient>
        <AvatarPage/>
    </HydrateClient>
}
