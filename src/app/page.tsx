import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import { createClient } from "~/utils/supabase/server";
import { type Metadata } from "next";
import { HomePage } from "./_components/home";

export const metadata: Metadata = { title: "top" };

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  void api.contact.getAll.prefetch();

  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
}
