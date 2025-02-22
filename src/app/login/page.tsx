"use client"
import { createClient } from "~/utils/supabase/client"
import { Auth } from "@supabase/auth-ui-react"
import { useState } from "react"
import { env } from "~/env"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"
import { getBaseUrl } from "~/utils/url"

export default function Page() {
    const router = useRouter();
    const [supabase] = useState<ReturnType<typeof createClient>>(() => {
        const _client = createClient()
        _client.auth.onAuthStateChange((event, session) => {
            if(event === "SIGNED_IN"){
                router.push("/")
                router.refresh()
            }
        })
        return _client
    })
    const {data: isDev} = api.isDev.useQuery();
    return <div>
        <h1>Supabase Auth</h1>
        <Auth supabaseClient={supabase} providers={["github", "discord"]} onlyThirdPartyProviders={!isDev} redirectTo={`${getBaseUrl()}/auth/callback`}/>
    </div>
}
