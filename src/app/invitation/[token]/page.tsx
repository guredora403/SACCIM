import { type Metadata } from "next";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";
import { InvitationPage } from "~/app/_components/invitation/invitationPage";
import { cache } from "react";
import { createClient } from "~/utils/supabase/server";

const getAvatarByToken = cache(async (token: string) => {
  return await api.friendShip.request.getAvatarByTokenInPublic({ token });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  try {
    // トークンを使ってアバター情報を取得
    const avatar = await getAvatarByToken(token);

    return {
      title: `${avatar.name}からの招待`,
      description: `${avatar.name}がSACCIMで連絡先の共有を希望しています。`,
    };
  } catch (error) {
    console.error(error);
    // エラーが発生した場合はデフォルトのメタデータを返す
    return {
      title: "招待 - SACCIM",
      description: "SACCIMでの連絡先共有招待",
    };
  }
}

export default async function InvitationRoute({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  try {
    // トークンの有効性を確認するためにプリフェッチ
    await getAvatarByToken(token);
  } catch (error) {
    console.error(error);
    // 無効なトークンの場合は404ページを表示
    notFound();
  }

  // ログイン状態で分岐
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user === null) {
    void api.friendShip.request.getAvatarByTokenInPublic.prefetch({ token });
    return (
      <HydrateClient>
        <InvitationPage token={token} authorized={false} />
      </HydrateClient>
    );
  } else {
    console.log("authorized");
    void api.friendShip.request.getAvatarByToken.prefetch({ token });
    return (
      <HydrateClient>
        <InvitationPage token={token} authorized={true} />
      </HydrateClient>
    );
  }
}
