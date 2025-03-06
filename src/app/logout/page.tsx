"use client";
import { createClient } from "~/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "../_components/Loading";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    const client = createClient();
    void client.auth.signOut().then(() => {
      router.push("/login");
      router.refresh();
    });
  }, [router]);
  return <Loading />;
}
