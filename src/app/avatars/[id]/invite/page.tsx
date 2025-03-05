import { InvitePage } from "~/app/_components/avatars/inviteInformation/InvitePage";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function Invite({ params }: { params: { id: string } }) {
  const { id } = await params;
  const avatarId = parseInt(id, 10);
  if (isNaN(avatarId)) {
    notFound();
  }
  void api.avatar.getInvitationUrl.prefetch({ avatarId });
  return (
    <HydrateClient>
      <InvitePage avatarId={avatarId} />
    </HydrateClient>
  );
}
