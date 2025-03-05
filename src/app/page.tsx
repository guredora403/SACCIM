import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import { createClient } from "~/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = { title: "top" };

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <HydrateClient>
      <h1>ログイン済み</h1>
      <p>{user?.email}</p>
    </HydrateClient>
  );
}
