"use client";
import {
  ActionButton,
  AlertDialog,
  DialogTrigger,
  ProgressCircle,
  Text,
  View,
} from "@adobe/react-spectrum";
import { api } from "~/trpc/react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { AvatarDisplay } from "../../AvatarDisplay";
import toast from "react-hot-toast";

export function InviteInformationView({ avatarId }: { avatarId: number }) {
  const [result] = api.avatar.getInvitationUrl.useSuspenseQuery({
    avatarId: avatarId,
  });
  const util = api.useUtils();
  const [copied, setCopied] = useState(false);
  const mutation = api.avatar.generateInvitationUrl.useMutation({
    onSuccess: () => {
      util.avatar.getInvitationUrl.invalidate();
    },
  });

  const generate = () => {
    mutation.mutate({ avatarId: avatarId });
  };

  const copyToClipBoard = () => {
    if (result.inviteInfo === null) return;
    navigator.clipboard.writeText(result.inviteInfo.url).then(() => {
      toast.success("コピーしました");
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };
  if (result.inviteInfo === null) {
    return (
      <View>
        <AvatarDisplay
          name={result.avatarInfo.name}
          iconFileName={result.avatarInfo.iconFileName}
          size="M"
        />
        <p>招待リンクがありません。以下のボタンから生成できます。</p>
        <ActionButton isDisabled={mutation.isPending} onPress={generate}>
          生成
        </ActionButton>
        {mutation.isPending && (
          <ProgressCircle aria-label="生成中..." isIndeterminate size="S" />
        )}
      </View>
    );
  }
  return (
    <View>
      <AvatarDisplay
        name={result.avatarInfo.name}
        iconFileName={result.avatarInfo.iconFileName}
        size="M"
      />
      <QRCodeCanvas value={result.inviteInfo.url} size={256} level="H" />
      <p>{result.inviteInfo.url}</p>
      <ActionButton onPress={copyToClipBoard}>
        {copied ? "コピーしました" : "コピー"}
      </ActionButton>
      <DialogTrigger>
        <ActionButton isDisabled={mutation.isPending}>再生成</ActionButton>
        <AlertDialog
          title="確認"
          variant="destructive"
          primaryActionLabel="再生成"
          cancelLabel="キャンセル"
          onPrimaryAction={generate}
        >
          再生成しますか？以前のリンクは無効になります。
        </AlertDialog>
      </DialogTrigger>
    </View>
  );
}
