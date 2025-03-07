"use client";
import { ActionButton, View } from "@adobe/react-spectrum";
import { useSetAtom, useAtomValue } from "jotai";
import {
  contactDataAtom,
  isPendingAtom,
  stepAtom,
} from "~/store/CreateMyContact";
import {
  CustomLinkForm,
  DiscordForm,
  EmailForm,
  GitHubForm,
  TwitterForm,
} from "./contactDataInputForms";

export function ContactDataInput({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const setstep = useSetAtom(stepAtom);
  const isPending = useAtomValue(isPendingAtom);
  return (
    <View>
      <ActionButton onPress={() => setstep(1)} isDisabled={isPending}>
        戻る
      </ActionButton>
      <ContactDataInputContent onsubmit={onsubmit} />
    </View>
  );
}

function ContactDataInputContent({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const contactData = useAtomValue(contactDataAtom);
  switch (contactData.type) {
    case "EMAIL":
      return <EmailForm onsubmit={onsubmit} />;
    case "TWITTER":
      return <TwitterForm onsubmit={onsubmit} />;
    case "GITHUB":
      return <GitHubForm onsubmit={onsubmit} />;
    case "DISCORD":
      return <DiscordForm onsubmit={onsubmit} />;
    case "CUSTOMLINK":
      return <CustomLinkForm onsubmit={onsubmit} />;
    default:
      return <div>todo: 実装する</div>;
  }
}
