import { LoginPage } from "../_components/login";
import { Suspense } from "react";
import { type Metadata } from "next";
import { Loading } from "../_components/Loading";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  );
}
