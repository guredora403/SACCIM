"use client";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "~/app/_components/AvatarDisplay";
import {
  Breadcrumbs,
  Button,
  Divider,
  Item,
  Text,
  View,
} from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";

export function ReceivedFriendRequestDetailPage({ id }: { id: number }) {
  const router = useRouter();
  const util = api.useUtils();
  const [result] = api.friendShip.request.getReceivedRequest.useSuspenseQuery({
    id,
  });
  const mutation = api.friendShip.request.acceptFriendRequest.useMutation({
    onSuccess(data, variables, context) {
      void util.friendShip.request.getReceivedRequests.invalidate();
      router.push(`/friend/${data.id}`);
    },
    onError(e) {
      console.error(e);
    },
  });

  const acceptRequest = () => {
    mutation.mutate({ id });
  };
  return (
    <View>
      <nav>
        <Breadcrumbs>
          <Item href="/friend/">友達一覧</Item>
          <Item href="/friend/request/">友達申請一覧</Item>
          <Item
            href={`/friend/request/received/${id}`}
          >{`${result.senderAvatar.name}`}</Item>
        </Breadcrumbs>
      </nav>
      <h2>友達申請詳細</h2>
      <AvatarDisplay
        name={result.senderAvatar.name}
        iconFileName={result.senderAvatar.iconFileName}
      />
      <Divider />
      <Text>
        承認すると、あなたは <strong>{result.recipientAvatar.name}</strong>{" "}
        として相手に表示されます。
      </Text>
      <AvatarDisplay
        name={result.recipientAvatar.name}
        iconFileName={result.recipientAvatar.iconFileName}
      />
      <Button
        variant="primary"
        onPress={acceptRequest}
        isPending={mutation.isPending}
      >
        承認
      </Button>
    </View>
  );
}
