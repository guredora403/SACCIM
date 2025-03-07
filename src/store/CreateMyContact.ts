import { atom } from "jotai";
import { type ContactItem } from "~/models";

export const stepAtom = atom<1 | 2>(1);

export const contactDataAtom = atom<ContactItem>({
  type: "CUSTOMLINK", // 特に意味はない
  displayText: undefined,
  value: "",
});

export const isPendingAtom = atom<boolean>(false);

export const errorAtom = atom({});
