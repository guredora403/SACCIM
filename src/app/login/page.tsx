"use client"
import { createClient } from "~/utils/supabase/client"
import { Auth } from "@supabase/auth-ui-react"
import { useEffect, useState } from "react"
import { env } from "~/env"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"

export default function Page() {
    const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
    const [redirectUrl, setRedirectUrl] = useState<string>("")
    const router = useRouter();
    const {data: isDev} = api.isDev.useQuery();
    useEffect(() => {
        const _client = createClient()
        _client.auth.onAuthStateChange((event, session) => {
            if(event === "SIGNED_IN"){
                router.push("/")
                router.refresh()
            }
            const baseUrl = window.location.origin
            const redirectUrl = `${baseUrl}/auth/callback`
            setRedirectUrl(redirectUrl)
        })
        setSupabase(_client)
        return () => {}
    }, [])
    return <div>
        <h1>Supabase Auth</h1>
        {supabase && <Auth supabaseClient={supabase} providers={["github", "discord"]} onlyThirdPartyProviders={!isDev} redirectTo={redirectUrl}/>}
    </div>
}
