import { ContactType } from "@prisma/client";
import z from "zod";

const TWITTER_REGEX =
  /^(?:(?:https:\/\/(?:x\.com|twitter\.com)\/)|@)([a-zA-Z0-9_]{1,15})$/;

const INSTAGRAM_REGEX =
  /^(?:(?:https:\/\/(?:www\.instagram\.com)\/)|@)([a-zA-Z0-9_\.]{1,30})\/?$/;

function getContactValueValidator(type: ContactType) {
  switch (type) {
    case "EMAIL":
      return z
        .string()
        .email({ message: "有効なメールアドレスを入力してください。" });
    case "PHONE":
      // https://akinov.hatenablog.com/entry/2017/05/31/194421
      return z
        .string()
        .regex(
          /^(((0(\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1}|[5789]0[-(]?\d{4})[-)]?)|\d{1,4}\-?)\d{4}|0120[-(]?\d{3}[-)]?\d{3})$/,
          { message: "有効な電話番号を入力してください。" },
        );
    case "TWITTER":
      return z.string().regex(TWITTER_REGEX, {
        message:
          "Twitter（X）アカウントのURLか、@を含めたユーザー名を入力してください。",
      });
    case "INSTAGRAM":
      return z.string().regex(INSTAGRAM_REGEX, {
        message:
          "InstagramアカウントのURLか、@を含めたユーザー名を入力してください。",
      });
    case "DISCORD":
      return z.string().startsWith("https://discord.gg/", {
        message: "有効なDiscordの招待URLを入力してください。",
      });
    case "LINE":
      return z.string().startsWith("https://line.me/", {
        message: "有効なLINEの友達招待URLを入力してください。",
      });
    case "GITHUB":
      return z.string().startsWith("https://github.com/", {
        message: "有効なGitHubアカウントのURLを入力してください。",
      });
    case "CUSTOMLINK":
      return z.string().url({ message: "有効なURLを入力してください。" });
    case "CUSTOMTEXT":
      return z
        .string()
        .max(1000, { message: "1000文字以内で入力してください。" });
    default:
      return z.never({ message: "unsuported type" });
  }
}

export function contactValuePreProcess(type: ContactType, value: string) {
  switch (type) {
    case "TWITTER":
      return TWITTER_REGEX.exec(value)?.[1] ?? value;
    case "INSTAGRAM":
      return INSTAGRAM_REGEX.exec(value)?.[1] ?? value;
    default:
      return value;
  }
}

export const MyContactSchema = z
  .object({
    type: z.nativeEnum(ContactType, { message: "unsuported type" }),
    displayText: z
      .string()
      .max(100, { message: "100文字以内で入力してください。" })
      .optional(),
    value: z
      .string()
      .max(1000, { message: "1000文字以内で入力してください。" }),
  })
  .superRefine((data, ctx) => {
    const validator = getContactValueValidator(data.type);
    const result = validator.safeParse(data.value);
    if (!result.success) {
      result.error.errors.forEach((error) => {
        ctx.addIssue({
          ...error,
          path: ["value"],
        });
      });
    }
  });

export type MyContact = z.infer<typeof MyContactSchema>;
