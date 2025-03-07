"use client";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactDataAtom,
  errorAtom,
  isPendingAtom,
  stepAtom,
} from "~/store/CreateMyContact";
import { Dialog, ActionButton, Divider } from "@adobe/react-spectrum";
import { ContactTypeSelector } from "./contactTypeSelector";
import { ContactDataInput } from "./contactDataInput";
import { api } from "~/trpc/react";
import { useEffect } from "react";

export function CreateMyContactDialog({ close }: { close: () => void }) {
  const step = useAtomValue(stepAtom);
  const setErrors = useSetAtom(errorAtom);
  const setIsPending = useSetAtom(isPendingAtom);
  const contactData = useAtomValue(contactDataAtom);
  const util = api.useUtils();
  const mutation = api.myContact.create.useMutation({
    onSuccess() {
      void util.myContact.invalidate();
    },
    onError(error) {
      if (error.data?.code === "BAD_REQUEST") {
        setErrors(error.data?.zodError?.fieldErrors ?? []);
      }
    },
  });

  useEffect(() => {
    setIsPending(mutation.isPending);
  }, [mutation.isPending, setIsPending]);
  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(contactData, {
      onSuccess() {
        close();
      },
    });
    console.log("submit");
  };
  return (
    <Dialog>
      <ActionButton onPress={() => close()}>閉じる</ActionButton>
      <Divider />
      {step === 1 && <ContactTypeSelector />}
      {step === 2 && <ContactDataInput onsubmit={onsubmit} />}
    </Dialog>
  );
}
