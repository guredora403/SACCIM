"use client";
import {
  ActionButton,
  Button,
  Content,
  Dialog,
  Divider,
  Form,
  TextField,
  Heading,
} from "@adobe/react-spectrum";
import { useCallback, useState } from "react";
import { api } from "~/trpc/react";

interface avatarFormData {
  name: string;
  iconData?: string;
}

export function CreateAvatarDialog({ close }: { close: () => void }) {
  const [formdata, setFormData] = useState<avatarFormData>({ name: "" });
  const [errors, setErrors] = useState({});
  const util = api.useUtils();
  const mutation = api.avatar.create.useMutation({
    onSuccess: () => {
      void util.avatar.invalidate();
    },
  });
  const createOnFormChange = useCallback((key: keyof avatarFormData) => {
    return (value: string) => {
      setFormData((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    };
  }, []);
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formdata, {
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        if (error.data?.code === "BAD_REQUEST") {
          setErrors(error.data?.zodError?.fieldErrors ?? []);
          console.log(errors);
        }
      },
    });
  };
  return (
    <Dialog>
      <ActionButton onPress={() => close()} isDisabled={mutation.isPending}>
        閉じる
      </ActionButton>
      <Heading>アバター作成</Heading>
      <Divider />
      <Content>
        <Form
          onSubmit={onsubmit}
          validationBehavior="native"
          validationErrors={errors}
        >
          <TextField
            name="name"
            label="名前"
            description="アバターの名前（例: 山田太郎）"
            value={formdata.name}
            onChange={createOnFormChange("name")}
            isRequired
          />
          <Button
            type="submit"
            variant="primary"
            isPending={mutation.isPending}
          >
            作成
          </Button>
          <Button type="reset" variant="secondary">
            リセット
          </Button>
        </Form>
      </Content>
    </Dialog>
  );
}
