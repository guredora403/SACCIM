"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../AvatarDisplay";
import { Link, View, Flex, Text } from "@adobe/react-spectrum";

export function ContactAvatarList() {
  const [contactAvatars] = api.contact.getAll.useSuspenseQuery();

  if (contactAvatars.length === 0) {
    return (
      <View>
        <Text>
          まだ連絡先がありません。友達申請を受け入れると、ここに連絡先が表示されます。
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Flex direction="row" wrap gap="size-200">
        {contactAvatars.map((contactAvatar) => (
          <View
            key={contactAvatar.id}
            padding="size-100"
            borderWidth="thin"
            borderColor="gray-200"
            borderRadius="medium"
            backgroundColor="gray-50"
          >
            <Link href={`/contact/${contactAvatar.id}`}>
              <AvatarDisplay
                name={contactAvatar.avatar.name}
                iconFileName={contactAvatar.avatar.iconFileName}
              />
            </Link>
          </View>
        ))}
      </Flex>
    </View>
  );
}
