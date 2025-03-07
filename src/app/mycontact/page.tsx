import { MyContactPage } from "../_components/mycontact";
import { api, HydrateClient } from "~/trpc/server";

export default function MyContact() {
  void api.myContact.getAll.prefetch();
  return (
    <HydrateClient>
      <MyContactPage />
    </HydrateClient>
  );
}
