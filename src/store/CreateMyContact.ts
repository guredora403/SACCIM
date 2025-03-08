import { atom } from "jotai";
import { type ContactItemInput } from "~/models";

export const stepAtom = atom<1 | 2>(1);

export const contactDataAtom = atom<ContactItemInput>({
  type: "CUSTOMLINK", // 特に意味はない
  displayText: undefined,
  value: "",
});

export const isPendingAtom = atom<boolean>(false);

export const errorAtom = atom({});
