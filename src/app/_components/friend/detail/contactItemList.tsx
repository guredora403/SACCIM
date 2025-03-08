"use client";
import { Flex } from "@adobe/react-spectrum";
import { ContactItemDisplay } from "../../contactItemDisplay";
import { type ContactItem } from "~/models";

interface ContactItemListProps {
  contactItems: ContactItem[];
}

export function ContactItemList({ contactItems }: ContactItemListProps) {
  return (
    <Flex direction="column" gap="size-100" marginY="size-100">
      {contactItems.map((item) => (
        <ContactItemDisplay
          key={item.id}
          id={item.id}
          type={item.type}
          displayText={item.displayText}
          value={item.value}
        />
      ))}
    </Flex>
  );
}
