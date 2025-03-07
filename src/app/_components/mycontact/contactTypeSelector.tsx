"use client";
import { useSetAtom } from "jotai";
import { contactDataAtom, stepAtom } from "~/store/CreateMyContact";
import {
  View,
  Heading,
  Text,
  Flex,
  Button,
  Content,
} from "@adobe/react-spectrum";
import { useCallback } from "react";
import { type ContactItem } from "~/models";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaDiscord, FaLine } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function ContactTypeSelector() {
  const setContactData = useSetAtom(contactDataAtom);
  const setStep = useSetAtom(stepAtom);
  const createOnTypeSelected = useCallback(
    (type: ContactItem["type"]) => {
      return () => {
        setContactData((prev) => {
          return {
            ...prev,
            type,
          };
        });
        setStep(2);
      };
    },
    [setContactData, setStep],
  );
  return (
    <View>
      <Heading>連絡先の種類</Heading>
      <Content>
        <Text>追加する連絡先の種類を選んでください。</Text>
        <Flex>
          <Button variant="secondary" onPress={createOnTypeSelected("EMAIL")}>
            <MdEmail />
            <Text>メールアドレス</Text>
          </Button>
          <Button variant="secondary" onPress={createOnTypeSelected("TWITTER")}>
            <FaXTwitter />
            <Text>Twitter(X)</Text>
          </Button>
          <Button variant="secondary" onPress={createOnTypeSelected("GITHUB")}>
            <FaGithub />
            <Text>GitHub</Text>
          </Button>
          <Button variant="secondary" onPress={createOnTypeSelected("DISCORD")}>
            <FaDiscord />
            <Text>Discord</Text>
          </Button>
          <Button variant="secondary" onPress={createOnTypeSelected("LINE")}>
            <FaLine />
            <Text>LINE</Text>
          </Button>
          <Button
            variant="secondary"
            onPress={createOnTypeSelected("CUSTOMLINK")}
          >
            <Text>カスタムリンク</Text>
          </Button>
        </Flex>
      </Content>
    </View>
  );
}
