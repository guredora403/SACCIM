"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../../AvatarDisplay";
import {
  Checkbox,
  Flex,
  AlertDialog,
  DialogContainer,
  Text,
  Content,
  Heading,
} from "@adobe/react-spectrum";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";

type AvatarWithRegistrationStatus = {
  id: number;
  name: string;
  iconFileName: string;
  isRegistered: boolean;
};

interface FriendAvatarListProps {
  friendShipId: number;
  avatars: AvatarWithRegistrationStatus[];
}

export function FriendAvatarList({
  friendShipId,
  avatars,
}: FriendAvatarListProps) {
  const utils = api.useUtils();

  // 登録されているアバターの数をカウント
  const registeredCount = useMemo(() => {
    return avatars.filter((avatar) => avatar.isRegistered).length;
  }, [avatars]);

  // アラートダイアログのステート
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] =
    useState<AvatarWithRegistrationStatus | null>(null);

  // アバター選択状態更新処理
  const updateMutation = api.friendShip.updateContactAvatar.useMutation({
    onSuccess: () => {
      void utils.friendShip.getDetail.invalidate({ friendShipId });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCheckboxChange = (
    avatar: AvatarWithRegistrationStatus,
    isChecked: boolean,
  ) => {
    // 最後のアバターのチェックを外そうとしている場合は警告を表示
    if (!isChecked && registeredCount === 1 && avatar.isRegistered) {
      setSelectedAvatar(avatar);
      setIsAlertOpen(true);
      return;
    }

    // 通常の更新処理
    updateContactAvatar(avatar.id, isChecked);
  };

  const updateContactAvatar = (avatarId: number, isRegistered: boolean) => {
    updateMutation.mutate({
      friendShipId,
      avatarId,
      isRegistered,
    });
  };

  // 最後のアバターでも確認後に削除する関数
  const handleForceRemove = () => {
    if (selectedAvatar) {
      try {
        updateContactAvatar(selectedAvatar.id, false);
        toast.success(
          "最後のアバターを削除しました。新しいアバターを選択してください。",
        );
      } catch (error) {
        toast.error("アバターの削除に失敗しました");
        console.error(error);
      }
    }
    setIsAlertOpen(false);
  };

  return (
    <Flex direction="column" gap="size-100" marginY="size-200">
      {/* アラートダイアログ */}
      <DialogContainer onDismiss={() => setIsAlertOpen(false)}>
        {isAlertOpen && (
          <AlertDialog
            title="確認"
            variant="warning"
            primaryActionLabel="削除する"
            cancelLabel="キャンセル"
            onPrimaryAction={handleForceRemove}
            onCancel={() => setIsAlertOpen(false)}
          >
            <Content>
              <Heading level={4}>
                最後のアバターを削除しようとしています
              </Heading>
              <Text>少なくとも1つのアバターは表示することをお勧めします。</Text>
              <Text>
                削除すると、ホーム画面にこの友達が表示されなくなります。
              </Text>
            </Content>
          </AlertDialog>
        )}
      </DialogContainer>

      {/* アバターリスト */}
      {avatars.map((avatar) => (
        <Checkbox
          key={avatar.id}
          isSelected={avatar.isRegistered}
          onChange={(isChecked) => handleCheckboxChange(avatar, isChecked)}
          isDisabled={updateMutation.isPending}
        >
          <Flex alignItems="center" gap="size-100">
            <AvatarDisplay
              name={avatar.name}
              iconFileName={avatar.iconFileName}
              size="M"
            />
            {updateMutation.isPending &&
              updateMutation.variables?.avatarId === avatar.id && (
                <Text>更新中...</Text>
              )}
          </Flex>
        </Checkbox>
      ))}

      {avatars.length === 0 && (
        <Text>このユーザーにはアバターがありません</Text>
      )}
    </Flex>
  );
}
