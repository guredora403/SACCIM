"use client";
import { DialogTrigger, ActionButton, View, Flex } from "@adobe/react-spectrum";
import { CreateMyContactDialog } from "./createMyContactDialog";
import { Provider } from "jotai";
import { api } from "~/trpc/react";
import { ContactItemDisplay } from "../contactItemDisplay";
import { Suspense } from "react";
import { Loading } from "../Loading";

export function MyContactPage() {
  return (
    <View>
      <h2>自分の連絡先</h2>
      <DialogTrigger type="modal">
        <ActionButton>追加する</ActionButton>
        {(close) => {
          return (
            <Provider>
              <CreateMyContactDialog close={close} />
            </Provider>
          );
        }}
      </DialogTrigger>
      <Suspense fallback={<Loading />}>
        <MyContactList />
      </Suspense>
    </View>
  );
}

function MyContactList() {
  const [mycontacts] = api.myContact.getAll.useSuspenseQuery();

  return (
    <Flex direction="column" gap="size-100">
      {mycontacts.map((contact) => (
        <ContactItemDisplay
          key={contact.id}
          type={contact.type}
          displayText={contact.displayText ?? undefined}
          value={contact.value}
        />
      ))}
    </Flex>
  );
}
