import { type Metadata } from "next";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";
import { ContactDetailPage } from "~/app/_components/contactDetail";
import { cache } from "react";
import { TRPCError } from "@trpc/server";

const getContactDetail = cache(async (id: number) => {
  return await api.contact.getById({ contactAvatarId: id });
});

// メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ContactAvatarId = parseInt(id, 10);
  if (isNaN(ContactAvatarId)) {
    notFound();
  }

  try {
    const detail = await getContactDetail(ContactAvatarId);
    return {
      title: `${detail.avatar.name} - 友達詳細`,
    };
  } catch (error) {
    return {
      title: "連絡先詳細",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contactId = parseInt(id, 10);
  if (isNaN(contactId)) {
    notFound();
  }

  try {
    const contact = await getContactDetail(contactId);
    void api.contact.getById.prefetch({ contactAvatarId: contactId });

    void api.friendShip.getDetail.prefetch({
      friendShipId: contact.friendShip.id,
    });
    return (
      <HydrateClient>
        <ContactDetailPage contactAvatarId={contactId} />
      </HydrateClient>
    );
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === "NOT_FOUND") {
        notFound();
      }
    }
    throw error;
  }
}
