"use client";
import { View, Text, Link, Flex } from "@adobe/react-spectrum";
import { type ContactItem } from "~/models";
import { MdEmail, MdPhone, MdLink } from "react-icons/md";
import { FaGithub, FaDiscord, FaInstagram, FaLine } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// 連絡先アイテム表示用の汎用コンポーネント
export function ContactItemDisplay({ type, displayText, value }: ContactItem) {
  switch (type) {
    case "EMAIL":
      return <EmailDisplay displayText={displayText} value={value} />;
    case "PHONE":
      return <PhoneDisplay displayText={displayText} value={value} />;
    case "TWITTER":
      return <TwitterDisplay displayText={displayText} value={value} />;
    case "INSTAGRAM":
      return <InstagramDisplay displayText={displayText} value={value} />;
    case "GITHUB":
      return <GitHubDisplay displayText={displayText} value={value} />;
    case "DISCORD":
      return <DiscordDisplay displayText={displayText} value={value} />;
    case "LINE":
      return <LineDisplay displayText={displayText} value={value} />;
    case "CUSTOMLINK":
      return <CustomLinkDisplay displayText={displayText} value={value} />;
    case "CUSTOMTEXT":
      return <CustomTextDisplay displayText={displayText} value={value} />;
    default:
      return <DefaultDisplay displayText={displayText} value={value} />;
  }
}

// 共通の表示レイアウト
interface ContactDisplayLayoutProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactDisplayLayout({
  icon,
  label,
  value,
  href,
}: ContactDisplayLayoutProps) {
  return (
    <View
      borderWidth="thin"
      borderColor="gray-200"
      borderRadius="medium"
      padding="size-200"
      backgroundColor="gray-50"
      width="100%"
    >
      <Flex direction="row" gap="size-100" alignItems="center">
        <span className="text-gray-600">{icon}</span>
        <View flex>
          <Text UNSAFE_className="text-sm text-gray-500">{label}</Text>
          {href ? (
            <Link href={href}>
              <Text UNSAFE_className="text-base font-medium">{value}</Text>
            </Link>
          ) : (
            <Text UNSAFE_className="text-base font-medium">{value}</Text>
          )}
        </View>
      </Flex>
    </View>
  );
}

interface ContactDisplayProps {
  displayText: string | null | undefined;
  value: string;
}

function EmailDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "メールアドレス";
  const href = `mailto:${value}`;
  return (
    <ContactDisplayLayout
      icon={<MdEmail size={24} />}
      label={label}
      value={value}
      href={href}
    />
  );
}

function PhoneDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "電話番号";
  const href = `tel:${value}`;
  return (
    <ContactDisplayLayout
      icon={<MdPhone size={24} />}
      label={label}
      value={value}
      href={href}
    />
  );
}

function TwitterDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "Twitter(X)";
  const href = `https://twitter.com/${value}`;
  const displayValue = `@${value}`;
  return (
    <ContactDisplayLayout
      icon={<FaXTwitter size={20} />}
      label={label}
      value={displayValue}
      href={href}
    />
  );
}

function InstagramDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "Instagram";
  const href = `https://instagram.com/${value}`;
  const displayValue = `@${value}`;
  return (
    <ContactDisplayLayout
      icon={<FaInstagram size={22} />}
      label={label}
      value={displayValue}
      href={href}
    />
  );
}

function GitHubDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "GitHub";
  const href = value;
  return (
    <ContactDisplayLayout
      icon={<FaGithub size={22} />}
      label={label}
      value={value}
      href={href}
    />
  );
}

function DiscordDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "Discord";
  return (
    <ContactDisplayLayout
      icon={<FaDiscord size={22} />}
      label={label}
      value={value}
      href={value.startsWith("https://") ? value : undefined}
    />
  );
}

function LineDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "LINE";
  return (
    <ContactDisplayLayout
      icon={<FaLine size={22} />}
      label={label}
      value={value}
      href={value.startsWith("https://") ? value : undefined}
    />
  );
}

function CustomLinkDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "リンク";
  return (
    <ContactDisplayLayout
      icon={<MdLink size={24} />}
      label={label}
      value={value}
      href={value}
    />
  );
}

function CustomTextDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "テキスト";
  return (
    <ContactDisplayLayout
      icon={<MdLink size={24} />}
      label={label}
      value={value}
    />
  );
}

function DefaultDisplay({ displayText, value }: ContactDisplayProps) {
  const label = displayText ?? "連絡先";
  return (
    <ContactDisplayLayout
      icon={<MdLink size={24} />}
      label={label}
      value={value}
    />
  );
}
