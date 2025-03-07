"use client";
import {
  contactDataAtom,
  errorAtom,
  isPendingAtom,
} from "~/store/CreateMyContact";
import { useAtom, useAtomValue } from "jotai";
import {
  Button,
  Form,
  Heading,
  TextField,
  Content,
  Text,
} from "@adobe/react-spectrum";

interface ContactInputFormProps {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formConfig: {
    label: string;
    description: string;
    placeholder: string;
    showDisplayText?: boolean;
  };
}

export function ContactInputCommonForm({
  onsubmit,
  formConfig,
}: ContactInputFormProps) {
  const [contactData, setContactData] = useAtom(contactDataAtom);
  const errors = useAtomValue(errorAtom);
  const isPending = useAtomValue(isPendingAtom);
  return (
    <Form
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={onsubmit}
    >
      {formConfig.showDisplayText ? (
        <TextField
          name="displayText"
          label="表示名"
          description="この連絡先の表示名（省略可能）"
          placeholder="表示名"
          value={contactData.displayText ?? ""}
          onChange={(value) => {
            setContactData((prev) => {
              return {
                ...prev,
                displayText: value ?? undefined,
              };
            });
          }}
        />
      ) : (
        <></>
      )}
      <TextField
        name="value"
        label={formConfig.label}
        description={formConfig.description}
        placeholder={formConfig.placeholder}
        value={contactData.value}
        isRequired
        onChange={(value) => {
          setContactData((prev) => {
            return {
              ...prev,
              value,
            };
          });
        }}
      />
      <Button variant="primary" type="submit" isPending={isPending}>
        追加
      </Button>
    </Form>
  );
}

export function EmailForm({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <view>
      <Heading level={2}>メールアドレスを追加</Heading>
      <Content>
        <ContactInputCommonForm
          onsubmit={onsubmit}
          formConfig={{
            label: "メールアドレス",
            description: "例: example@example.com",
            placeholder: "",
          }}
        />
      </Content>
    </view>
  );
}

export function TwitterForm({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <view>
      <Heading level={2}>Twitterを追加</Heading>
      <Content>
        <ContactInputCommonForm
          onsubmit={onsubmit}
          formConfig={{
            label: "Twitter(X)のプロフィールURLまたはユーザー名",
            description: "例: https://x.com/guredora403, @guredora403",
            placeholder: "@username",
          }}
        />
      </Content>
    </view>
  );
}

export function GitHubForm({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <view>
      <Heading level={2}>GitHubを追加</Heading>
      <Content>
        <ContactInputCommonForm
          onsubmit={onsubmit}
          formConfig={{
            label: "GitHubのプロフィールURL",
            description: "例: https://github.com/guredora403",
            placeholder: "https://github.com/username",
          }}
        />
      </Content>
    </view>
  );
}

export function DiscordForm({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <view>
      <Heading level={2}>Discordを追加</Heading>
      <Content>
        <Text>
          Discordアプリで、友達追加画面→リンクをコピーの順に操作して、コピーされた招待URLを以下に張り付けてください。
        </Text>
        <ContactInputCommonForm
          onsubmit={onsubmit}
          formConfig={{
            label: "Discord招待URL",
            description: "例: https://discord.gg/xxxxxx",
            placeholder: "",
          }}
        />
      </Content>
    </view>
  );
}

export function LineForm({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <view>
      <Heading level={2}>LINEを追加</Heading>
      <Text>
        MyQRコード→リンクをコピーから招待URLをコピーして以下に貼り付けてください。
      </Text>
      <ContactInputCommonForm
        onsubmit={onsubmit}
        formConfig={{
          label: "LINE招待URL",
          description: "例: https://line.me/ti/p/xxxxxx",
          placeholder: "",
        }}
      />
    </view>
  );
}

export function CustomLinkForm({
  onsubmit,
}: {
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <view>
      <Heading level={2}>カスタムリンクを追加</Heading>
      <Content>
        <Text>自由なリンクを追加できます。</Text>
        <ContactInputCommonForm
          onsubmit={onsubmit}
          formConfig={{
            label: "URL",
            description: "例: https://example.com",
            placeholder: "https://",
            showDisplayText: true,
          }}
        />
      </Content>
    </view>
  );
}
