"use client";
import { AvatarDisplay } from "./AvatarDisplay";
import { api } from "~/trpc/react";
import { RadioGroup, Radio, View } from "@adobe/react-spectrum";
import { Avatar } from "~/models/AvatarSchema";
import { useState } from "react";

export const AvatarSelecter = ({
  onAvatarSelected,
}: {
  onAvatarSelected: (selectedAvatar: Avatar | null) => void;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [avatars] = api.avatar.getAll.useSuspenseQuery();

  return (
    <View>
      <RadioGroup
        label="アバターを選択"
        value={selectedAvatar?.id.toString()}
        onChange={(value) => {
          const tmp = avatars.find((a) => a.id.toString() === value) ?? null;
          setSelectedAvatar(tmp);
          onAvatarSelected(tmp);
        }}
      >
        {avatars.map((avatar) => (
          <Radio key={avatar.id} value={avatar.id.toString()}>
            <AvatarDisplay
              name={avatar.name}
              iconFileName={avatar.iconFileName}
            />
          </Radio>
        ))}
      </RadioGroup>
    </View>
  );
};
