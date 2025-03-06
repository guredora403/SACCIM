"use client";
import { useRouter } from "next/navigation";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { TRPCReactProvider } from "~/trpc/react";
import { Provider as JotaiProvider } from "jotai";

// This is a custom type that extends the RouterConfig type from react-spectrum
declare module "@adobe/react-spectrum" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

// the Provider of the Application
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <TRPCReactProvider>
      <Provider
        theme={defaultTheme}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        router={{ navigate: router.push }}
        locale="ja-JP"
      >
        <JotaiProvider>{children}</JotaiProvider>
      </Provider>
    </TRPCReactProvider>
  );
}
