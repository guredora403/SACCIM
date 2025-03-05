// listing the avatars
import { ActionMenu, Item } from "@adobe/react-spectrum";
import { api } from "~/trpc/react";
import { AvatarDisplay } from "../AvatarDisplay";

export function ListAvatars() {
  const [avatars] = api.avatar.getAll.useSuspenseQuery();
  if (avatars.length === 0) {
    return <div>アバターがありません。</div>;
  }
  return (
    <div>
      {avatars.map((avatar) => {
        return (
          <div key={avatar.id}>
            <AvatarDisplay
              name={avatar.name}
              iconFileName={avatar.iconFileName}
              size="M"
            />
            <ActionMenu>
              <Item key="detail">詳細</Item>
              <Item key="invite" href={`/avatars/${avatar.id}/invite`}>
                招待
              </Item>
              <Item key="delete">削除</Item>
            </ActionMenu>
          </div>
        );
      })}
    </div>
  );
}
