"use client";
import { DialogTrigger, ActionButton, View } from "@adobe/react-spectrum";
import { CreateMyContactDialog } from "./createMyContactDialog";
import { Provider } from "jotai";

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
    </View>
  );
}
