import { Metadata } from "next";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";
import { InvitationPage } from "~/app/_components/invitation/invitationPage";

export async function generateMetadata({
  params,
}: {
  params: { token: string };
}): Promise<Metadata> {
  const { token } = await params;
  try {
    // トークンを使ってアバター情報を取得
    const avatar = await api.friendShip.request.getAvatarByToken({ token });
    
    return {
      title: `${avatar.name}からの招待`,
      description: `${avatar.name}がSACCIMで連絡先の共有を希望しています。`,
    };
  } catch (error) {
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
  params: { token: string };
}) {
  const { token } = await params
  try {
    // トークンの有効性を確認するためにプリフェッチ
    await api.friendShip.request.getAvatarByToken({ token });
    void api.friendShip.request.getAvatarByToken.prefetch({ token });
    return (
      <HydrateClient>
        <InvitationPage token={token} />
      </HydrateClient>
    );
  } catch (error) {
    // 無効なトークンの場合は404ページを表示
    notFound();
  }
}
